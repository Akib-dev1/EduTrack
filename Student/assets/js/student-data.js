window.studentDemoData = {
  student: {
    id: 301,
    name: "Samira Rahman",
    username: "samira.demo",
    phone: "0123-456-789"
  },
  courses: [
    { id: 11, name: "Mathematics", description: "Core mathematics" },
    { id: 12, name: "English", description: "English language" }
  ],
  batches: [
    { id: 21, courseId: 11, name: "Maths - Morning", teacher: "Nadia Karim", schedule: "Sunday and Tuesday, 9:00-10:00 AM" },
    { id: 22, courseId: 12, name: "English - Evening", teacher: "Rafi Ahmed", schedule: "Monday and Wednesday, 4:00-5:00 PM" },
    { id: 23, courseId: 12, name: "English - Other", teacher: "Demo Teacher", schedule: "Friday, 2:00-3:00 PM" }
  ],
  enrollments: [
    { id: 401, studentId: 301, batchId: 21, startMonth: "2026-01", endMonth: null, monthlyFeeCents: 500000 },
    { id: 402, studentId: 301, batchId: 22, startMonth: "2026-02", endMonth: null, monthlyFeeCents: 350000 }
  ],
  attendance: [
    { enrollmentId: 401, date: "2026-11-02", status: "present" },
    { enrollmentId: 401, date: "2026-11-04", status: "present" },
    { enrollmentId: 401, date: "2026-11-09", status: "absent" },
    { enrollmentId: 401, date: "2026-11-11", status: "present" },
    { enrollmentId: 402, date: "2026-11-03", status: "present" },
    { enrollmentId: 402, date: "2026-11-10", status: "absent" }
  ],
  exams: [
    { id: 501, batchId: 21, title: "Chapter 1 test", date: "2026-11-06", totalMarks: 100 },
    { id: 502, batchId: 21, title: "Practice test", date: "2026-11-13", totalMarks: 50 },
    { id: 503, batchId: 22, title: "Vocabulary quiz", date: "2026-11-12", totalMarks: 20 },
    { id: 504, batchId: 23, title: "Other batch test", date: "2026-11-14", totalMarks: 25 },
    { id: 505, batchId: 21, title: "Monthly review", date: "2026-11-15", totalMarks: 25 }
  ],
  marks: [
    { examId: 501, studentId: 301, obtainedMarks: 78 },
    { examId: 502, studentId: 301, obtainedMarks: 0 },
    { examId: 503, studentId: 301, obtainedMarks: 16 }
  ],
  payments: [
    { enrollmentId: 401, billingMonth: "2026-11", amountCents: 300000 },
    { enrollmentId: 402, billingMonth: "2026-11", amountCents: 350000 }
  ]
};
