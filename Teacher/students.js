
const students = [
  { id: "STU-001", initials: "RU", name: "Rahim Uddin", phone: "01711-000001", batch: "morning",  batchName: "Physics Morning A",  start: "Jan 2026", end: "Ongoing", status: "active" },
  { id: "STU-002", initials: "NM", name: "Nusrat Jahan Mim",  phone: "01819-234567", batch: "morning",  batchName: "Physics Morning A",  start: "Jan 2026", end: "Ongoing", status: "active" },
  { id: "STU-003", initials: "TC", name: "Tanvir Ahmed Chowdhury", phone: "01912-345678", batch: "evening",  batchName: "Physics Evening B",  start: "Feb 2026", end: "Ongoing", status: "active" },
  { id: "STU-004", initials: "SA", name: "Sadia Afrin",  phone: "01623-456789", batch: "evening",  batchName: "Physics Evening B",  start: "Feb 2026", end: "Ongoing", status: "active" },
  { id: "STU-005", initials: "SH", name: "Md. Shakil Hasan", phone: "01734-567890", batch: "revision", batchName: "Physics Revision C", start: "Dec 2025", end: "Ongoing", status: "active" },
  { id: "STU-006", initials: "FZ", name: "Fatima Tuz Zohra",  phone: "01845-678901", batch: "revision", batchName: "Physics Revision C", start: "Dec 2025", end: "Ongoing", status: "leave"  },
  { id: "STU-007", initials: "AF", name: "Abrar Fahim",  phone: "01556-789012", batch: "morning",  batchName: "Physics Morning A",  start: "Jan 2026", end: "Ongoing", status: "active" },
  { id: "STU-008", initials: "MR", name: "Mehedi Hasan Rony", phone: "01767-890123", batch: "evening",  batchName: "Physics Evening B",  start: "Jan 2026", end: "Ongoing", status: "active" },
];


const studentsPerPage = 8;
let currentPage = 1;


const batchSelect = document.getElementById("batchSelect");
const tableBody   = document.getElementById("studentRows");
const pageButtons = document.getElementById("pages");
const resultText  = document.getElementById("resultText");

function studentRow(student) {
  const statusText = student.status === "leave" ? "On Leave" : "Active";
  return `
    <tr>
      <td><strong>${student.id}</strong></td>
      <td>
        <div class="person">
          <span class="mini-avatar">${student.initials}</span>
          <span><strong>${student.name}</strong></span>
        </div>
      </td>
      <td>${student.phone}</td>
      <td>${student.batchName}</td>
      <td>${student.start}</td>
      <td>${student.end}</td>
      <td><span class="badge ${student.status}">${statusText}</span></td>
    </tr>`;
}

function render() {
  const selected = batchSelect.value;
  let rowsHtml = "";

  for (let i = 0; i < students.length; i++) {
    if (selected === "all" || students[i].batch === selected) {
      rowsHtml += studentRow(students[i]);
    }
  }

  tableBody.innerHTML = rowsHtml;
}

batchSelect.addEventListener("change", () => {
  currentPage = 1;
  render();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  confirm("Are you sure you want to sign out?");
});

render();