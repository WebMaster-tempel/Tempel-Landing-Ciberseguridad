<?php

$file = __DIR__ . "/data/registros.csv";
$logFile = __DIR__ . "/data/last_sent.txt";

// Si no existe CSV → salir
if (!file_exists($file)) {
    exit("No hay CSV");
}

// Fecha modificación CSV
$lastModified = filemtime($file);

// Último envío
$lastSent = file_exists($logFile) ? (int)file_get_contents($logFile) : 0;

// Si NO hay cambios → salir
if ($lastModified <= $lastSent) {
    exit("Sin cambios");
}

$to = "webmaster@tempelgroup.com";
$subject = "Registros evento (CSV)";
$message = "Adjunto encontrarás los registros del evento.";

$separator = md5(time());
$eol = "\r\n";

// Leer archivo
$csv = chunk_split(base64_encode(file_get_contents($file)));

// Cabeceras
$headers = "From: no-reply@tempelgroup.com" . $eol;
$headers .= "MIME-Version: 1.0" . $eol;
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol;

// Cuerpo
$body = "--" . $separator . $eol;
$body .= "Content-Type: text/plain; charset=\"utf-8\"" . $eol . $eol;
$body .= $message . $eol;

// Adjuntar CSV
$body .= "--" . $separator . $eol;
$body .= "Content-Type: text/csv; name=\"registros.csv\"" . $eol;
$body .= "Content-Transfer-Encoding: base64" . $eol;
$body .= "Content-Disposition: attachment" . $eol . $eol;
$body .= $csv . $eol;
$body .= "--" . $separator . "--";

// Enviar
mail($to, $subject, $body, $headers);