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
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background:#0f0f0f; color:#ffffff; }
    .container { max-width:600px; margin:auto; padding:30px; border:1px solid #333; }
    .title { font-size:22px; font-weight:bold; margin-bottom:20px; }
    .row { margin-bottom:10px; }
    .label { font-weight:bold; color:#aaa; }
    .value { color:#fff; }
    .divider { margin:20px 0; border-top:1px solid #333; }
  </style>
</head>

<body>
  <div class='container'>
    
    <div class='title'>Nuevo registro - Evento Ciberseguridad</div>

    <div class='row'><span class='label'>Nombre:</span> <span class='value'>$nombre $apellidos</span></div>
    <div class='row'><span class='label'>Empresa:</span> <span class='value'>$empresa</span></div>
    <div class='row'><span class='label'>Cargo:</span> <span class='value'>$cargo</span></div>
    <div class='row'><span class='label'>Email:</span> <span class='value'>$email</span></div>
    <div class='row'><span class='label'>Teléfono:</span> <span class='value'>$telefono</span></div>

    <div class='divider'></div>

    <div class='row'>
      <span class='label'>Aceptación legal:</span> 
      <span class='value'>" . ($legal ? "Sí" : "No") . "</span>
    </div>

    <div class='row'>
      <span class='label'>Recibir comunicaciones:</span> 
      <span class='value'>" . ($newsletter ? "Sí" : "No") . "</span>
    </div>

  </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: no-reply@tempelgroup.com\r\n";
$headers .= "Reply-To: $email\r\n";

if(mail($to, $subject, $body, $headers)) {
  echo json_encode(["ok" => true]);
} else {
  http_response_code(500);
  echo json_encode(["error" => "Error enviando email"]);
}
?>