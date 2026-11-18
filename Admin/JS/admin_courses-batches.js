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
