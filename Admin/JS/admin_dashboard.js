const detailsBtn = document.querySelectorAll(".detail-btn");
const batchDetailsModal = document.querySelector("#batchDetailsModal");
const detailsModalClose = document.querySelector("#detailsModalClose");

detailsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    batchDetailsModal.classList.add("open");
  });
});

detailsModalClose.addEventListener("click", () => {
  batchDetailsModal.classList.remove("open");
});
