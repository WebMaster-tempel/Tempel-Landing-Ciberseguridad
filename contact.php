<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(0);

// 🔒 Solo permitir POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["ok" => false, "error" => "Método no permitido"]);
    exit;
}

// 🔒 Leer JSON
$data = json_decode(file_get_contents("php://input"), true);

// 🔒 Sanitizar
function clean($value) {
    return htmlspecialchars(trim($value ?? ""), ENT_QUOTES, 'UTF-8');
}

$nombre = clean($data["nombre"]);
$apellidos = clean($data["apellidos"]);
$empresa = clean($data["empresa"]);
$cargo = clean($data["cargo"]);
$email = clean($data["email"]);
$comida = $data["comida"] ?? false;
$alergias = clean($data["alergias"] ?? "");

// 🔒 Teléfono (sin clean)
$telefono = $data["telefono"] ?? "";

// 🔒 Checkbox
$legal = $data["legal"] ?? false;
$newsletter = $data["newsletter"] ?? false;
$honeypot = $data["honeypot"] ?? "";

// 🔒 Limpiar teléfono → SOLO números
$telefono = preg_replace('/\D/', '', $telefono);

// 🔒 Validaciones
if (!$nombre || !$apellidos || !$cargo || !$email || !$telefono || !$legal) {
    echo json_encode(["ok" => false, "error" => "Datos incompletos"]);
    exit;
}

// 🔒 Longitud lógica
if (strlen($telefono) < 7 || strlen($telefono) > 15) {
    echo json_encode(["ok" => false, "error" => "Teléfono inválido"]);
    exit;
}

// 🔒 Honeypot
if (!empty($honeypot)) {
    echo json_encode(["ok" => false, "error" => "Spam detectado"]);
    exit;
}

// 🔒 Email válido
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["ok" => false, "error" => "Email inválido"]);
    exit;
}

if ($comida && empty($alergias)) {
    echo json_encode(["ok" => false, "error" => "Indica alergias o escribe 'Ninguna'"]);
    exit;
}

// 🔒 Bloquear emails públicos
$blockedDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
$domain = strtolower(explode("@", $email)[1] ?? "");

if (in_array($domain, $blockedDomains)) {
    echo json_encode(["ok" => false, "error" => "Email no corporativo"]);
    exit;
}

// 📧 CONFIG
$to = "webmaster@tempelgroup.com";
$subject = "Nuevo registro evento";

// 🎨 EMAIL HTML
$body = "
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background:#0f0f0f; color:#ffffff; }
    .container { max-width:600px; margin:auto; padding:30px; border:1px solid #333; }
    .title { font-size:20px; font-weight:bold; margin-bottom:20px; }
    .row { margin-bottom:10px; }
    .label { font-weight:bold; color:#aaa; }
    .divider { margin:20px 0; border-top:1px solid #333; }
  </style>
</head>

<body>
  <div class='container'>
    
    <div class='title'>Nuevo registro - Evento Ciberseguridad</div>

    <div class='row'><span class='label'>Nombre:</span> $nombre $apellidos</div>
    <div class='row'><span class='label'>Empresa:</span> $empresa</div>
    <div class='row'><span class='label'>Cargo:</span> $cargo</div>
    <div class='row'><span class='label'>Email:</span> $email</div>
    <div class='row'><span class='label'>Teléfono:</span> $telefono</div>

    <div class='row'><span class='label'>Se queda a comer:</span> " . ($comida ? "Sí" : "No") . "</div>

    " . ($comida ? "<div class='row'><span class='label'>Alergias / Intolerancias:</span> $alergias</div>" : "") . "

    <div class='divider'></div>

    <div class='row'><span class='label'>Acepta legal:</span> " . ($legal ? "Sí" : "No") . "</div>
    <div class='row'><span class='label'>Newsletter:</span> " . ($newsletter ? "Sí" : "No") . "</div>

  </div>
</body>
</html>
";

// 📧 HEADERS
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: no-reply@tempelgroup.com\r\n";
$headers .= "Reply-To: $email\r\n";


// 📁 RUTA SEGURA
$dir = __DIR__ . "/data";
$file = $dir . "/registros.csv";

// Crear carpeta si no existe
if (!is_dir($dir)) {
    if (!mkdir($dir, 0777, true)) {
        echo json_encode(["ok" => false, "error" => "No se pudo crear carpeta"]);
        exit;
    }
}

// Verificar permisos
if (!is_writable($dir)) {
    echo json_encode(["ok" => false, "error" => "Carpeta no escribible"]);
    exit;
}

// Crear cabecera si no existe
if (!file_exists($file)) {
    file_put_contents($file, "Nombre,Apellidos,Empresa,Cargo,Email,Telefono,Comida,Alergias,Newsletter,Fecha\n");
}

// Crear fila
$row = [
    $nombre,
    $apellidos,
    $empresa,
    $cargo,
    $email,
    $telefono,
    $comida ? "Sí" : "No",
    $alergias,
    $newsletter ? "Sí" : "No",
    date("Y-m-d H:i:s")
];

// Convertir a CSV seguro
$line = implode(",", array_map(function($v) {
    return '"' . str_replace('"', '""', $v) . '"';
}, $row)) . "\n";

// Guardar con bloqueo
$result = file_put_contents($file, $line, FILE_APPEND | LOCK_EX);

if ($result === false) {
    echo json_encode(["ok" => false, "error" => "Error escribiendo archivo"]);
    exit;
}


// 🚀 ENVÍO
$success = mail($to, $subject, $body, $headers);

// 🔁 RESPUESTA JSON
echo json_encode([
    "ok" => $success
]);

exit;
?>