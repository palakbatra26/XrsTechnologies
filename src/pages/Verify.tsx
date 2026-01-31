import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Verify = () => {
  const [rollNo, setRollNo] = useState("");
  const [training, setTraining] = useState("");
  const [error, setError] = useState("");
  const [student, setStudent] = useState<null | {
    name: string;
    roll_no: string;
    course: string;
    training: string;
    duration: string;
  }>(null);
  const [showTraining, setShowTraining] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!rollNo.trim()) return;
    setError("");
    setLoading(true);
    setStudent(null);

    try {
      const baseUrl =
        import.meta.env.VITE_VERIFY_API_BASE_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/verify-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roll_no: rollNo.trim(),
          training: showTraining ? training.trim() : undefined,
        }),
      });

      if (response.status === 404) {
        const data = await response.json();
        if (data.status === "need_training") {
          setShowTraining(true);
          setError("Roll number not found. Please enter your training domain.");
        } else {
          setError("Student not found. Please check your details.");
        }
      } else if (!response.ok) {
        setError("Unable to verify. Please try again.");
      } else {
        const data = await response.json();
        setStudent(data.student);
        setShowTraining(false);
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Unable to verify. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="section-container pt-28 pb-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-card/80 p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Student Verification
          </p>
          <h1 className="mt-3 text-3xl font-bold text-foreground">Verify your training</h1>
          <p className="mt-3 text-muted-foreground">
            Enter your roll number. If not found, you’ll be asked for your training domain.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="rollNo">Roll Number</Label>
              <Input
                id="rollNo"
                value={rollNo}
                onChange={(event) => setRollNo(event.target.value)}
                placeholder="e.g., IT2023-045"
                required
              />
            </div>
            {showTraining && (
              <div className="space-y-2">
                <Label htmlFor="training">Training Domain</Label>
                <Input
                  id="training"
                  value={training}
                  onChange={(event) => setTraining(event.target.value)}
                  placeholder="e.g., Full Stack Web Development (MERN)"
                  required
                />
              </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Checking..." : "Verify"}
            </Button>
          </form>

          {student && (
            <div className="mt-8 rounded-2xl border border-border/60 bg-muted/30 p-6">
              <h2 className="text-xl font-semibold text-foreground">Student Details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{student.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Roll No.</p>
                  <p className="font-semibold text-foreground">{student.roll_no}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Course</p>
                  <p className="font-semibold text-foreground">{student.course}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Training</p>
                  <p className="font-semibold text-foreground">{student.training}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{student.duration}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Verify;