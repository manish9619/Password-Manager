<?php
session_start();

if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    // Redirect to the login page if not authenticated
    header('Location: index.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="shortcut icon" href="https://www.nish.win/facon.png" type="image/x-icon">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Manager</title>
  <link rel="stylesheet" href="styles.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
  <div class="container shadow">
    <button onclick="addRow()" class="add-btn">+</button>
    <button onclick="saveData()" class="save-btn">Save</button>
    <table id="passwordTable">
      <tr>
        <th>Website</th>
        <th>Username</th>
        <th style="padding-left: 30px">Password</th>
        <th class="toggle-column">Delete</th>
        <th class="toggle-column">Order</th>
      </tr>
    </table>

    <div>
      <label for="length">Length:</label>
      <input type="number" id="length" value="16" style="width: 40px; text-align: center;" inputmode="numeric">
      <button id="generateBtn" onclick="generatePassword()">Generate & Copy</button>
      <input type="text" id="output" readonly>
      <div id="alert"></div>
    </div>

    <span id="toggleIcon" onclick="toggleColumnsVisibility()">+</span>
    <button class="custom-btn" onclick="exportTableToExcel('passwordTable', 'password_data')">Export to Excel</button>
  </div>

  <script src="script.js"></script>
</body>
</html>