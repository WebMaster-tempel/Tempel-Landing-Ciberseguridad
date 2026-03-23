<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"] ?? "";
$apellidos = $data["apellidos"] ?? "";
$empresa = $data["empresa"] ?? "";
$cargo = $data["cargo"] ?? "";
$email = $data["email"] ?? "";
$telefono = $data["telefono"] ?? "";

/* 🔥 CAMBIO AQUÍ */
$to = "webmaster@tempelgroup.com";

$subject = "Nuevo registro evento";

$body = "
Nombre: $nombre $apellidos
Empresa: $empresa
Cargo: $cargo
Email: $email
Teléfono: $telefono
";

$headers = "From: no-reply@tempelgroup.com\r\n";
$headers .= "Reply-To: $email\r\n";

if(mail($to, $subject, $body, $headers)) {
  echo json_encode(["ok" => true]);
} else {
  http_response_code(500);
  echo json_encode(["error" => "Error enviando email"]);
}
?>