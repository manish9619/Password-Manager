<?php
$key = 'Z{l{|nESjyFnRk6G4&p{O]bsU%3+ZGI.Wikg[s6PM.EO{MH%u-%69HoB?[5To>6['; // Change this to a strong secret key
$data = json_decode(file_get_contents('php://input'), true);
$file = 'passwords.json';

if (!file_exists($file)) {
    file_put_contents($file, '[]');
}

if (is_writable($file)) {
    $current_data = json_decode(file_get_contents($file), true);

    if (!is_array($current_data)) {
        $current_data = [];
    }

    $current_data = array_merge($current_data, $data);

    // Encrypt the data before saving
    $encrypted_data = encryptData(json_encode($current_data), $key);

    if (file_put_contents($file, $encrypted_data)) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(500);
}

// Function to encrypt data
function encryptData($data, $key) {
    $iv_length = openssl_cipher_iv_length('aes-256-cbc');
    $iv = openssl_random_pseudo_bytes($iv_length);
    $encrypted = openssl_encrypt($data, 'aes-256-cbc', $key, 0, $iv);
    return base64_encode($encrypted . '::' . $iv);
}
?>
