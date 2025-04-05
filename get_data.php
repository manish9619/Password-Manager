<?php
$key = 'Z{l{|nESjyFnRk6G4&p{O]bsU%3+ZGI.Wikg[s6PM.EO{MH%u-%69HoB?[5To>6['; // Same secret key used for encryption
$file = 'passwords.json';

if (file_exists($file)) {
    $data = file_get_contents($file);
    $decrypted_data = decryptData($data, $key);

    if ($decrypted_data !== false) {
        header('Content-Type: application/json');
        echo $decrypted_data;
        exit;
    }
}

http_response_code(404);

// Function to decrypt data
function decryptData($data, $key) {
    list($encrypted_data, $iv) = explode('::', base64_decode($data), 2);
    return openssl_decrypt($encrypted_data, 'aes-256-cbc', $key, 0, $iv);
}
