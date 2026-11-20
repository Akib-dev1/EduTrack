const DEMO_KEY = "scholivance_demo_v1";
const CURRENT_MONTH = "2026-11";
const MONTH_LIST = ["2026-11", "2026-10", "2026-09"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ---------- Demo data (fictional) ---------- */
const getSeedData = () => {
  return {
    students: [
      { id: 1, name: "Rahim Uddin", phone: "01711-000001" },
      { id: 2, name: "Nusrat Jahan", phone: "01811-000002" },
      { id: 3, name: "Tanvir Hasan", phone: "01911-000003" },
      { id: 4, name: "Farhana Akter", phone: "01611-000004" },
      { id: 5, name: "Mahir Faisal", phone: "01511-000005" },
      { id: 6, name: "Sadman Sakib", phone: "01311-000006" },
      { id: 7, name: "Anika Tabassum", phone: "01411-000007" },
      { id: 8, name: "Mehedi Hasan", phone: "01711-000008" },
    ],
    batches: [
      { id: 1, name: "Physics Morning A", fee: 1500 },
      { id: 2, name: "English Batch C", fee: 1000 },
      { id: 3, name: "Math Evening B", fee: 1200 },
      { id: 4, name: "Medical Bio Core", fee: 2000 },
      { id: 5, name: "HSC-25 Chemistry Spark", fee: 1500 },
      { id: 6, name: "BUET Math Advanced", fee: 1800 },
      { id: 7, name: "SSC-26 Math Pioneer", fee: 1000 },
      { id: 8, name: "General Science Morning", fee: 900 },
    ],
    enrollments: [
      { id: 1, studentId: 1, batchId: 1, startMonth: "2026-09", endMonth: "", fee: 1500 },
      { id: 2, studentId: 1, batchId: 2, startMonth: "2026-09", endMonth: "", fee: 1000 },
      { id: 3, studentId: 2, batchId: 2, startMonth: "2026-09", endMonth: "", fee: 1000 },
      { id: 4, studentId: 2, batchId: 1, startMonth: "2026-09", endMonth: "", fee: 1500 },
      { id: 5, studentId: 3, batchId: 3, startMonth: "2026-09", endMonth: "", fee: 1200 },
      { id: 6, studentId: 3, batchId: 5, startMonth: "2026-09", endMonth: "", fee: 1500 },
      { id: 7, studentId: 4, batchId: 4, startMonth: "2026-09", endMonth: "", fee: 2000 },
      { id: 8, studentId: 5, batchId: 5, startMonth: "2026-09", endMonth: "", fee: 1500 },
      { id: 9, studentId: 6, batchId: 6, startMonth: "2026-09", endMonth: "", fee: 1800 },
      { id: 10, studentId: 7, batchId: 7, startMonth: "2026-09", endMonth: "", fee: 1000 },
      { id: 11, studentId: 8, batchId: 8, startMonth: "2026-09", endMonth: "", fee: 900 },
    ],
    payments: [
      { id: 98, enrollmentId: 11, billingMonth: "2026-10", amount: 900, paymentDate: "2026-10-28" },
      { id: 99, enrollmentId: 10, billingMonth: "2026-11", amount: 1000, paymentDate: "2026-10-29" },
      { id: 100, enrollmentId: 9, billingMonth: "2026-11", amount: 1800, paymentDate: "2026-10-30" },
      { id: 101, enrollmentId: 8, billingMonth: "2026-10", amount: 1500, paymentDate: "2026-10-31" },
      { id: 102, enrollmentId: 7, billingMonth: "2026-11", amount: 500, paymentDate: "2026-11-01" },
      { id: 103, enrollmentId: 5, billingMonth: "2026-11", amount: 600, paymentDate: "2026-11-01" },
      { id: 104, enrollmentId: 3, billingMonth: "2026-11", amount: 500, paymentDate: "2026-11-02" },
      { id: 105, enrollmentId: 1, billingMonth: "2026-11", amount: 1500, paymentDate: "2026-11-03" },
    ],
  };
};

const saveDemoData = (data) => {
  try {
    localStorage.setItem(DEMO_KEY, JSON.stringify(data));
  } catch (e) {}
};

const loadDemoData = () => {
  let saved = null;
  try {
    saved = localStorage.getItem(DEMO_KEY);
  } catch (e) {}
  if (saved) {
    return JSON.parse(saved);
  }
  const seed = getSeedData();
  saveDemoData(seed);
  return seed;
};

const resetDemoData = () => {
  const seed = getSeedData();
  saveDemoData(seed);
  return seed;
};

/* ---------- Small helpers ---------- */
const findById = (list, id) => {
  return list.find((item) => item.id === Number(id)) || null;
};

const paymentCode = (id) => {
  return "PAY-" + String(id).padStart(4, "0");
};

const formatMoney = (amount) => {
  return "৳" + Number(amount).toLocaleString("en-IN");
};

const monthLongText = (month) => {
  const parts = month.split("-");
  return MONTH_NAMES[Number(parts[1]) - 1] + " " + parts[0];
};

const monthShortText = (month) => {
  const parts = month.split("-");
  return MONTH_NAMES[Number(parts[1]) - 1].substring(0, 3) + " " + parts[0];
};

const dateText = (dateString) => {
  const parts = dateString.split("-");
  return parts[2] + " " + MONTH_NAMES[Number(parts[1]) - 1].substring(0, 3) + " " + parts[0];
};

const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
};

