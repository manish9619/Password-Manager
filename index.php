<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correctPassword = "dark"; // Change this to your desired password
    $enteredPassword = $_POST['password'];

    if ($enteredPassword === $correctPassword) {
        $_SESSION['authenticated'] = true;
        header('Location: passwords.php');
        exit();
    } else {
        header('Location: index.php');
        exit();
    }
}

if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    // Display the password input form if not authenticated
    echo '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Say the magical words</title>
            <link rel="shortcut icon" href="https://www.nish.win/facon.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color:black;
            user-select: none;
        }
        form {
            text-align: center;
            color:white;
        }
        input[type="password"] {
            text-align: center; /* Center horizontally */
            padding: 5px 10px; /* Add padding on left and right to center text */
            background-color:black;
            color:white;
             
        }
    </style>
    </head>
    <body>
        <form action="" method="post">
            <label for="password"></label>
            <input type="password" autofocus id="password" name="password">
        </form>
    </body>
    </html>';
    exit();
} else {
    // Redirect to password manager if authenticated
    header('Location: passwords.php');
    exit();
}
?>
