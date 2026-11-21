document.addEventListener("DOMContentLoaded", function () {
  var batchFilter = document.getElementById("results-batch");
  var resetButton = document.getElementById("reset-results");
  var tableBody = document.getElementById("results-table");

  if (!batchFilter || !resetButton || !tableBody) {
    return;
  }

  var rows = tableBody.getElementsByTagName("tr");

  function filterResults() {
    var selectedBatch = batchFilter.value;

    for (var i = 0; i < rows.length; i++) {
      var rowBatch = rows[i].getAttribute("data-batch");
      rows[i].style.display =
        selectedBatch === "all" || rowBatch === selectedBatch ? "" : "none";
    }
  }

  function resetResults() {
    batchFilter.value = "all";
    filterResults();
  }

  batchFilter.addEventListener("change", filterResults);
  resetButton.addEventListener("click", resetResults);
  filterResults();
});
