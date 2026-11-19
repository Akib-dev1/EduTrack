const openEnrollModal = document.querySelector(".en-primary-button");
const reenrollButton = document.querySelectorAll(".en-reenroll-button");
const enrollModal = document.querySelector("#enrollModal");
const enrollClose = document.querySelector("#enroll-close");
const enrollCancel = document.querySelector("#enroll-cancel");
const saveEnrollButton = document.querySelector("#saveEnrollButton");
const editEnrollButton = document.querySelectorAll(".en-edit-button");
const editEnrollModal = document.querySelector("#editEnrollModal");
const editEnrollClose = document.querySelector("#edit-enroll-close");
const editEnrollCancel = document.querySelector("#edit-enroll-cancel");
const updateEnrollButton = document.querySelector("#updateEnrollButton");
const endEnrollButton = document.querySelectorAll(".en-end-button");
const endEnrollModal = document.querySelector("#endEnrollModal");
const endEnrollCancel = document.querySelector("#end-enroll-cancel");
const confirmEndButton = document.querySelector("#confirmEndButton");

const validateAddEnroll = () => {
  const enrollForm = document.querySelector("#enrollForm");
  const data = new FormData(enrollForm);
  const student = data.get("enrollStudent");
  const batch = data.get("enrollBatch");
  const start = data.get("enrollStart");
  const end = data.get("enrollEnd");
  const studentErr = document.querySelector("#enrollStudentErr");
  const batchErr = document.querySelector("#enrollBatchErr");
  const startErr = document.querySelector("#enrollStartErr");
  const endErr = document.querySelector("#enrollEndErr");
  if (!student) {
    studentErr.innerHTML = "Student is required";
    return false;
  }
  studentErr.innerHTML = "";
  if (!batch) {
    batchErr.innerHTML = "Batch is required";
    return false;
  }
  batchErr.innerHTML = "";
  if (!start) {
    startErr.innerHTML = "Start month is required";
    return false;
  }
  startErr.innerHTML = "";
  if (end && end < start) {
    endErr.innerHTML = "End month cannot be before start month.";
    return false;
  }
  endErr.innerHTML = "";
  return true;
};

const validateEditEnroll = () => {
  const editEnrollForm = document.querySelector("#editEnrollForm");
  const data = new FormData(editEnrollForm);
  const start = data.get("editEnrollStart");
  const end = data.get("editEnrollEnd");
  const startErr = document.querySelector("#editEnrollStartErr");
  const endErr = document.querySelector("#editEnrollEndErr");
  if (!start) {
    startErr.innerHTML = "Start month is required";
    return false;
  }
  startErr.innerHTML = "";
  if (end && end < start) {
    endErr.innerHTML = "End month cannot be before start month.";
    return false;
  }
  endErr.innerHTML = "";
  return true;
};

[openEnrollModal, ...reenrollButton].forEach((btn) => {
  btn.addEventListener("click", () => {
    enrollModal.classList.add("open");
  });
});

[enrollClose, enrollCancel].forEach((btn) => {
  btn.addEventListener("click", () => {
    enrollModal.classList.remove("open");
  });
});

saveEnrollButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateAddEnroll()) {
    enrollModal.classList.remove("open");
  }
});

editEnrollButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    editEnrollModal.classList.add("open");
  });
});

[editEnrollClose, editEnrollCancel].forEach((btn) => {
  btn.addEventListener("click", () => {
    editEnrollModal.classList.remove("open");
  });
});

updateEnrollButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateEditEnroll()) {
    editEnrollModal.classList.remove("open");
  }
});

endEnrollButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    endEnrollModal.classList.add("open");
  });
});

endEnrollCancel.addEventListener("click", () => {
  endEnrollModal.classList.remove("open");
});

confirmEndButton.addEventListener("click", () => {
  endEnrollModal.classList.remove("open");
});
