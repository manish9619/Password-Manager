window.onload = function () {
  fetchData();
  initializeColumnsVisibility(); // Ensure columns are hidden initially
};

let rowCount = 0;

// Fetch data from the server
function fetchData() {
  fetch("get_data.php")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        // Sort data by the 'order' attribute
        data.sort((b, a) => a.order - b.order);

        // Add rows based on sorted data
        for (const row of data) {
          addRowWithData(row.siteName, row.username, row.password, row.order);
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Add a new row to the table
function addRow() {
  const table = document.getElementById("passwordTable");
  const newRow = table.insertRow(1);
  rowCount++;

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  const cell5 = newRow.insertCell(4);

  const input1 = document.createElement("input");
  input1.type = "text";
  input1.name = `siteName${rowCount}`;
  cell1.appendChild(input1);

  const input2 = document.createElement("input");
  input2.type = "text";
  input2.name = `username${rowCount}`;
  cell2.appendChild(input2);

  const copyIcon2 = document.createElement("i");
  copyIcon2.className = "far fa-copy copy-icon";
  copyIcon2.onclick = function() {
    copyToClipboard(input2.value, input2);
  };
  cell2.appendChild(copyIcon2);

  const copyIcon3 = document.createElement("i");
  copyIcon3.className = "far fa-copy copy-icon";
  copyIcon3.onclick = function() {
    copyToClipboard(input3.value, input3);
  };
  cell3.appendChild(copyIcon3);
  
  const input3 = document.createElement("input");
  input3.type = "text";
  input3.name = `password${rowCount}`;
  cell3.appendChild(input3);

  cell4.classList.add("toggle-column");
  cell5.classList.add("toggle-column");
  cell4.innerHTML = `<button onclick="deleteRow(this)" class="delete-btn">-</button>`;
  cell5.innerHTML = `<input type="number" name="order${rowCount}" value="${rowCount}" onchange="sortRows()">`;
}

// Add a row with pre-filled data
function addRowWithData(siteName, username, password, order) {
  const table = document.getElementById("passwordTable");
  const newRow = table.insertRow(1);
  rowCount++;

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  const cell5 = newRow.insertCell(4);

  const input1 = document.createElement("input");
  input1.type = "text";
  input1.name = `siteName${rowCount}`;
  input1.value = siteName;
  cell1.appendChild(input1);

  const input2 = document.createElement("input");
  input2.type = "text";
  input2.name = `username${rowCount}`;
  input2.value = username;
  cell2.appendChild(input2);

  const copyIcon2 = document.createElement("i");
  copyIcon2.className = "far fa-copy copy-icon";
  copyIcon2.onclick = function() {
    copyToClipboard(input2.value, input2);
  };
  cell2.appendChild(copyIcon2);

  const copyIcon3 = document.createElement("i");
  copyIcon3.className = "far fa-copy copy-icon";
  copyIcon3.onclick = function() {
    copyToClipboard(input3.value, input3);
  };
  cell3.appendChild(copyIcon3);

  const input3 = document.createElement("input");
  input3.type = "text";
  input3.name = `password${rowCount}`;
  input3.value = password;
  cell3.appendChild(input3);


  cell4.classList.add("toggle-column");
  cell5.classList.add("toggle-column");
  cell4.innerHTML = `<button onclick="deleteRow(this)" class="delete-btn">-</button>`;
  cell5.innerHTML = `<input type="number" name="order${rowCount}" value="${order}" onchange="sortRows()">`;
}

// Delete a row
function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  sortRows();
}

// Save data to the server
function saveData() {
  const table = document.getElementById("passwordTable");
  const data = [];

  for (let i = 1; i < table.rows.length; i++) {
    const siteName = table.rows[i].cells[0].querySelector("input").value;
    const username = table.rows[i].cells[1].querySelector("input").value;
    const password = table.rows[i].cells[2].querySelector("input").value;
    const order = table.rows[i].cells[4].querySelector("input").value;

    data.push({ siteName, username, password, order });
  }

  fetch("save.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        document.querySelector(".container").style.backgroundColor = "#000";
        setTimeout(() => {
          document.querySelector(".container").style.backgroundColor = "";
        }, 500);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Generate a random password
function generatePassword() {
  const length = document.getElementById("length").value;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const char = charset.charAt(Math.floor(Math.random() * charset.length));
    password += char;
  }
  document.getElementById("output").value = password;

  // Copy the generated password to the clipboard
  copyToClipboard(password, document.getElementById("output"));
}

// Copy text to clipboard and change background color
function copyToClipboard(text, inputElement) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const alertMsg = document.getElementById("alert");
      alertMsg.innerText = "Copied to clipboard!";
      alertMsg.style.display = "block";

      // Change background color to black for 1 second
      inputElement.style.backgroundColor = "black";
      setTimeout(() => {
        inputElement.style.backgroundColor = "";
        alertMsg.style.display = "none";
      }, 1000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

// Sort rows based on the 'order' column
function sortRows() {
  const table = document.getElementById("passwordTable");
  const rows = Array.from(table.rows).slice(1);

  rows.sort((a, b) => {
    const orderA = parseInt(a.cells[4].querySelector("input").value, 10);
    const orderB = parseInt(b.cells[4].querySelector("input").value, 10);
    return orderA - orderB;
  });

  rows.forEach((row) => table.appendChild(row));
}

// Initialize visibility of toggle columns
function initializeColumnsVisibility() {
  const columns = document.querySelectorAll(".toggle-column");
  const container = document.querySelector(".container");
  const toggleIcon = document.getElementById("toggleIcon");

  // Hide columns initially
  columns.forEach((column) => {
    column.style.display = "none";
  });
  container.style.backgroundColor = "transparent";
  toggleIcon.textContent = "+"; // Set initial icon state
}

// Toggle visibility of columns
function toggleColumnsVisibility() {
  const columns = document.querySelectorAll(".toggle-column");
  const container = document.querySelector(".container");
  const toggleIcon = document.getElementById("toggleIcon");
  const isHidden = columns[0].style.display === "none";

  if (isHidden) {
    columns.forEach((column) => {
      column.style.display = "table-cell";
    });
    container.style.backgroundColor = "black";
    toggleIcon.textContent = "-"; // Change icon
  } else {
    columns.forEach((column) => {
      column.style.display = "none";
    });
    container.style.backgroundColor = "transparent";
    toggleIcon.textContent = "+"; // Change icon
  }
}

// Export table data to Excel
function exportTableToExcel(tableID, filename = "") {
  const table = document.getElementById(tableID);
  const rows = table.getElementsByTagName("tr");
  const data = [];

  // Iterate through rows and capture cell data
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowData = [];
    const cells = row.getElementsByTagName("td");

    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      const input = cell.querySelector("input");
      rowData.push(input ? input.value : cell.innerText);
    }

    // Capture header row separately
    if (i === 0) {
      const headers = row.getElementsByTagName("th");
      const headerData = [];
      for (let k = 0; k < headers.length; k++) {
        headerData.push(headers[k].innerText);
      }
      data.push(headerData);
    } else {
      data.push(rowData);
    }
  }

  // Create worksheet and workbook
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Define filename
  filename = filename ? `${filename}.xlsx` : "excel_data.xlsx";
  XLSX.writeFile(wb, filename);
}

// Copy text to clipboard and change background color
function copyToClipboard(text, inputElement) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const alertMsg = document.getElementById("alert");
      alertMsg.innerText = "Copied to clipboard!";
      alertMsg.style.display = "block";

      // Add the fade-animation class to the input element
      inputElement.classList.add("fade-animation");

      // Remove the fade-animation class after the animation ends
      setTimeout(() => {
        inputElement.classList.remove("fade-animation");
        alertMsg.style.display = "none";
      }, 1000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
