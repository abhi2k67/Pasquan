<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = trim($_POST['name'] ?? '');
    $mobile  = trim($_POST['mobile'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if ($name && $email && $message) {
        $to      = 'raghav.naidu@pasquan.de';
        $subject = 'New enquiry from PASQUAN website';
        $body    = "Name: $name\nMobile: $mobile\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: noreply@pasquan.de\r\nReply-To: $email\r\n";

        @mail($to, $subject, $body, $headers);
    }

    header('Location: thank-you.html');
    exit;
}
?>
