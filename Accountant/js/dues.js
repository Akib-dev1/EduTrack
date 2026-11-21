const data = loadDemoData();
const monthSelect = document.querySelector("#due-month");
const searchInput = document.querySelector("#due-search");
const filterButton = document.querySelector(".filter-buttons .dark-button");
const clearButton = document.querySelector(".filter-buttons .outline-button");
const exportButton = document.querySelector(".page-actions .outline-button");
const collectButton = document.querySelector(".page-actions .dark-button");
const dueTbody = document.querySelector(".due-table tbody");
const studentCount = document.querySelector("#due-student-count");
const cohortNote = document.querySelector("#due-cohort-note");
const totalEl = document.querySelector("#due-total");
const overdueNote = document.querySelector("#due-overdue-note");

const renderDues = () => {
  const month = monthSelect.value;
  const text = searchInput.value.trim().toLowerCase();

  let html = "";
  let totalDue = 0;
  const studentIds = [];
  const batchIds = [];

  for (let i = 0; i < data.enrollments.length; i++) {
    const en = data.enrollments[i];

    // skip enrollments that are not charged in this month
    if (!enrollmentCoversMonth(en, month)) continue;

    const paid = getPaidAmount(data, en.id, month, 0);
    const due = en.fee - paid;

    // hide fully paid enrollments
    if (due <= 0) continue;

    const student = findById(data.students, en.studentId);
    const batch = findById(data.batches, en.batchId);

    // cards count every due in the month
    totalDue += due;
    if (studentIds.indexOf(student.id) === -1) studentIds.push(student.id);
    if (batchIds.indexOf(batch.id) === -1) batchIds.push(batch.id);

    // the search only filters the table rows
    const searchable = (student.name + " " + student.phone + " " + batch.name).toLowerCase();
    if (text && searchable.indexOf(text) === -1) continue;

    const status = getStatusText(en.fee, paid);
    const paidClass = paid > 0 ? "green-text" : "gray-text";
    const dueClass = paid > 0 ? "orange-text" : "red-text";

    html +=
      "<tr>" +
      '<td class="student-name">' + student.name + "</td>" +
      '<td class="contact-text">' + student.phone + "</td>" +
      "<td>" + batch.name + "</td>" +
      '<td class="number-cell">' + formatMoney(en.fee) + "</td>" +
      '<td class="number-cell ' + paidClass + '">' + formatMoney(paid) + "</td>" +
      '<td class="number-cell ' + dueClass + '">' + formatMoney(due) + "</td>" +
      '<td><span class="status ' + status.toLowerCase() + '">' + status + "</span></td>" +
      '<td class="action-cell">' +
      '<button type="button" class="collect-button" data-id="' + en.id + '">Collect Fee</button>' +
      "</td>" +
      "</tr>";
  }

  if (html === "") {
    html = '<tr><td colspan="8">No outstanding fees for this month</td></tr>';
  }
  dueTbody.innerHTML = html;

  studentCount.innerHTML = studentIds.length;
  cohortNote.innerHTML = "Across " + batchIds.length + " active batches";
  totalEl.innerHTML = formatMoney(totalDue);
  overdueNote.innerHTML = formatMoney(getOverdueBefore(data, month)) + " overdue from previous terms";
};

/* ---------- Events ---------- */
// "Collect Fee" opens the collection page with this enrollment and month selected
dueTbody.addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName !== "BUTTON") {
    return;
  }
  window.location.href =
    "fee-collection.html?enrollment=" + button.getAttribute("data-id") + "&month=" + monthSelect.value;
});

monthSelect.addEventListener("change", renderDues);
searchInput.addEventListener("input", renderDues);
filterButton.addEventListener("click", renderDues);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  monthSelect.value = CURRENT_MONTH;
  renderDues();
});

exportButton.addEventListener("click", () => {
  alert("Export CSV / PDF will be connected in Phase 2 (PHP).");
});

collectButton.addEventListener("click", () => {
  window.location.href = "fee-collection.html";
});

/* ---------- Start ---------- */
fillMonthSelect(monthSelect, CURRENT_MONTH);
renderDues();