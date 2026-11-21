const loginForm = document.querySelector("#login-form");
const loginErr = document.querySelector("#loginErr");
const validateLoginDetails = () => {
  const data = new FormData(loginForm);
  const username = data.get("username").trim();
  const password = data.get("password").trim();
  //const rememberMe = data.get("remember");
  if (username) {
    if (username === "admin.ak" && password === "1234@Ak") {
      loginErr.innerHTML = "";
      return true;
    }
  }
  return false;
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateLoginDetails()) {
    document.location.href = "/EduTrack/Admin/admin_dashboard.html";
  } else {
    loginErr.innerHTML = "Invalid username or password";
  }
});
