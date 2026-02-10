import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (/^https?:\/\/localhost:\d+$/i.test(origin)) return callback(null, true);
      return callback(new Error("CORS blocked for origin: " + origin));
    },
  }),
);
app.use(express.json());

let mongoosePromise;
async function connectToDatabase() {
  if (!mongoUri) {
    return null;
  }
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!mongoosePromise) {
    mongoosePromise = mongoose.connect(mongoUri, { bufferCommands: false });
  }
  await mongoosePromise;
  return mongoose.connection;
}

function findStudentFallback(roll_no, training) {
  const byRoll = seedStudents.find((student) => student.roll_no === roll_no);
  if (byRoll) return { status: "valid", student: byRoll };
  if (!training) return { status: "need_training" };

  const byTraining = seedStudents.find((student) => student.training === training);
  if (!byTraining) return { status: "invalid" };

  return { status: "valid", student: byTraining };
}

function findEmployeeFallback(empId, email) {
  const byId = seedEmployees.find((employee) => employee.empId === empId);
  if (byId) return { status: "valid", employee: byId };
  if (!email) return { status: "need_email" };

  const byEmail = seedEmployees.find((employee) => employee.email === email);
  if (!byEmail) return { status: "invalid" };

  return { status: "valid", employee: byEmail };
}

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

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model("NewsletterSubscriber", newsletterSubscriberSchema);

const newsletterFallbackSubscribers = new Set();

const seedStudents = [
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

const seedEmployees = [
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

let seedPromise;
async function ensureSeeded() {
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
    })();
  }
  return seedPromise;
}

app.post("/api/verify-student", async (req, res) => {
  const { roll_no, training } = req.body || {};

  if (!roll_no) {
    return res.status(400).json({ status: "invalid", message: "Roll number is required." });
  }

  if (!mongoUri) {
    const fallback = findStudentFallback(roll_no, training);
    if (fallback.status === "valid") {
      return res.json({ status: "valid", student: fallback.student });
    }
    if (fallback.status === "need_training") {
      return res.status(404).json({ status: "need_training" });
    }
    return res.status(404).json({ status: "invalid" });
  }

  try {
    await connectToDatabase();
    await ensureSeeded();

    const student = await Student.findOne({ roll_no }).lean();

    if (student) {
      return res.json({ status: "valid", student });
    }

    if (!training) {
      return res.status(404).json({ status: "need_training" });
    }

    const matchByTraining = await Student.findOne({ training }).lean();

    if (!matchByTraining) {
      return res.status(404).json({ status: "invalid" });
    }

    return res.json({ status: "valid", student: matchByTraining });
  } catch {
    const fallback = findStudentFallback(roll_no, training);
    if (fallback.status === "valid") {
      return res.json({ status: "valid", student: fallback.student });
    }
    if (fallback.status === "need_training") {
      return res.status(404).json({ status: "need_training" });
    }
    return res.status(404).json({ status: "invalid" });
  }
});

app.post("/api/verify-employee", async (req, res) => {
  const { empId, email } = req.body || {};

  if (!empId) {
    return res.status(400).json({ status: "invalid", message: "Employee ID is required." });
  }

  if (!mongoUri) {
    const fallback = findEmployeeFallback(empId, email);
    if (fallback.status === "valid") {
      return res.json({ status: "valid", employee: fallback.employee });
    }
    if (fallback.status === "need_email") {
      return res.status(404).json({ status: "need_email" });
    }
    return res.status(404).json({ status: "invalid" });
  }

  try {
    await connectToDatabase();
    await ensureSeeded();

    const employee = await Employee.findOne({ empId }).lean();

    if (employee) {
      return res.json({ status: "valid", employee });
    }

    if (!email) {
      return res.status(404).json({ status: "need_email" });
    }

    const matchByEmail = await Employee.findOne({ email }).lean();

    if (!matchByEmail) {
      return res.status(404).json({ status: "invalid" });
    }

    return res.json({ status: "valid", employee: matchByEmail });
  } catch {
    const fallback = findEmployeeFallback(empId, email);
    if (fallback.status === "valid") {
      return res.json({ status: "valid", employee: fallback.employee });
    }
    if (fallback.status === "need_email") {
      return res.status(404).json({ status: "need_email" });
    }
    return res.status(404).json({ status: "invalid" });
  }
});

app.post("/api/subscribe", async (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  try {
    if (!mongoUri) {
      newsletterFallbackSubscribers.add(email);
      return res.status(200).json({ ok: true, message: "Subscribed successfully." });
    }

    await connectToDatabase();
    await NewsletterSubscriber.updateOne(
      { email },
      { $setOnInsert: { email, source: "website" } },
      { upsert: true },
    );

    return res.status(200).json({ ok: true, message: "Subscribed successfully." });
  } catch (error) {
    console.error("Newsletter subscribe fallback:", error.message || error);
    newsletterFallbackSubscribers.add(email);
    return res.status(200).json({ ok: true, message: "Subscribed successfully." });
  }
});

app.listen(port, () => {
  if (!mongoUri) {
    console.warn("MONGODB_URI not set. API is running in fallback seed-data mode.");
  }
  console.log(`vprotech API running on http://localhost:${port}`);
});