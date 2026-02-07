import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { buildApiUrl } from "@/lib/api";

type VerifyStatus = "valid" | "invalid" | "rate_limited";

type Certificate = {
  certId: string;
  studentName: string;
  courseName: string;
  enrollmentDate: string;
  officeCertificationDate: string;
  certificateIssueDate: string;
  grade: string;
  studentPhotoUrl: string;
  status: string;
};

type VerifyResponse = {
  status: VerifyStatus;
  certificate?: Certificate;
};

const socialIcons = [
  { label: "Facebook", color: "bg-blue-600", text: "f" },
  { label: "Twitter", color: "bg-sky-500", text: "t" },
  { label: "YouTube", color: "bg-red-600", text: "▶" },
  { label: "Instagram", color: "bg-indigo-600", text: "◎" },
];

function formatDate(value?: string) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const VerifyResult = () => {
  const { certId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [status, setStatus] = useState<VerifyStatus>("invalid");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!certId) return;
      try {
        const response = await fetch(
          buildApiUrl(`/api/verify/${certId}?token=${encodeURIComponent(token)}`)
        );

        if (response.status === 404) {
          setStatus("invalid");
          setCertificate(null);
        } else {
          const data = (await response.json()) as VerifyResponse;
          setStatus(data.status);
          setCertificate(data.certificate || null);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("invalid");
        setCertificate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certId, token]);

  const isValid = status === "valid";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="section-container pt-28 pb-20">
        {loading ? (
          <div className="mx-auto max-w-3xl rounded-3xl bg-card p-10 text-center shadow-lg">
            <p className="text-muted-foreground">Checking certificate...</p>
          </div>
        ) : !certificate ? (
          <div className="mx-auto max-w-3xl rounded-3xl bg-card p-10 text-center shadow-lg">
            <h1 className="text-2xl font-semibold text-foreground">Certificate not found</h1>
            <p className="mt-4 text-muted-foreground">
              Please check the certificate ID or contact the institute.
            </p>
            <Button asChild className="mt-6">
              <a href="/verify">Try another</a>
            </Button>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-card shadow-xl">
            <div className="relative">
              <div className="absolute right-0 top-0 h-full w-16 border-l border-border bg-muted/40">
                <div className="flex h-full flex-col items-center justify-center gap-3 py-6">
                  {socialIcons.map((icon) => (
                    <div
                      key={icon.label}
                      className={`${icon.color} text-white text-lg font-bold w-10 h-10 rounded flex items-center justify-center`}
                      title={icon.label}
                    >
                      {icon.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-8 py-10 pr-24">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md">
                    <img
                      src={certificate.studentPhotoUrl}
                      alt={certificate.studentName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm uppercase text-muted-foreground">Certificate Number</p>
                    <h1 className="text-3xl font-bold text-foreground tracking-wide">
                      {certificate.certId}
                    </h1>
                  </div>
                  <div
                    className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold ${
                      isValid
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {isValid ? "VALID CERTIFICATE" : "INVALID / NOT FOUND"}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Certificate No.</p>
                    <p className="font-semibold text-foreground">{certificate.certId}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Course Name</p>
                    <p className="font-semibold text-foreground">{certificate.courseName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Enrollment Date</p>
                    <p className="font-semibold text-foreground">
                      {formatDate(certificate.enrollmentDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">
                      Office Certification Date
                    </p>
                    <p className="font-semibold text-foreground">
                      {formatDate(certificate.officeCertificationDate)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-border/60 pt-6">
                  <p className="text-sm font-semibold uppercase text-muted-foreground">
                    Certificate of Training
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    THIS CERTIFICATE IS PRESENTED TO
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-primary">
                    {certificate.studentName}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    having fulfilled all requirements has been admitted to the training of
                  </p>
                  <p className="mt-2 text-lg font-bold text-primary">
                    {certificate.courseName}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">Grade</p>
                      <p className="font-semibold text-foreground">{certificate.grade}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">Date</p>
                      <p className="font-semibold text-foreground">
                        {formatDate(certificate.certificateIssueDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VerifyResult;