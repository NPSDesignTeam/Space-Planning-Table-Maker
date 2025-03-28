document.addEventListener("DOMContentLoaded", function() {
  const enterButton = document.getElementById("enterButton");
  const clearButton = document.getElementById("clearButton");
  const copyTableButton = document.getElementById("copyTableButton");
  const skuInput = document.getElementById("sku");
  const descriptionInput = document.getElementById("description");
  const quantityInput = document.getElementById("quantity");
  const seatingInput = document.getElementById("seating");
  const errorMessage = document.getElementById("errorMessage");
  const tableBody = document.querySelector("#plannerTable tbody");
  const maxRows = 20;

  // Handler for adding a new row when "Enter" is clicked
  enterButton.addEventListener("click", function() {
    // Clear any existing error message
    errorMessage.textContent = "";
    errorMessage.style.color = "red";

    // Check if maximum rows have been reached
    if (tableBody.rows.length >= maxRows) {
      errorMessage.textContent = "Error: Maximum of 20 rows reached.";
      return;
    }

    // Get input values and trim any extra whitespace
    const sku = skuInput.value.trim();
    const description = descriptionInput.value.trim();
    const quantity = quantityInput.value.trim();
    const seating = seatingInput.value.trim();

    // Parse quantity and seating to numbers
    const quantityValue = parseFloat(quantity);
    const seatingValue = parseFloat(seating);

    if (isNaN(quantityValue) || isNaN(seatingValue)) {
      errorMessage.textContent = "Error: Quantity and Seating must be valid numbers.";
      return;
    }

    // Calculate total (Quantity * Seating)
    const total = quantityValue * seatingValue;

    // Create a new table row and populate cells
    const newRow = tableBody.insertRow();
    const rowNumber = tableBody.rows.length; // Auto-incremented row number

    const cell1 = newRow.insertCell();
    cell1.textContent = rowNumber;

    const cell2 = newRow.insertCell();
    cell2.textContent = sku;

    const cell3 = newRow.insertCell();
    cell3.textContent = description;

    const cell4 = newRow.insertCell();
    cell4.textContent = quantity;

    const cell5 = newRow.insertCell();
    cell5.textContent = seating;

    const cell6 = newRow.insertCell();
    cell6.textContent = total;

    // Clear input fields after adding the row
    skuInput.value = "";
    descriptionInput.value = "";
    quantityInput.value = "";
    seatingInput.value = "";
  });

  // Handler for clearing all rows and input fields when "Clear All" is clicked
  clearButton.addEventListener("click", function() {
    tableBody.innerHTML = "";
    errorMessage.textContent = "";
    skuInput.value = "";
    descriptionInput.value = "";
    quantityInput.value = "";
    seatingInput.value = "";
  });

  // Handler for copying the table as a PNG to the clipboard
  copyTableButton.addEventListener("click", function() {
    // Use html2canvas to capture the table element as a canvas
    html2canvas(document.querySelector("#plannerTable")).then(canvas => {
      canvas.toBlob(blob => {
        if (!blob) {
          errorMessage.textContent = "Error: Could not create image.";
          return;
        }
        // Copy the image blob to the clipboard
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
          errorMessage.textContent = "Table copied to clipboard!";
          errorMessage.style.color = "green";
          setTimeout(() => {
            errorMessage.textContent = "";
            errorMessage.style.color = "red";
          }, 3000);
        }).catch(() => {
          errorMessage.textContent = "Error: Unable to copy table.";
        });
      });
    });
  });
});
