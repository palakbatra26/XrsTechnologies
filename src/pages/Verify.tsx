import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildApiUrl } from "@/lib/api";

const Verify = () => {
  const [verificationType, setVerificationType] = useState<"student" | "employee">(
    "employee",
  );
  const [rollNo, setRollNo] = useState("");
  const [training, setTraining] = useState("");
  const [empId, setEmpId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [student, setStudent] = useState<null | {
    name: string;
    roll_no: string;
    course: string;
    training: string;
    duration: string;
  }>(null);
  const [employee, setEmployee] = useState<null | {
    empId: string;
    name: string;
    email: string;
    department: string;
    role: string;
    salary: number;
    experience: number;
    location: string;
    joiningDate: string;
  }>(null);
  const [showTraining, setShowTraining] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (verificationType === "student" && !rollNo.trim()) return;
    if (verificationType === "employee" && !empId.trim()) return;
    setError("");
    setLoading(true);
    setStudent(null);
    setEmployee(null);

    try {
      const endpoint =
        verificationType === "student" ? "verify-student" : "verify-employee";
      const payload =
        verificationType === "student"
          ? {
              roll_no: rollNo.trim(),
              training: showTraining ? training.trim() : undefined,
            }
          : {
              empId: empId.trim(),
              email: showEmail ? email.trim() : undefined,
            };

      const response = await fetch(buildApiUrl(`/api/${endpoint}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        const data = await response.json();
        if (data.status === "need_training") {
          setShowTraining(true);
          setError("Roll number not found. Please enter your training domain.");
          return;
        }
        if (data.status === "need_email") {
          setShowEmail(true);
          setError("Employee ID not found. Please enter your email address.");
          return;
        }
        setError(
          verificationType === "student"
            ? "Student not found. Please check your details."
            : "Employee not found. Please check your details.",
        );
        return;
      }

      if (!response.ok) {
        setError("Unable to verify. Please try again later.");
        return;
      }

      const data = await response.json();
      setStudent(data.student || null);
      setEmployee(data.employee || null);
      setShowTraining(false);
      setShowEmail(false);
    } catch (error) {
      console.error("Verification error:", error);
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
            {verificationType === "student" ? "Student Verification" : "Employee Verification"}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-foreground">
            {verificationType === "student"
              ? "Verify your training"
              : "Verify your employment"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {verificationType === "student"
              ? "Enter your roll number. If not found, you’ll be asked for your training domain."
              : "Enter your employee ID. If not found, you’ll be asked for your email address."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              variant={verificationType === "student" ? "default" : "outline"}
              onClick={() => {
                setVerificationType("student");
                setError("");
                setStudent(null);
                setEmployee(null);
                setShowTraining(false);
                setShowEmail(false);
              }}
            >
              Student Verification
            </Button>
            <Button
              type="button"
              variant={verificationType === "employee" ? "default" : "outline"}
              onClick={() => {
                setVerificationType("employee");
                setError("");
                setStudent(null);
                setEmployee(null);
                setShowTraining(false);
                setShowEmail(false);
              }}
            >
              Employee Verification
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {verificationType === "student" ? (
              <>
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
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="empId">Employee ID</Label>
                  <Input
                    id="empId"
                    value={empId}
                    onChange={(event) => setEmpId(event.target.value)}
                    placeholder="e.g., E001"
                    required
                  />
                </div>
                {showEmail && (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="e.g., amit.sharma@example.com"
                      required
                    />
                  </div>
                )}
              </>
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

          {employee && (
            <div className="mt-8 rounded-2xl border border-border/60 bg-muted/30 p-6">
              <h2 className="text-xl font-semibold text-foreground">Employee Details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{employee.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Employee ID</p>
                  <p className="font-semibold text-foreground">{employee.empId}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Department</p>
                  <p className="font-semibold text-foreground">{employee.department}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Role</p>
                  <p className="font-semibold text-foreground">{employee.role}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{employee.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{employee.location}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Experience</p>
                  <p className="font-semibold text-foreground">{employee.experience} years</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Salary</p>
                  <p className="font-semibold text-foreground">
                    ₹{employee.salary.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Joining Date</p>
                  <p className="font-semibold text-foreground">{employee.joiningDate}</p>
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