const getQueryParam = (name) => {
  return new URLSearchParams(window.location.search).get(name) || "";
};

const showMessage = (box, text, type) => {
  box.innerHTML = text;
  box.className = text ? "message " + type : "";
};

const fillMonthSelect = (select, selected) => {
  let html = "";
  for (let i = 0; i < MONTH_LIST.length; i++) {
    html += '<option value="' + MONTH_LIST[i] + '">' + monthLongText(MONTH_LIST[i]) + "</option>";
  }
  select.innerHTML = html;
  select.value = selected;
};

// newest payment first
const sortNewestFirst = (list) => {
  return list.slice().sort((a, b) => {
    if (a.paymentDate < b.paymentDate) return 1;
    if (a.paymentDate > b.paymentDate) return -1;
    return b.id - a.id;
  });
};

/* ---------- Fee calculation (one formula for all pages) ---------- */
// An enrollment is charged only between its start and end month (inclusive)
const enrollmentCoversMonth = (enrollment, month) => {
  if (month < enrollment.startMonth) {
    return false;
  }
  if (enrollment.endMonth && month > enrollment.endMonth) {
    return false;
  }
  return true;
};

// Sum of payments for ONE enrollment and ONE billing month.
// skipPaymentId is used when editing, so the edited payment is not counted twice.
const getPaidAmount = (data, enrollmentId, month, skipPaymentId) => {
  let total = 0;
  for (let i = 0; i < data.payments.length; i++) {
    const p = data.payments[i];
    if (
      p.enrollmentId === Number(enrollmentId) &&
      p.billingMonth === month &&
      p.id !== skipPaymentId
    ) {
      total += p.amount;
    }
  }
  return total;
};

const getStatusText = (expected, paid) => {
  if (paid <= 0) {
    return "Unpaid";
  }
  if (paid < expected) {
    return "Partial";
  }
  return "Paid";
};

const getPaymentStatus = (data, payment) => {
  const enrollment = findById(data.enrollments, payment.enrollmentId);
  const paid = getPaidAmount(data, enrollment.id, payment.billingMonth, 0);
  return getStatusText(enrollment.fee, paid);
};

const getNextPaymentId = (data) => {
  let max = 0;
  for (let i = 0; i < data.payments.length; i++) {
    if (data.payments[i].id > max) {
      max = data.payments[i].id;
    }
  }
  return max + 1;
};

// Unpaid money from months BEFORE the selected month
const getOverdueBefore = (data, month) => {
  let total = 0;
  for (let i = 0; i < data.enrollments.length; i++) {
    const en = data.enrollments[i];
    for (let j = 0; j < MONTH_LIST.length; j++) {
      const m = MONTH_LIST[j];
      if (m < month && enrollmentCoversMonth(en, m)) {
        total += en.fee - getPaidAmount(data, en.id, m, 0);
      }
    }
  }
  return total;
};