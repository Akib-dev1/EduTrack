const data = loadDemoData();
const monthSelect = document.querySelector("#billing-month");
const expectedTotal = document.querySelector("#expected-total");
const paidTotal = document.querySelector("#paid-total");
const outstandingTotal = document.querySelector("#outstanding-total");
const expectedNote = document.querySelector("#expected-note");
const paidPercent = document.querySelector("#paid-percent");
const paidCount = document.querySelector("#paid-count");
const overdueNote = document.querySelector("#overdue-note");
const recentTbody = document.querySelector(".payment-table tbody");
const tabButtons = document.querySelectorAll(".tab");
const tabAll = tabButtons[0];
const tabEmpty = tabButtons[1];
const searchInput = document.querySelector("#search");
const filterButton = document.querySelector(".filter-button");
const viewDuesButton = document.querySelector(".page-actions .outline-button");
const collectButton = document.querySelector(".page-actions .dark-button");

let showEmptyState = false;

const renderCards = () => {
  const month = monthSelect.value;
  let expected = 0;
  let paid = 0;
  let transactions = 0;

  for (let i = 0; i < data.enrollments.length; i++) {
    const en = data.enrollments[i];
    if (enrollmentCoversMonth(en, month)) {
      expected += en.fee;
      paid += getPaidAmount(data, en.id, month, 0);
    }
  }
  for (let j = 0; j < data.payments.length; j++) {
    if (data.payments[j].billingMonth === month) {
      transactions++;
    }
  }

  const percent = expected > 0 ? ((paid / expected) * 100).toFixed(1) : "0.0";

  expectedTotal.innerHTML = formatMoney(expected);
  paidTotal.innerHTML = formatMoney(paid);
  outstandingTotal.innerHTML = formatMoney(expected - paid);
  expectedNote.innerHTML = "Total projected tuition for " + monthShortText(month);
  paidPercent.innerHTML = '<i class="fa-solid fa-arrow-trend-up"></i> ' + percent + "% collected";
  paidCount.innerHTML = transactions + " transactions";
  overdueNote.innerHTML = formatMoney(getOverdueBefore(data, month)) + " overdue from previous terms";
};

const getRecentPayments = () => {
  const sorted = sortNewestFirst(data.payments);
  const text = searchInput.value.trim().toLowerCase();
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    const en = findById(data.enrollments, p.enrollmentId);
    const student = findById(data.students, en.studentId);
    const batch = findById(data.batches, en.batchId);
    const searchable = (paymentCode(p.id) + " " + student.name + " " + batch.name).toLowerCase();
        if (p.billingMonth === monthSelect.value && (!text || searchable.indexOf(text) !== -1)) {
      result.push(p);
    }
  }
  return result.slice(0, 6);
};

const renderRecentPayments = () => {
  const list = showEmptyState ? [] : getRecentPayments();
  let html = "";

  if (list.length === 0) {
    html = '<tr><td colspan="8">No payments found.</td></tr>';
  }

  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    const en = findById(data.enrollments, p.enrollmentId);
    const student = findById(data.students, en.studentId);
    const batch = findById(data.batches, en.batchId);
    const status = getPaymentStatus(data, p);

    html +=
      "<tr>" +
      '<td class="payment-id">' + paymentCode(p.id) + "</td>" +
      '<td class="student-name">' + student.name + "</td>" +
      "<td>" + batch.name + "</td>" +
      "<td>" + monthShortText(p.billingMonth) + "</td>" +
      '<td class="date-text">' + dateText(p.paymentDate) + "</td>" +
      '<td class="amount-text">' + formatMoney(p.amount) + "</td>" +
      '<td><span class="status ' + status.toLowerCase() + '">' + status + "</span></td>" +
      '<td><div class="action-box">' +
      '<button type="button" data-action="details" data-id="' + p.id + '">Details</button>' +
      '<button type="button" data-action="receipt" data-id="' + p.id + '">Receipt</button>' +
      "</div></td>" +
      "</tr>";
  }

  recentTbody.innerHTML = html;
  tabAll.innerHTML = "All Records (" + list.length + ")";
};

/* ---------- Events ---------- */
// Rows are created by JS, so one listener on the tbody handles every button
recentTbody.addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName !== "BUTTON") {
    return;
  }
  const payment = findById(data.payments, button.getAttribute("data-id"));
  const en = findById(data.enrollments, payment.enrollmentId);
  const student = findById(data.students, en.studentId);
  const batch = findById(data.batches, en.batchId);

  if (button.getAttribute("data-action") === "details") {
    alert(
      paymentCode(payment.id) + "\n" +
      "Student: " + student.name + "\n" +
      "Batch: " + batch.name + "\n" +
      "Billing month: " + monthLongText(payment.billingMonth) + "\n" +
      "Received on: " + dateText(payment.paymentDate) + "\n" +
      "Amount: " + formatMoney(payment.amount)
    );
  } else {
    alert(
      "Receipt for " + paymentCode(payment.id) + " (" + formatMoney(payment.amount) + ")\n" +
      "Printing will be connected in Phase 2."
    );
  }
});

monthSelect.addEventListener("change", () => {
  renderCards();
  renderRecentPayments();
});
searchInput.addEventListener("input", renderRecentPayments);
filterButton.addEventListener("click", renderRecentPayments);

tabAll.addEventListener("click", () => {
  showEmptyState = false;
  tabAll.className = "tab active-tab";
  tabEmpty.className = "tab";
  renderRecentPayments();
});

tabEmpty.addEventListener("click", () => {
  showEmptyState = true;
  tabEmpty.className = "tab active-tab";
  tabAll.className = "tab";
  renderRecentPayments();
});

viewDuesButton.addEventListener("click", () => {
  window.location.href = "due-fees.html";
});

collectButton.addEventListener("click", () => {
  window.location.href = "fee-collection.html";
});

/* ---------- Start ---------- */
fillMonthSelect(monthSelect, CURRENT_MONTH);
renderCards();
renderRecentPayments();