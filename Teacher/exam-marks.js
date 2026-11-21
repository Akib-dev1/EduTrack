const students = [
  { id: "STU-001", initials: "RU", name: "Rahim Uddin",      marks: 42 },
  { id: "STU-002", initials: "NJ", name: "Nusrat Jahan",     marks: 0 },
  { id: "STU-003", initials: "TH", name: "Tanvir Hasan",     marks: "" },
  { id: "STU-004", initials: "SA", name: "Sadia Afrin",      marks: 48 },
  { id: "STU-005", initials: "SH", name: "Md. Shakil Hasan", marks: 35 },
  { id: "STU-006", initials: "FZ", name: "Fatima Tuz Zohra", marks: "" },
  { id: "STU-007", initials: "AF", name: "Abrar Fahim",      marks: 39 },
];

const totalMarks = 50;
const minMarks = 0;

const batchSelect = document.getElementById("examBatch");
const examSelect = document.getElementById("examSelect");
const marksPanel = document.getElementById("marksPanel");
const emptyMessage = document.getElementById("marksEmpty");
const tableBody = document.getElementById("marksRows");
const progressText = document.getElementById("marksProgress");
const marksError = document.getElementById("marksError");
const saveButton = document.getElementById("saveMarks");
const exportButton = document.getElementById("exportMarks");
const toast = document.getElementById("toast");

const modal = document.getElementById("examModal");
const newExamButton = document.getElementById("newExam");
const closeExamButton = document.getElementById("closeExam");
const cancelExamButton = document.getElementById("cancelExam");
const examForm = document.getElementById("examForm");
const titleInput = document.getElementById("newExamTitle");
const dateInput = document.getElementById("newExamDate");
const marksInput = document.getElementById("newTotalMarks");
const titleError = document.getElementById("newTitleErr");
const dateError = document.getElementById("newDateErr");
const marksInputError = document.getElementById("newMarksErr");

function isValidMark(mark) {
  return Number.isInteger(mark) && mark >= minMarks && mark <= totalMarks;
}

function getPercentage(marks) {
  if (marks === "") {
    return "--";
  }
  return Math.round((marks / totalMarks) * 100) + "%";
}

function getStatusBadge(marks) {
  if (marks === "") {
    return '<span class="badge neutral">Not entered</span>';
  }
  return '<span class="badge active">Entered</span>';
}

function updateProgress() {
  let entered = 0;
  for (let i = 0; i < students.length; i++) {
    if (students[i].marks !== "") {
      entered++;
    }
  }
  const percent = ((entered / students.length) * 100).toFixed(1);
  progressText.textContent =
    "Marks entered for " + entered + " of " + students.length + " students (" + percent + "%)";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

function drawMarks() {
  let html = "";

  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    html +=
      "<tr>" +
        "<td><strong>" + s.id + "</strong></td>" +
        '<td><div class="person">' +
          '<span class="mini-avatar">' + s.initials + "</span>" +
          "<span><strong>" + s.name + "</strong>" +
          '<small class="student-id">Roll: ' + (101 + i) + " • Science Group</small></span>" +
        "</div></td>" +
        "<td>" +
          '<input class="mark-input" data-index="' + i + '" type="number" min="0" max="' + totalMarks + '" step="1" ' +
          'value="' + s.marks + '" placeholder="/ ' + totalMarks + '" ' +
          'style="width:105px;height:36px;border:1px solid #d5dfeb;border-radius:7px;padding:0 9px">' +
        "</td>" +
        '<td class="pct" data-index="' + i + '">' + getPercentage(s.marks) + "</td>" +
        '<td class="mark-status" data-index="' + i + '">' + getStatusBadge(s.marks) + "</td>" +
      "</tr>";
  }

  tableBody.innerHTML = html;
  updateProgress();
}

batchSelect.addEventListener("change", function () {
  marksPanel.style.display = "none";
  emptyMessage.style.display = "block";
});

examSelect.addEventListener("change", function () {
  if (batchSelect.value === "" || examSelect.value === "") {
    return;
  }
  marksPanel.style.display = "block";
  emptyMessage.style.display = "none";
  drawMarks();
});

tableBody.addEventListener("input", function (event) {
  if (!event.target.classList.contains("mark-input")) {
    return;
  }

  const index = Number(event.target.dataset.index);
  const typed = event.target.value;

  if (typed !== "" && !isValidMark(Number(typed))) {
    alert("Please enter a number between " + minMarks + " and " + totalMarks + ".");
    event.target.value = students[index].marks;
    return;
  }

  if (typed === "") {
    students[index].marks = "";
  } else {
    students[index].marks = Number(typed);
  }

  const percentCell = document.querySelector('.pct[data-index="' + index + '"]');
  const statusCell = document.querySelector('.mark-status[data-index="' + index + '"]');
  percentCell.textContent = getPercentage(students[index].marks);
  statusCell.innerHTML = getStatusBadge(students[index].marks);
  updateProgress();
});

saveButton.addEventListener("click", function () {
  let invalidStudent = null;

  for (let i = 0; i < students.length; i++) {
    const marks = students[i].marks;
    if (marks !== "" && !isValidMark(marks)) {
      invalidStudent = students[i];
      break;
    }
  }

  if (invalidStudent !== null) {
    marksError.textContent =
      invalidStudent.id + ": Marks must be a number between " + minMarks + " and " + totalMarks + ".";
    marksError.classList.add("show");
    return;
  }

  marksError.classList.remove("show");
  showToast("Marks saved successfully.");
});

newExamButton.addEventListener("click", function () {
  modal.classList.add("open");
});

closeExamButton.addEventListener("click", function () {
  modal.classList.remove("open");
});

cancelExamButton.addEventListener("click", function () {
  modal.classList.remove("open");
});

examForm.addEventListener("submit", function (event) {
  event.preventDefault();

  titleError.textContent = "";
  dateError.textContent = "";
  marksInputError.textContent = "";

  const title = titleInput.value.trim();
  const date = dateInput.value;
  const marks = Number(marksInput.value);
  let valid = true;

  if (title.length < 3) {
    titleError.textContent = "Exam title must contain at least 3 characters.";
    valid = false;
  }
  if (date === "") {
    dateError.textContent = "Exam date is required.";
    valid = false;
  }
  if (!Number.isInteger(marks) || marks < 1 || marks > 1000) {
    marksInputError.textContent = "Total marks must be a whole number from 1 to 1000.";
    valid = false;
  }

  if (valid === false) {
    return;
  }

  modal.classList.remove("open");
  showToast("Exam created successfully.");
  examSelect.insertAdjacentHTML("beforeend", "<option selected>" + title + " (" + date + ")</option>");
  examSelect.dispatchEvent(new Event("change"));
  examForm.reset();
});

document.getElementById("logoutBtn").addEventListener("click", function () {
  confirm("Are you sure you want to sign out?");
});
