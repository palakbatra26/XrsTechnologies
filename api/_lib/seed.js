import { Student, Employee, Certificate } from "./models.js";
import { hashToken } from "./security.js";

export const seedStudents = [
  {
    name: "Palak Batra",
    roll_no: "IT2023-045",
    course: "B.Tech Information Technology",
    training: "Full Stack Web Development (MERN)",
    duration: "6 Months",
  },
  {
    name: "Aman Sharma",
    roll_no: "CSE2023-112",
    course: "B.Tech Computer Science",
    training: "Python with AI & ML",
    duration: "4 Months",
  },
  {
    name: "Simran Kaur",
    roll_no: "IT2022-078",
    course: "B.Tech Information Technology",
    training: "UI/UX Design",
    duration: "3 Months",
  },
];

export const seedEmployees = [
  {
    empId: "E001",
    name: "Amit Sharma",
    email: "amit.sharma@example.com",
    department: "IT",
    role: "Frontend Developer",
    salary: 55000,
    experience: 2,
    location: "Delhi",
    joiningDate: "2023-06-15",
  },
  {
    empId: "E002",
    name: "Priya Verma",
    email: "priya.verma@example.com",
    department: "HR",
    role: "HR Manager",
    salary: 60000,
    experience: 4,
    location: "Chandigarh",
    joiningDate: "2022-03-10",
  },
  {
    empId: "E003",
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    department: "Finance",
    role: "Accountant",
    salary: 50000,
    experience: 3,
    location: "Mumbai",
    joiningDate: "2021-11-20",
  },
  {
    empId: "E004",
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    department: "Marketing",
    role: "Digital Marketer",
    salary: 52000,
    experience: 2,
    location: "Bangalore",
    joiningDate: "2023-01-05",
  },
  {
    empId: "E005",
    name: "Arjun Singh",
    email: "arjun.singh@example.com",
    department: "IT",
    role: "Backend Developer",
    salary: 70000,
    experience: 5,
    location: "Pune",
    joiningDate: "2020-08-18",
  },
];

export const seedCertificates = [
  {
    certId: "B42152620",
    studentName: "Sajid Ahmad",
    courseName: "BMS Operator & Technician",
    enrollmentDate: new Date("2025-07-01"),
    officeCertificationDate: new Date("2020-12-30"),
    certificateIssueDate: new Date("2017-12-30"),
    grade: "A",
    studentPhotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    status: "active",
    tokenHash: hashToken("demo-token"),
    createdBy: "seed",
  },
];

let seedPromise;

export async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      const studentCount = await Student.countDocuments();
      if (studentCount === 0) {
        await Student.insertMany(seedStudents);
      }

      const employeeCount = await Employee.countDocuments();
      if (employeeCount === 0) {
        await Employee.insertMany(seedEmployees);
      }

      const certCount = await Certificate.countDocuments();
      if (certCount === 0) {
        await Certificate.insertMany(seedCertificates);
      }
    })();
  }

  return seedPromise;
}

export function findStudentFallback(roll_no, training) {
  const byRoll = seedStudents.find((student) => student.roll_no === roll_no);
  if (byRoll) return { student: byRoll, status: "valid" };
  if (!training) return { status: "need_training" };

  const byTraining = seedStudents.find((student) => student.training === training);
  if (!byTraining) return { status: "invalid" };

  return { student: byTraining, status: "valid" };
}

export function findEmployeeFallback(empId, email) {
  const byId = seedEmployees.find((employee) => employee.empId === empId);
  if (byId) return { employee: byId, status: "valid" };
  if (!email) return { status: "need_email" };

  const byEmail = seedEmployees.find((employee) => employee.email === email);
  if (!byEmail) return { status: "invalid" };

  return { employee: byEmail, status: "valid" };
}
