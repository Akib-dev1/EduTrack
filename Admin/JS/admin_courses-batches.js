const openCourseModal = document.querySelector("#open-course-modal");
const openBatchModal = document.querySelector("#open-batch-modal");
const emptyAddCourse = document.querySelector("#empty-add-course");
const emptyAddBatch = document.querySelector("#empty-add-batch");
const courseModal = document.querySelector("#courseModal");
const batchModal = document.querySelector("#batchModal");
const saveCourseButton = document.querySelector("#saveCourseButton");
const saveBatchButton = document.querySelector("#saveBatchButton");
const courseClose = document.querySelector("#course-close");
const courseCancel = document.querySelector("#course-cancel");
const batchClose = document.querySelector("#batch-close");
const batchCancel = document.querySelector("#batch-cancel");
const editCourseButton = document.querySelectorAll(".edit-course-button");
const editCourseModal = document.querySelector("#editCourseModal");
const editCourseClose = document.querySelector("#edit-course-close");
const editCourseCancel = document.querySelector("#edit-course-cancel");
const updateCourseButton = document.querySelector("#updateCourseButton");
const editBatchButton = document.querySelectorAll(".edit-batch-button");
const editBatchClose = document.querySelector("#edit-batch-close");
const editBatchCancel = document.querySelector("#edit-batch-cancel");
const editBatchModal = document.querySelector("#editBatchModal");
const updateBatchButton = document.querySelector("#updateBatchButton");

const validateAddCourse = () => {
  const courseForm = document.querySelector("#courseForm");
  const data = new FormData(courseForm);
  const courseName = data.get("courseName").trim();
  const courseDesc = data.get("courseDesc").trim();
  const courseStatus = data.get("courseStatus");
  const courseNameErr = document.querySelector("#courseNameErr");
  const courseDescErr = document.querySelector("#courseDescErr");
  const statusErr = document.querySelector("#statusErr");
  if (!courseName) {
    courseNameErr.innerHTML = "Course name is required";
    return false;
  }
  courseNameErr.innerHTML = "";
  if (!courseDesc) {
    courseDescErr.innerHTML = "Course description is required";
    return false;
  }
  courseDescErr.innerHTML = "";
  if (!courseStatus) {
    statusErr.innerHTML = "Course status is required";
    return false;
  }
  statusErr.innerHTML = "";
  return true;
};

const validateEditCourse = () => {
  const editCourseForm = document.querySelector("#editCourseForm");
  const data = new FormData(editCourseForm);
  const courseName = data.get("courseName").trim();
  const courseDesc = data.get("courseDesc").trim();
  const courseStatus = data.get("courseStatus");
  const courseNameErr = document.querySelector("#editCourseNameErr");
  const courseDescErr = document.querySelector("#editCourseDescErr");
  const statusErr = document.querySelector("#editStatusErr");
  if (!courseName) {
    courseNameErr.innerHTML = "Course name is required";
    return false;
  }
  courseNameErr.innerHTML = "";
  if (!courseDesc) {
    courseDescErr.innerHTML = "Course description is required";
    return false;
  }
  courseDescErr.innerHTML = "";
  if (!courseStatus) {
    statusErr.innerHTML = "Course status is required";
    return false;
  }
  statusErr.innerHTML = "";
  return true;
};

const validateEditBatch = () => {
  const editBatchForm = document.querySelector("#editBatchForm");
  const data = new FormData(editBatchForm);
  const batchName = data.get("batchName").trim();
  const batchCourse = data.get("batchCourse");
  const batchTeacher = data.get("batchTeacher");
  const batchSchedule = data.get("batchSchedule").trim();
  const batchFee = data.get("batchFee").trim();
  const batchNameErr = document.querySelector("#editBatchNameErr");
  const batchCourseErr = document.querySelector("#editBatchCourseErr");
  const batchTeacherErr = document.querySelector("#editBatchTeacherErr");
  const batchScheduleErr = document.querySelector("#editBatchScheduleErr");
  const batchFeeErr = document.querySelector("#editBatchFeeErr");

  if (!batchName) {
    batchNameErr.innerHTML = "Batch name is required";
    return false;
  }
  batchNameErr.innerHTML = "";
  if (!batchCourse) {
    batchCourseErr.innerHTML = "Batch course is required";
    return false;
  }
  batchCourseErr.innerHTML = "";
  if (!batchTeacher) {
    batchTeacherErr.innerHTML = "Batch teacher is required";
    return false;
  }
  batchTeacherErr.innerHTML = "";
  if (batchSchedule) {
    const scheduleRegex =
      /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)(\s*,\s*(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday))*\s*:\s*\d{1,2}(:[0-5]\d)?\s*-\s*\d{1,2}(:[0-5]\d)?\s*(AM|PM)$/i;
    if (!scheduleRegex.test(batchSchedule)) {
      batchScheduleErr.innerHTML =
        "Use a format like: Sunday, Friday, Thursday: 2-3 PM";
      return false;
    }
  } else {
    batchScheduleErr.innerHTML = "Batch schedule is required";
    return false;
  }
  batchScheduleErr.innerHTML = "";
  if (!batchFee) {
    batchFeeErr.innerHTML = "Batch fee is required";
    return false;
  }
  batchFeeErr.innerHTML = "";
  return true;
};

