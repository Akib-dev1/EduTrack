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
  showText("student-id", data.student.id);
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

  for (var i = 0; i < data.enrollments.length; i++) {
    var enrollment = data.enrollments[i];
    var active = enrollment.startMonth <= month &&
      (!enrollment.endMonth || enrollment.endMonth >= month);

    if (enrollment.studentId === studentId && active) {
      var batch = getBatch(enrollment.batchId);
      var course = getCourse(batch.courseId);
      expected += enrollment.monthlyFeeCents;
      count++;
      addRow(table, [course.name, batch.name, batch.schedule]);
    }
  }

  for (var j = 0; j < data.payments.length; j++) {
    var payment = data.payments[j];
    var paymentEnrollment = getEnrollment(payment.enrollmentId);
    var paidEnrollmentIsActive = paymentEnrollment &&
      paymentEnrollment.startMonth <= month &&
      (!paymentEnrollment.endMonth || paymentEnrollment.endMonth >= month);
    if (payment.billingMonth === month && paidEnrollmentIsActive &&
        paymentEnrollment.studentId === studentId) {
      paid += payment.amountCents;
    }
  }

  showText("current-month", getMonthName(month));
  showText("batch-count", count);
  showText("fee-expected", "$" + (expected / 100).toFixed(2));
  showText("fee-paid", "$" + (paid / 100).toFixed(2));
  showText("fee-due", "$" + ((expected - paid) / 100).toFixed(2));
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
      var show = enrollment.studentId === studentId &&
        (filter.value === "all" ||
          (filter.value === "active" && active) ||
          (filter.value === "ended" && !active));

      if (show) {
        var batch = getBatch(enrollment.batchId);
        var course = getCourse(batch.courseId);
        addRow(table, [
          course.name,
          batch.name,
          batch.teacher,
          batch.schedule,
          "$" + (enrollment.monthlyFeeCents / 100).toFixed(2),
          getMonthName(enrollment.startMonth) + " - " + getMonthName(enrollment.endMonth)
        ]);
        count++;
      }
    }

    if (count === 0) {
      showEmpty(table, 6, "No courses found for this filter.");
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
        addRow(table, [record.date, batch.name, status]);
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
