import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

export interface ImageItem {
  id: string;
  preview: string;
  progress: number;
  file?: File;
}

interface ImageUploaderProps {
  images: ImageItem[];
  onChange: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxFileSize = 5 * 1024 * 1024;
const maxImages = 6;

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }
    const files = Array.from(fileList);
    const next: ImageItem[] = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        toast({ title: "Invalid file type", description: "Only JPG, PNG, or WEBP files are allowed." });
        continue;
      }
      if (file.size > maxFileSize) {
        toast({ title: "File too large", description: "Each image must be under 5MB." });
        continue;
      }
      if (images.length + next.length >= maxImages) {
        toast({ title: "Image limit reached", description: "You can upload up to 6 images." });
        break;
      }
      const preview = URL.createObjectURL(file);
      next.push({ id: crypto.randomUUID(), preview, progress: 0, file });
    }

    if (next.length) {
      const withProgress = next.map((item) => ({
        ...item,
        progress: 30,
      }));
      onChange([...images, ...withProgress]);
      setTimeout(() => {
        onChange((current) =>
          current.map((item) =>
            next.find((added) => added.id === item.id)
              ? { ...item, progress: 100 }
              : item,
          ),
        );
      }, 600);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };

  const handleRemove = (id: string) => {
    const next = images.filter((image) => image.id !== id);
    onChange(next);
  };

  const handleReorder = (index: number, targetIndex: number) => {
    if (index === targetIndex) {
      return;
    }
    const next = [...images];
    const [moved] = next.splice(index, 1);
    next.splice(targetIndex, 0, moved);
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Product Images</div>
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center"
      >
        <UploadCloud className="h-8 w-8 text-muted-foreground" />
        <div className="text-sm text-muted-foreground">
          Drag and drop up to 6 images or click to upload.
        </div>
        <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
          Browse files
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(event) => addFiles(event.target.files)}
        />
      </div>

      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => {
                event.preventDefault();
                if (dragIndex === null || dragIndex === index) {
                  return;
                }
                handleReorder(dragIndex, index);
                setDragIndex(index);
              }}
              onDragEnd={() => setDragIndex(null)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background"
            >
              <img src={image.preview} alt="Upload preview" className="h-32 w-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(image.id)}
                className="absolute right-2 top-2 rounded-full bg-background/80 p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="px-3 py-2">
                <Progress value={image.progress} className="h-1" />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