const validateAddBatch = () => {
  const batchForm = document.querySelector("#batchForm");
  const data = new FormData(batchForm);
  const batchName = data.get("batchName").trim();
  const batchCourse = data.get("batchCourse");
  const batchTeacher = data.get("batchTeacher");
  const batchSchedule = data.get("batchSchedule").trim();
  const batchFee = data.get("batchFee").trim();
  const batchNameErr = document.querySelector("#batchNameErr");
  const batchCourseErr = document.querySelector("#batchCourseErr");
  const batchTeacherErr = document.querySelector("#batchTeacherErr");
  const batchScheduleErr = document.querySelector("#batchScheduleErr");
  const batchFeeErr = document.querySelector("#batchFeeErr");

  if (!batchName) {
    batchNameErr.innerHTML = "Batch name is required";
    return false;
  }
  batchNameErr.innerHTML = "";
  if (!batchCourse) {
    batchCourseErr.innerHTML = "Batch course is required";
    return false;
  }
  batchCourseErr.innerHTML = "";
  if (!batchTeacher) {
    batchTeacherErr.innerHTML = "Batch teacher is required";
    return false;
  }
  batchTeacherErr.innerHTML = "";
  if (batchSchedule) {
    const scheduleRegex =
      /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)(\s*,\s*(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday))*\s*:\s*\d{1,2}(:[0-5]\d)?\s*-\s*\d{1,2}(:[0-5]\d)?\s*(AM|PM)$/i;
    if (!scheduleRegex.test(batchSchedule)) {
      batchScheduleErr.innerHTML =
        "Use a format like: Sunday, Friday, Thursday: 2-3 PM";
      return false;
    }
  } else {
    batchScheduleErr.innerHTML = "Batch schedule is required";
    return false;
  }
  batchScheduleErr.innerHTML = "";
  if (!batchFee) {
    batchFeeErr.innerHTML = "Batch fee is required";
    return false;
  }
  batchFeeErr.innerHTML = "";
  return true;
};

[openCourseModal, emptyAddCourse].forEach((btn) => {
  btn.addEventListener("click", () => {
    courseModal.classList.add("open");
  });
});

[openBatchModal, emptyAddBatch].forEach((btn) => {
  btn.addEventListener("click", () => {
    batchModal.classList.add("open");
  });
});

saveCourseButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateAddCourse()) {
    courseModal.classList.remove("open");
  }
});

[courseClose, courseCancel].forEach((btn) => {
  btn.addEventListener("click", () => {
    courseModal.classList.remove("open");
  });
});

[batchClose, batchCancel].forEach((btn) => {
  btn.addEventListener("click", () => {
    batchModal.classList.remove("open");
  });
});

saveBatchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateAddBatch()) {
    batchModal.classList.remove("open");
  }
});

editCourseButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    editCourseModal.classList.add("open");
  });
});

[editCourseClose, editCourseCancel].forEach((btn) => {
  btn.addEventListener("click", () => {
    editCourseModal.classList.remove("open");
  });
});

updateCourseButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateEditCourse()) {
    editCourseModal.classList.remove("open");
  }
});

editBatchButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    editBatchModal.classList.add("open");
  });
});

[editBatchClose, editBatchCancel].forEach((btn) => {
  btn.addEventListener("click", () => {
    editBatchModal.classList.remove("open");
  });
});

updateBatchButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateEditBatch()) {
    editBatchModal.classList.remove("open");
  }
});
