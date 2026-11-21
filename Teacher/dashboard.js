// Quick action buttons go to their pages.
document.querySelectorAll(".quick").forEach(function (button) {
  button.addEventListener("click", function () {
    location.href = button.dataset.href;
  });
});
