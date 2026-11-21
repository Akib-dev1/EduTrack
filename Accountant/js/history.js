const data = loadDemoData();
const studentFilter = document.querySelector("#student-filter");
const monthFilter = document.querySelector("#month-filter");
const batchFilter = document.querySelector("#batch-filter");
const filterButton = document.querySelector(".filter-buttons .dark-button");
const clearButton = document.querySelector(".filter-buttons .outline-button");
const exportButton = document.querySelector(".page-actions .outline-button");
const collectButton = document.querySelector(".page-actions .dark-button");
const historyTbody = document.querySelector(".payment-table tbody");
const messageBox = document.querySelector("#message");

const editModal = document.querySelector("#editModal");
const editClose = document.querySelector("#edit-close");
const editCancel = document.querySelector("#edit-cancel");
const editSaveButton = document.querySelector("#editSaveButton");
const editTitle = document.querySelector("#edit-title");
const editInfo = document.querySelector("#edit-info");
const editAmount = document.querySelector("#edit-amount");
const editDate = document.querySelector("#edit-date");
const editAmountErr = document.querySelector("#editAmountErr");
const editDateErr = document.querySelector("#editDateErr");

let editingPaymentId = 0;
let editingMax = 0;

/* ---------- Filters ---------- */
const fillFilters = () => {
  let html = '<option value="all">All Students</option>';
  for (let i = 0; i < data.students.length; i++) {
    html += '<option value="' + data.students[i].id + '">' + data.students[i].name + "</option>";
  }
  studentFilter.innerHTML = html;

  html = '<option value="all">All Months</option>';
  for (let j = 0; j < MONTH_LIST.length; j++) {
    html += '<option value="' + MONTH_LIST[j] + '">' + monthLongText(MONTH_LIST[j]) + "</option>";
  }
  monthFilter.innerHTML = html;

  html = '<option value="all">All Batches</option>';
  for (let k = 0; k < data.batches.length; k++) {
    html += '<option value="' + data.batches[k].id + '">' + data.batches[k].name + "</option>";
  }
  batchFilter.innerHTML = html;
};

/* ---------- Table ---------- */
const renderHistory = () => {
  const sorted = sortNewestFirst(data.payments);
  let html = "";
  let count = 0;

  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    const en = findById(data.enrollments, p.enrollmentId);
    const student = findById(data.students, en.studentId);
    const batch = findById(data.batches, en.batchId);

    if (studentFilter.value !== "all" && student.id !== Number(studentFilter.value)) continue;
    if (monthFilter.value !== "all" && p.billingMonth !== monthFilter.value) continue;
    if (batchFilter.value !== "all" && batch.id !== Number(batchFilter.value)) continue;

    const status = getPaymentStatus(data, p);
    count++;

    html +=
      "<tr>" +
      '<td class="payment-id">' + paymentCode(p.id) + "</td>" +
      '<td class="student-name">' + student.name + "</td>" +
      "<td>" + batch.name + "</td>" +
      "<td>" + monthShortText(p.billingMonth) + "</td>" +
      '<td class="date-text">' + dateText(p.paymentDate) + "</td>" +
      '<td class="amount-text">' + formatMoney(p.amount) + "</td>" +
      '<td><span class="status ' + status.toLowerCase() + '">' + status + "</span></td>" +
      '<td><div class="action-box column">' +
      '<button type="button" data-action="edit" data-id="' + p.id + '">' +
      '<i class="fa-regular fa-pen-to-square"></i> Edit</button>' +
      '<button type="button" class="receipt-button" data-action="receipt" data-id="' + p.id + '">Receipt</button>' +
      "</div></td>" +
      "</tr>";
  }

  if (count === 0) {
    html = '<tr><td colspan="8">No payments match your filters.</td></tr>';
  }
  historyTbody.innerHTML = html;
};

/* ---------- Edit modal ---------- */
const openEditModal = (paymentId) => {
  const p = findById(data.payments, paymentId);
  const en = findById(data.enrollments, p.enrollmentId);
  const student = findById(data.students, en.studentId);
  const batch = findById(data.batches, en.batchId);

  // maximum = fee - what OTHER payments already paid (this payment is excluded)
  editingPaymentId = p.id;
  editingMax = en.fee - getPaidAmount(data, en.id, p.billingMonth, p.id);

  editTitle.innerHTML = "Edit Payment — " + paymentCode(p.id);
  editInfo.innerHTML =
    student.name + " · " + batch.name + " · " + monthLongText(p.billingMonth) +
    "<br>Enrollment and billing month are locked. Maximum amount: " + formatMoney(editingMax);
  editDate.value = p.paymentDate;
  editAmount.value = p.amount;
  editDateErr.innerHTML = "";
  editAmountErr.innerHTML = "";
  editModal.classList.add("open");
};

const validateEditPayment = () => {
  const amountText = editAmount.value.trim();
  const amount = Number(amountText);

  if (!editDate.value) {
    editDateErr.innerHTML = "Payment date is required";
    return false;
  }
  editDateErr.innerHTML = "";

  if (!amountText) {
    editAmountErr.innerHTML = "Amount is required";
    return false;
  }
  if (isNaN(amount) || amount <= 0) {
    editAmountErr.innerHTML = "Amount must be greater than 0";
    return false;
  }
  if (amount > editingMax) {
    editAmountErr.innerHTML = "Amount cannot be more than " + formatMoney(editingMax);
    return false;
  }
  editAmountErr.innerHTML = "";
  return true;
};

/* ---------- Events ---------- */
historyTbody.addEventListener("click", (e) => {
  let button = e.target;
  // the click can land on the icon inside the Edit button
  if (button.tagName === "I") {
    button = button.parentNode;
  }
  if (button.tagName !== "BUTTON") {
    return;
  }
  const id = button.getAttribute("data-id");
  if (button.getAttribute("data-action") === "edit") {
    openEditModal(id);
  } else {
    const p = findById(data.payments, id);
    alert(
      "Receipt for " + paymentCode(p.id) + " (" + formatMoney(p.amount) + ")\n" +
      "Printing will be connected in Phase 2."
    );
  }
});

editSaveButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateEditPayment()) {
    const p = findById(data.payments, editingPaymentId);
    p.amount = Number(editAmount.value.trim());
    p.paymentDate = editDate.value;
    saveDemoData(data);

    editModal.classList.remove("open");
    renderHistory();
    showMessage(
      messageBox,
      "Payment " + paymentCode(p.id) + " updated to " + formatMoney(p.amount) + " (demo).",
      "success"
    );
  }
});

[editClose, editCancel].forEach((btn) => {
  btn.addEventListener("click", () => {
    editModal.classList.remove("open");
  });
});

filterButton.addEventListener("click", () => {
  showMessage(messageBox, "", "");
  renderHistory();
});

[studentFilter, monthFilter, batchFilter].forEach((select) => {
  select.addEventListener("change", renderHistory);
});

clearButton.addEventListener("click", () => {
  studentFilter.value = "all";
  monthFilter.value = "all";
  batchFilter.value = "all";
  showMessage(messageBox, "", "");
  renderHistory();
});

exportButton.addEventListener("click", () => {
  alert("Export CSV / PDF will be connected in Phase 2 (PHP).");
});

collectButton.addEventListener("click", () => {
  window.location.href = "fee-collection.html";
});

/* ---------- Start ---------- */
fillFilters();
renderHistory();