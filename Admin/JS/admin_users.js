const userCreateBtn = document.querySelector("#create-user-btn");
const createUserModal = document.querySelector("#createUserModal");
const createClose = document.querySelector("#create-close");
const userCancel = document.querySelector("#user-cancel");
const editUserModal = document.querySelector("#editUserModal");
const editBtn = document.querySelectorAll(".edit-btn");
const editCancel = document.querySelector("#edit-cancel");
const editClose = document.querySelector("#edit-close");
const deactivateBtn = document.querySelectorAll(".deactivate");
const deactivateUserModal = document.querySelector("#deactivateUserModal");
const deactivateCancel = document.querySelector("#deactivate-cancel");
const createUserButton = document.querySelector("#createUserButton");
const saveUserButton = document.querySelector("#saveUserButton");
const deactivateUserButton = document.querySelector("#deactivateUserButton");
const activateUserModal = document.querySelector("#activateUserModal");
const activateBtn = document.querySelectorAll(".activate");
const activateCancel = document.querySelector("#activate-cancel");
const activateUserButton = document.querySelector("#activateUserButton");

const validateCreateUserForm = () => {
  const form = document.querySelector("#createUserForm");
  const data = new FormData(form);
  const fullName = data.get("fullName").trim();
  const username = data.get("username").trim();
  const phone = data.get("phone").trim();
  const role = data.get("role");
  const password = data.get("password").trim();
  const status = data.get("status");
  const createFullNameErr = document.querySelector("#createFullNameErr");
  const createUsernameErr = document.querySelector("#createUsernameErr");
  const createPhoneErr = document.querySelector("#createPhoneErr");
  const createRoleErr = document.querySelector("#createRoleErr");
  const createPasswordErr = document.querySelector("#createPasswordErr");
  const createStatusErr = document.querySelector("#createStatusErr");

  if (fullName) {
    if (!/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/.test(fullName)) {
      createFullNameErr.innerHTML =
        "Full name can only contain letters and spaces.";
      return false;
    }
    createFullNameErr.innerHTML = "";
  } else {
    createFullNameErr.innerHTML = "Full Name field can't be empty!";
    return false;
  }

  if (username) {
    if (!/^[A-Za-z0-9_]{4,20}$/.test(username)) {
      createUsernameErr.innerHTML =
        "Username must be 4-20 characters: letters, numbers or underscore.";
      return false;
    }
    createUsernameErr.innerHTML = "";
  } else {
    createUsernameErr.innerHTML = "Username Field can't be empty!";
    return false;
  }

  if (!/^01[3-9]\d{8}$/.test(phone)) {
    createPhoneErr.innerHTML =
      "Enter a valid 11-digit phone number, like 01712345678.";
    return false;
  }
  createPhoneErr.innerHTML = "";
  if (!role) {
    createRoleErr.innerHTML = "Please select a role.";
    return false;
  }
  createRoleErr.innerHTML = "";

  if (password.length < 6) {
    createPasswordErr.innerHTML = "Password must be at least 6 characters.";
    return false;
  }
  createPasswordErr.innerHTML = "";

  if (!status) {
    createStatusErr.innerHTML = "Please select a status.";
    return false;
  }
  createStatusErr.innerHTML = "";
  return true;
};

const validateEditUserForm = () => {
  const form = document.querySelector("#editUserForm");
  const data = new FormData(form);
  const fullName = data.get("fullName").trim();
  const phone = data.get("phone").trim();
  const editFullNameErr = document.querySelector("#editFullNameErr");
  const editPhoneErr = document.querySelector("#editPhoneErr");
  if (fullName) {
    if (!/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/.test(fullName)) {
      editFullNameErr.innerHTML =
        "Full name can only contain letters and spaces.";
      return false;
    }
    editFullNameErr.innerHTML = "";
  } else {
    editFullNameErr.innerHTML = "Full Name field can't be empty!";
    return false;
  }
  if (!/^01[3-9]\d{8}$/.test(phone)) {
    editPhoneErr.innerHTML =
      "Enter a valid 11-digit phone number, like 01712345678.";
    return false;
  }
  editPhoneErr.innerHTML = "";
  return true;
};

userCreateBtn.addEventListener("click", () => {
  createUserModal.classList.add("um-show");
});

createClose.addEventListener("click", () => {
  createUserModal.classList.remove("um-show");
});

userCancel.addEventListener("click", () => {
  createUserModal.classList.remove("um-show");
});

editBtn.forEach((ed) => {
  ed.addEventListener("click", () => {
    editUserModal.classList.add("um-show");
  });
});

editCancel.addEventListener("click", () => {
  editUserModal.classList.remove("um-show");
});

editClose.addEventListener("click", () => {
  editUserModal.classList.remove("um-show");
});

deactivateBtn.forEach((dec) => {
  dec.addEventListener("click", () => {
    deactivateUserModal.classList.add("um-show");
  });
});

deactivateCancel.addEventListener("click", (e) => {
  deactivateUserModal.classList.remove("um-show");
});

createUserButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateCreateUserForm()) {
    createUserModal.classList.remove("um-show");
  }
});

saveUserButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateEditUserForm()) {
    editUserModal.classList.remove("um-show");
  }
});

deactivateUserButton.addEventListener("click", () => {
  deactivateUserModal.classList.remove("um-show");
});

activateBtn.forEach((act) => {
  act.addEventListener("click", () => {
    activateUserModal.classList.add("um-show");
  });
});

activateCancel.addEventListener("click", () => {
  activateUserModal.classList.remove("um-show");
});

activateUserButton.addEventListener("click", () => {
  activateUserModal.classList.remove("um-show");
});
