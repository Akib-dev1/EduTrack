const userCreateBtn = document.querySelector("#create-user-btn");
const createUserModal = document.querySelector("#createUserModal");
const createClose = document.querySelector("#create-close");
const userCancel = document.querySelector("#user-cancel");
const editUserModal = document.querySelector("#editUserModal");
const editBtn = document.querySelector("#edit-btn");
const editCancel = document.querySelector("#edit-cancel");
const editClose = document.querySelector("#edit-close");
const deactivateBtn = document.querySelector("#deactivate-btn");
const deactivateUserModal = document.querySelector("#deactivateUserModal");
const deactivateCancel = document.querySelector("#deactivate-cancel");
const createUserButton = document.querySelector("#createUserButton");
const saveUserButton = document.querySelector("#saveUserButton");
const deactivateUserButton = document.querySelector("#deactivateUserButton");

userCreateBtn.addEventListener("click", () => {
  createUserModal.classList.add("um-show");
});

createClose.addEventListener("click", () => {
  createUserModal.classList.remove("um-show");
});

userCancel.addEventListener("click", () => {
  createUserModal.classList.remove("um-show");
});

editBtn.addEventListener("click", () => {
  editUserModal.classList.add("um-show");
});

editCancel.addEventListener("click", () => {
  editUserModal.classList.remove("um-show");
});

editClose.addEventListener("click", () => {
  editUserModal.classList.remove("um-show");
});

deactivateBtn.addEventListener("click", () => {
  deactivateUserModal.classList.add("um-show");
});

deactivateCancel.addEventListener("click", (e) => {
  deactivateUserModal.classList.remove("um-show");
});

createUserButton.addEventListener("click", () => {
  createUserModal.classList.remove("um-show");
});

saveUserButton.addEventListener("click", () => {
  editUserModal.classList.remove("um-show");
});

deactivateUserButton.addEventListener("click", () => {
  deactivateUserModal.classList.remove("um-show");
});
