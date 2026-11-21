
let buttons = document.querySelectorAll(".take");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    location.href = "attendance.html";
  };
}
let button = document.querySelectorAll(".marks");

for (let i = 0; i < button.length; i++) {
  button[i].onclick = function() {
    location.href = "exam-marks.html";
  };
}
document.querySelector("#logoutBtn").addEventListener("click", function(){
    
})

