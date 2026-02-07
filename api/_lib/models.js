import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    roll_no: { type: String, required: true, unique: true, index: true },
    course: { type: String, required: true },
    training: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { timestamps: true },
);

const employeeSchema = new mongoose.Schema(
  {
    empId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: Number, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    joiningDate: { type: String, required: true },
  },
  { timestamps: true },
);

const certificateSchema = new mongoose.Schema(
  {
    certId: { type: String, required: true, unique: true, index: true },
    studentName: { type: String, required: true },
    courseName: { type: String, required: true },
    enrollmentDate: { type: Date, required: true },
    officeCertificationDate: { type: Date, required: true },
    certificateIssueDate: { type: Date, required: true },
    grade: { type: String, required: true },
    studentPhotoUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "revoked"],
      default: "active",
    },
    tokenHash: { type: String, required: true },
    createdBy: { type: String },
  },
  { timestamps: true },
);

const certificateScanSchema = new mongoose.Schema(
  {
    certId: { type: String, required: true, index: true },
    scannedAt: { type: Date, required: true },
    ip: { type: String },
    userAgent: { type: String },
    location: {
      city: { type: String },
      region: { type: String },
      country: { type: String },
    },
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
export const Certificate =
  mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
export const CertificateScan =
  mongoose.models.CertificateScan ||
  mongoose.model("CertificateScan", certificateScanSchema);
