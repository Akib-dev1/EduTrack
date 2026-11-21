const data = loadDemoData();
const paymentForm = document.querySelector("form");
const studentSelect = document.querySelector("#student");
const batchSelect = document.querySelector("#batch");
const monthInput = document.querySelector("#billing-month-input");
const dateInput = document.querySelector("#payment-date");
const amountInput = document.querySelector("#amount");

const expectedFee = document.querySelector("#expected-fee");
const expectedNote = document.querySelector("#expected-note");
const alreadyPaid = document.querySelector("#already-paid");
const paidNote = document.querySelector("#paid-note");
const remainingEl = document.querySelector("#remaining");
const remainingNote = document.querySelector("#remaining-note");
const pendingBadge = document.querySelector("#pending-badge");
const maxAmount = document.querySelector("#max-amount");
const messageBox = document.querySelector("#message");

const batchErr = document.querySelector("#batchErr");
const monthErr = document.querySelector("#monthErr");
const dateErr = document.querySelector("#dateErr");
const amountErr = document.querySelector("#amountErr");

const pageButtons = document.querySelectorAll(".page-actions .outline-button");
const viewDuesButton = pageButtons[0];
const historyButton = pageButtons[1];

let currentRemaining = 0;

/* ---------- Fill dropdowns ---------- */
const fillStudents = () => {
  let html = "";
  for (let i = 0; i < data.students.length; i++) {
    const s = data.students[i];
    html += '<option value="' + s.id + '">' + s.name + " (ID: STU-" + (2048 + s.id) + ")</option>";
  }
  studentSelect.innerHTML = html;
};

// only the enrollments of the selected student
const fillBatches = () => {
  let html = "";
  for (let i = 0; i < data.enrollments.length; i++) {
    const en = data.enrollments[i];
    if (en.studentId === Number(studentSelect.value)) {
      const batch = findById(data.batches, en.batchId);
      html += '<option value="' + en.id + '">' + batch.name + " (" + formatMoney(en.fee) + ")</option>";
    }
  }
  if (html === "") {
    html = '<option value="">No enrollment found</option>';
  }
  batchSelect.innerHTML = html;
};

/* ---------- Balance box ---------- */
const showEmptyBalance = (note) => {
  expectedFee.innerHTML = "৳0";
  alreadyPaid.innerHTML = "৳0";
  remainingEl.innerHTML = "৳0";
  maxAmount.innerHTML = "৳0";
  expectedNote.innerHTML = note;
  paidNote.innerHTML = "";
  remainingNote.innerHTML = "";
  currentRemaining = 0;
};

const refreshBalance = () => {
  const enrollment = findById(data.enrollments, batchSelect.value);
  const month = monthInput.value;

  if (!enrollment || !month) {
    showEmptyBalance("Select a batch and billing month");
    return;
  }
  if (!enrollmentCoversMonth(enrollment, month)) {
    showEmptyBalance("Student is not enrolled in this month");
    return;
  }

  const batch = findById(data.batches, enrollment.batchId);
  const paid = getPaidAmount(data, enrollment.id, month, 0);
  const remaining = enrollment.fee - paid;

  // latest payment date for this enrollment and month
  let lastDate = "";
  for (let i = 0; i < data.payments.length; i++) {
    const p = data.payments[i];
    if (p.enrollmentId === enrollment.id && p.billingMonth === month && p.paymentDate > lastDate) {
      lastDate = p.paymentDate;
    }
  }

  currentRemaining = remaining;
  expectedFee.innerHTML = formatMoney(enrollment.fee);
  alreadyPaid.innerHTML = formatMoney(paid);
  remainingEl.innerHTML = formatMoney(remaining);
  maxAmount.innerHTML = formatMoney(remaining);
  expectedNote.innerHTML = "Regular fee for " + batch.name;
  paidNote.innerHTML = lastDate ? "Recorded on " + dateText(lastDate) : "No payment recorded yet";

  if (remaining > 0) {
    pendingBadge.innerHTML = "Pending";
    remainingNote.innerHTML = "Due before " + dateText(month + "-10");
  } else {
    pendingBadge.innerHTML = "Paid";
    remainingNote.innerHTML = "Fully paid";
  }
};

