
const roster = [
  { id: "STU-001", initials: "RU", name: "Rahim Uddin",roll: "101" },
  { id: "STU-002", initials: "NJ", name: "Nusrat Jahan", roll: "102" },
  { id: "STU-003", initials: "TH", name: "Tanvir Hasan", roll: "103" },
  { id: "STU-004", initials: "SA", name: "Sadia Afrin", roll: "104" },
  { id: "STU-005", initials: "SH", name: "Md. Shakil Hasan", roll: "105" },
  { id: "STU-006", initials: "FZ", name: "Fatima Tuz Zohra", roll: "106" },
  { id: "STU-007", initials: "AF", name: "Abrar Fahim", roll: "107" },
  { id: "STU-008", initials: "MR", name: "Mehedi Hasan Rony",roll: "108" },
];

const batchSelect     = document.getElementById("attBatch");
const batchError      = document.getElementById("attBatchErr");
const dateInput       = document.getElementById("classDate");
const dateError       = document.getElementById("classDateErr");
const loadError       = document.getElementById("loadError");
const loadButton      = document.getElementById("loadStudents");
const rosterPanel     = document.getElementById("attendancePanel");
const rosterTitle     = document.getElementById("attendanceTitle");
const tableBody       = document.getElementById("attendanceRows");
const saveError       = document.getElementById("attendanceError");
const progressText    = document.getElementById("attProgress");
const markAllButton   = document.getElementById("markAll");
const resetButton     = document.getElementById("resetAttendance");
const saveButton      = document.getElementById("saveAttendance");
const emptyMessage    = document.getElementById("attendanceEmpty");
const toast           = document.getElementById("toast");


function countMarked() {
  let count = 0;
  for (let i = 0; i < roster.length; i++) {
    const checked = document.querySelector('input[name="' + roster[i].id + '"]:checked');
    if (checked) {
      count++;
    }
  }
  return count;
}

function updateProgress() {
  progressText.textContent = countMarked() + " of " + roster.length + " students marked";
}

function clearErrors() {
  batchError.textContent = "";
  dateError.textContent = "";
  loadError.classList.remove("show");
  saveError.classList.remove("show");
}




function drawRoster() {
  let html = "";

  for (let i = 0; i < roster.length; i++) {
    const s = roster[i];
    html +=
      "<tr>" +
        "<td><strong>" + s.id + "</strong></td>" +
        '<td><div class="person">' +
          '<span class="mini-avatar">' + s.initials + "</span>" +
          "<span><strong>" + s.name + "</strong>" +
          '<small class="student-id"> Roll: ' + s.roll + " • Science Group</small></span>" +
        "</div></td>" +
        '<td><div class="attendance-control">' +
          '<label><input type="radio" name="' + s.id + '" value="present">' +
            '<span class="present"><i class="fa-solid fa-check"></i>Present</span></label>' +
          '<label><input type="radio" name="' + s.id + '" value="absent">' +
            '<span class="absent"><i class="fa-solid fa-xmark"></i>Absent</span></label>' +
        "</div></td>" +
      "</tr>";
  }

  tableBody.innerHTML = html;
  updateProgress();
}




loadButton.addEventListener("click", function () {
  clearErrors();

  const batch = batchSelect.value;
  const date = dateInput.value;
  let valid = true;

  if (batch === "") {
    batchError.textContent = "Batch is required.";
    valid = false;
  }
  if (date === "") {
    dateError.textContent = "Class date is required.";
    valid = false;
  }

  if (valid === false) {
    loadError.textContent = "Please fix the highlighted fields before loading the roster.";
    loadError.classList.add("show");
    return;
  }


  const dateText = new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  rosterTitle.textContent = batch + " • " + dateText;

  drawRoster();
  rosterPanel.style.display = "block";
  emptyMessage.style.display = "none";
});

tableBody.addEventListener("change", updateProgress);


resetButton.addEventListener("click", function () {
  const radios = tableBody.querySelectorAll("input");
  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }
  saveError.classList.remove("show");
  updateProgress();
});

saveButton.addEventListener("click", function () {
  const missing = roster.length - countMarked();

  if (missing > 0) {
    saveError.textContent =
      "Please mark all students before saving. " + missing +
      " student(s) are currently missing an attendance classification.";
    saveError.classList.add("show");
    return;
  }

  saveError.classList.remove("show");
  showToast("Attendance saved successfully.");
});


document.getElementById("logoutBtn").addEventListener("click", function () {
  confirm("Are you sure you want to sign out?");
});