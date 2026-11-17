var data = window.studentDemoData;
var studentId = data.student.id;

function getBatch(id) {
  for (var i = 0; i < data.batches.length; i++) {
    if (data.batches[i].id === id) {
      return data.batches[i];
    }
  }
}

function getCourse(id) {
  for (var i = 0; i < data.courses.length; i++) {
    if (data.courses[i].id === id) {
      return data.courses[i];
    }
  }
}

function getEnrollment(id) {
  for (var i = 0; i < data.enrollments.length; i++) {
    if (data.enrollments[i].id === id) {
      return data.enrollments[i];
    }
  }
}

function isMyEnrollment(id) {
  var enrollment = getEnrollment(id);
  return enrollment && enrollment.studentId === studentId;
}

function getMonth() {
  var date = new Date();
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return date.getFullYear() + "-" + month;
}

function getMonthName(month) {
  if (!month) {
    return "Ongoing";
  }
  var date = new Date(month + "-01");
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function money(amount) {
  return "৳ " + (amount / 100).toLocaleString("en-BD", { maximumFractionDigits: 2 });
}

function showText(id, text) {
  var element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function addRow(table, values) {
  var row = document.createElement("tr");
  for (var i = 0; i < values.length; i++) {
    var cell = document.createElement("td");
    cell.textContent = values[i];
    row.appendChild(cell);
  }
  table.appendChild(row);
}

function addStatusRow(table, values, status, statusClass) {
  var row = document.createElement("tr");
  for (var i = 0; i < values.length; i++) {
    var cell = document.createElement("td");
    cell.textContent = values[i];
    row.appendChild(cell);
  }
  var statusCell = document.createElement("td");
  var label = document.createElement("span");
  label.className = "status " + statusClass;
  label.textContent = status;
  statusCell.appendChild(label);
  row.appendChild(statusCell);
  table.appendChild(row);
}

function showEmpty(table, columns, message) {
  var row = document.createElement("tr");
  var cell = document.createElement("td");
  cell.colSpan = columns;
  cell.className = "empty";
  cell.textContent = message;
  row.appendChild(cell);
  table.appendChild(row);
}

function showProfile() {
  showText("student-id", "STU-" + data.student.id);
  showText("student-name", data.student.name);
  showText("student-username", data.student.username);
  showText("student-phone", data.student.phone);

  var names = document.querySelectorAll("[data-student-name]");
  for (var i = 0; i < names.length; i++) {
    names[i].textContent = data.student.name;
  }
}

function fillBatchOptions(select) {
  var all = document.createElement("option");
  all.value = "all";
  all.textContent = "All batches";
  select.appendChild(all);

  for (var i = 0; i < data.enrollments.length; i++) {
    var enrollment = data.enrollments[i];
    if (enrollment.studentId === studentId) {
      var batch = getBatch(enrollment.batchId);
      var option = document.createElement("option");
      option.value = batch.id;
      option.textContent = batch.name;
      select.appendChild(option);
    }
  }
}

function showDashboard() {
  var month = getMonth();
  var expected = 0;
  var paid = 0;
  var count = 0;
  var table = document.getElementById("dashboard-batches");
  var feeTable = document.getElementById("fee-breakdown");
  var unpaid = 0;

  for (var i = 0; i < data.enrollments.length; i++) {
    var enrollment = data.enrollments[i];
    var active = enrollment.startMonth <= month &&
      (!enrollment.endMonth || enrollment.endMonth >= month);

    if (enrollment.studentId === studentId && active) {
      var batch = getBatch(enrollment.batchId);
      var course = getCourse(batch.courseId);
      var batchPaid = 0;
      for (var j = 0; j < data.payments.length; j++) {
        if (data.payments[j].enrollmentId === enrollment.id &&
            data.payments[j].billingMonth === month) {
          batchPaid += data.payments[j].amountCents;
        }
      }
      var due = enrollment.monthlyFeeCents - batchPaid;
      expected += enrollment.monthlyFeeCents;
      paid += batchPaid;
      count++;
      if (due > 0) {
        unpaid++;
      }
      addStatusRow(table, [
        batch.name,
        course.name,
        batch.teacher,
        batch.schedule
      ], "Active", "status-active");
      addStatusRow(feeTable, [
        batch.name,
        money(enrollment.monthlyFeeCents),
        money(batchPaid),
        money(due > 0 ? due : 0)
      ], due > 0 ? "Unpaid" : "Paid", due > 0 ? "status-unpaid" : "status-paid");
    }
  }

  showText("current-month", getMonthName(month));
  showText("batch-count", count + " Enrolled Batches");
  showText("fee-expected", money(expected));
  showText("fee-paid", money(paid));
  showText("fee-due", money(expected - paid));
  showText("unpaid-count", unpaid + " Unpaid Items");
}

function showCourses() {
  var filter = document.getElementById("course-filter");
  var table = document.getElementById("courses-table");

  function updateCourses() {
    table.textContent = "";
    var month = getMonth();
    var count = 0;

    for (var i = 0; i < data.enrollments.length; i++) {
      var enrollment = data.enrollments[i];
      var active = enrollment.startMonth <= month &&
        (!enrollment.endMonth || enrollment.endMonth >= month);
      var showEnrollment = enrollment.studentId === studentId &&
        (filter.value === "all" ||
          (filter.value === "active" && active) ||
          (filter.value === "ended" && !active));

      if (showEnrollment) {
        var batch = getBatch(enrollment.batchId);
        var course = getCourse(batch.courseId);
        addStatusRow(table, [
          course.name,
          batch.name,
          batch.teacher,
          batch.schedule,
          money(enrollment.monthlyFeeCents),
          getMonthName(enrollment.startMonth) + " - " + getMonthName(enrollment.endMonth)
        ], active ? "Active" : "Ended", active ? "status-active" : "status-due");
        count++;
      }
    }

    if (count === 0) {
      showEmpty(table, 7, "No courses found for this filter.");
    }
  }

  filter.addEventListener("change", updateCourses);
  updateCourses();
}

function showAttendance() {
  var batchSelect = document.getElementById("attendance-batch");
  var monthInput = document.getElementById("attendance-month");
  var table = document.getElementById("attendance-table");
  fillBatchOptions(batchSelect);
  monthInput.value = getMonth();

  function updateAttendance() {
    table.textContent = "";
    var total = 0;
    var present = 0;
    var absent = 0;

    for (var i = 0; i < data.attendance.length; i++) {
      var record = data.attendance[i];
      var enrollment = getEnrollment(record.enrollmentId);
      var correctBatch = batchSelect.value === "all" ||
        enrollment.batchId === Number(batchSelect.value);
      var correctMonth = record.date.slice(0, 7) === monthInput.value;

      if (isMyEnrollment(record.enrollmentId) && correctBatch && correctMonth) {
        var batch = getBatch(enrollment.batchId);
        var status = record.status === "present" ? "Present" : "Absent";
        addStatusRow(table, [record.date, batch.name], status,
          record.status === "present" ? "status-paid" : "status-absent");
        total++;
        if (record.status === "present") {
          present++;
        } else {
          absent++;
        }
      }
    }

    if (total === 0) {
      showEmpty(table, 3, "No attendance recorded.");
    }

    showText("attendance-total", total);
    showText("attendance-present", present);
    showText("attendance-absent", absent);
    showText("attendance-rate", total ? (present / total * 100).toFixed(1) + "%" : "--");
  }

  batchSelect.addEventListener("change", updateAttendance);
  monthInput.addEventListener("change", updateAttendance);
  updateAttendance();
}

function showResults() {
  var batchSelect = document.getElementById("results-batch");
  var table = document.getElementById("results-table");
  fillBatchOptions(batchSelect);

  function updateResults() {
    table.textContent = "";
    var count = 0;

    for (var i = 0; i < data.exams.length; i++) {
      var exam = data.exams[i];
      var examMonth = exam.date.slice(0, 7);
      var enrollment = null;

      for (var j = 0; j < data.enrollments.length; j++) {
        var item = data.enrollments[j];
        var correctBatch = item.batchId === exam.batchId &&
          (batchSelect.value === "all" || item.batchId === Number(batchSelect.value));
        var correctMonths = examMonth >= item.startMonth &&
          (!item.endMonth || examMonth <= item.endMonth);
        if (item.studentId === studentId && correctBatch && correctMonths) {
          enrollment = item;
        }
      }

      if (enrollment) {
        var mark = null;
        var batch = getBatch(exam.batchId);
        for (var k = 0; k < data.marks.length; k++) {
          if (data.marks[k].examId === exam.id && data.marks[k].studentId === studentId) {
            mark = data.marks[k];
          }
        }

        var marks = mark === null ? "Not entered" : mark.obtainedMarks + " / " + exam.totalMarks;
        var percent = "--";
        if (mark !== null && exam.totalMarks !== 0) {
          percent = (mark.obtainedMarks / exam.totalMarks * 100).toFixed(1) + "%";
        }
        addRow(table, [exam.title, batch.name, exam.date, marks, percent]);
        count++;
      }
    }

    if (count === 0) {
      showEmpty(table, 5, "No exam results found.");
    }
  }

  batchSelect.addEventListener("change", updateResults);
  updateResults();
}

document.addEventListener("DOMContentLoaded", function () {
  showProfile();
  var firstName = data.student.name.split(" ")[0];
  var initials = "";
  var nameParts = data.student.name.split(" ");
  for (var i = 0; i < nameParts.length; i++) {
    initials += nameParts[i].charAt(0);
  }
  showText("first-name", firstName);
  var initialLabels = document.querySelectorAll("[data-student-initials]");
  var idLabels = document.querySelectorAll("[data-student-id]");
  for (var j = 0; j < initialLabels.length; j++) {
    initialLabels[j].textContent = initials;
  }
  for (var k = 0; k < idLabels.length; k++) {
    idLabels[k].textContent = "STU-" + data.student.id;
  }
  var page = document.body.getAttribute("data-page");

  if (page === "dashboard") {
    showDashboard();
  } else if (page === "courses") {
    showCourses();
  } else if (page === "attendance") {
    showAttendance();
  } else if (page === "results") {
    showResults();
  }

  var logout = document.querySelector("[data-logout]");
  logout.addEventListener("click", function () {
    var message = document.getElementById("logout-message");
    message.textContent = "This is a demo view; there is no sign-in session to end.";
    message.style.display = "block";
  });
});