/* ---------- Validation ---------- */
const validatePayment = () => {
  const amountText = amountInput.value.trim();
  const amount = Number(amountText);

  if (!batchSelect.value) {
    batchErr.innerHTML = "Please select an enrollment";
    return false;
  }
  batchErr.innerHTML = "";

  if (!monthInput.value) {
    monthErr.innerHTML = "Billing month is required";
    return false;
  }
  const enrollment = findById(data.enrollments, batchSelect.value);
  if (!enrollmentCoversMonth(enrollment, monthInput.value)) {
    monthErr.innerHTML = "Student is not enrolled in this month";
    return false;
  }
  monthErr.innerHTML = "";

  if (!dateInput.value) {
    dateErr.innerHTML = "Payment date is required";
    return false;
  }
  dateErr.innerHTML = "";

  if (!amountText) {
    amountErr.innerHTML = "Amount is required";
    return false;
  }
  if (isNaN(amount) || amount <= 0) {
    amountErr.innerHTML = "Amount must be greater than 0";
    return false;
  }
  if (currentRemaining <= 0) {
    amountErr.innerHTML = "This fee is already fully paid";
    return false;
  }
  if (amount > currentRemaining) {
    amountErr.innerHTML = "Amount cannot be more than " + formatMoney(currentRemaining);
    return false;
  }
  amountErr.innerHTML = "";
  return true;
};

/* ---------- Events ---------- */
studentSelect.addEventListener("change", () => {
  fillBatches();
  showMessage(messageBox, "", "");
  refreshBalance();
});

batchSelect.addEventListener("change", () => {
  showMessage(messageBox, "", "");
  refreshBalance();
});

monthInput.addEventListener("change", () => {
  showMessage(messageBox, "", "");
  refreshBalance();
});

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validatePayment()) {
    showMessage(messageBox, "Please fix the errors and try again.", "error");
    return;
  }

  const amount = Number(amountInput.value.trim());
  const newPayment = {
    id: getNextPaymentId(data),
    enrollmentId: Number(batchSelect.value),
    billingMonth: monthInput.value,
    amount: amount,
    paymentDate: dateInput.value,
  };

  data.payments.push(newPayment);
  saveDemoData(data);
  amountInput.value = "";
  refreshBalance();

  showMessage(
    messageBox,
    "Payment " + paymentCode(newPayment.id) + " of " + formatMoney(amount) +
      " saved (demo). Remaining balance: " + formatMoney(currentRemaining),
    "success"
  );
});

// "Clear Form" is a type="reset" button
paymentForm.addEventListener("reset", () => {
  setTimeout(() => {
    monthInput.value = CURRENT_MONTH;
    dateInput.value = getToday();
    batchErr.innerHTML = "";
    monthErr.innerHTML = "";
    dateErr.innerHTML = "";
    amountErr.innerHTML = "";
    showMessage(messageBox, "", "");
    fillBatches();
    refreshBalance();
  }, 0);
});

viewDuesButton.addEventListener("click", () => {
  window.location.href = "due-fees.html";
});

historyButton.addEventListener("click", () => {
  window.location.href = "payment-history.html";
});

/* ---------- Start ---------- */
fillStudents();
monthInput.value = CURRENT_MONTH;
dateInput.value = getToday();

// Coming from Due Fees: fee-collection.html?enrollment=3&month=2026-11
const urlEnrollment = findById(data.enrollments, getQueryParam("enrollment"));
if (urlEnrollment) {
  studentSelect.value = urlEnrollment.studentId;
  fillBatches();
  batchSelect.value = urlEnrollment.id;
  if (getQueryParam("month")) {
    monthInput.value = getQueryParam("month");
  }
} else {
  fillBatches();
}
refreshBalance();