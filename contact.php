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
<body style='margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;'>

  <table width='100%' cellpadding='0' cellspacing='0' style='padding:20px;background:#f5f5f5;'>
    <tr>
      <td align='center'>

        <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border:1px solid #e5e5e5;border-radius:6px;padding:30px;'>

          <!-- LOGO -->
          <tr>
            <td align='center' style='padding-bottom:25px;'>
              <img src='https://test.tempelgroup.com/img/logo-tempel.png' width='160'>
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td style='font-size:20px;font-weight:bold;color:#111;padding-bottom:20px;border-bottom:1px solid #eee;'>
              Nuevo registro - Evento Ciberseguridad
            </td>
          </tr>

          <!-- DATOS -->
          <tr><td style='padding-top:20px;'>

            <table width='100%' style='font-size:14px;color:#333;line-height:1.8;'>

              <tr>
                <td style='color:#888;width:160px;'>Nombre:</td>
                <td><strong>$nombre $apellidos</strong></td>
              </tr>

              <tr>
                <td style='color:#888;'>Empresa:</td>
                <td>$empresa</td>
              </tr>

              <tr>
                <td style='color:#888;'>Cargo:</td>
                <td>$cargo</td>
              </tr>

              <tr>
                <td style='color:#888;'>Email:</td>
                <td>$email</td>
              </tr>

              <tr>
                <td style='color:#888;'>Teléfono:</td>
                <td>$telefono</td>
              </tr>

            </table>

          </td></tr>

          <!-- COMIDA -->
          <tr>
            <td style='padding-top:25px;border-top:1px solid #eee;'>

              <table width='100%' style='font-size:14px;color:#333;line-height:1.8;'>

                <tr>
                  <td style='color:#888;width:160px;'>Comida:</td>
                  <td><strong>" . ($comida ? "Sí" : "No") . "</strong></td>
                </tr>

                " . ($comida ? "
                <tr>
                  <td style='color:#888;'>Alergias:</td>
                  <td>$alergias</td>
                </tr>
                " : "") . "

              </table>

            </td>
          </tr>

          <!-- LEGAL -->
          <tr>
            <td style='padding-top:25px;border-top:1px solid #eee;font-size:13px;color:#666;'>
              Legal: " . ($legal ? "Sí" : "No") . " &nbsp;&nbsp; | &nbsp;&nbsp; Newsletter: " . ($newsletter ? "Sí" : "No") . "
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

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


// 📧 EMAIL AUTOMÁTICO AL USUARIO

$subjectUser = "Confirmación de registro - Evento Ciberseguridad";

$bodyUser = "
<html>
<body style='margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;'>

  <table width='100%' cellpadding='0' cellspacing='0' style='background:#f5f5f5;padding:20px;'>
    <tr>
      <td align='center'>

        <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border:1px solid #e5e5e5;'>

          <!-- HEADER -->
          <tr>
            <td align='center' style='padding:30px;'>
              <img src='https://test.tempelgroup.com/img/logo-tempel.png' width='160'>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style='padding:0 30px 30px 30px;'>

              <h2 style='margin:0 0 20px 0;color:#111;'>Registro confirmado</h2>

              <p style='color:#444;line-height:1.6;'>
                Hola <strong>$nombre</strong>,
              </p>

              <p style='color:#444;line-height:1.6;'>
                Tu inscripción al evento de <strong>Ciberseguridad Industrial</strong> ha sido confirmada correctamente.
              </p>

              <div style='margin:25px 0;'>

                <!-- IMAGEN -->
                <img src='https://test.tempelgroup.com/img/foto-sala-dobble.jpg'
                    alt='Espacio DOBBLE'
                    style='width:100%;max-width:540px;height:auto;border:1px solid #eee;margin-bottom:15px;'>

                <!-- INFO -->
                <div style='background:#f9f9f9;border:1px solid #eee;padding:15px;font-size:14px;color:#333;line-height:1.6;'>

                  📅 <strong>Fecha:</strong> 10 de abril de 2026<br>

                  📍 <strong>Ubicación:</strong>
                  <a href='https://www.google.com/maps/search/?api=1&query=Espacio+DOBBLE+Madrid'
                    target='_blank'
                    style='color:#1E6BFF;text-decoration:none;'>
                    Espacio DOBBLE, Madrid
                  </a><br>

                  🕘 <strong>Horario:</strong> 09:00 - 15:00

                </div>

              </div>

              " . ($comida ? "
              <p style='color:#444;'>
                ✔ Has confirmado asistencia a la comida.
              </p>
              " : "") . "

              <!-- CTA -->
              <tr>
                <td align='center' style='padding:30px 0;'>

                  <!-- BOTÓN INFO -->
                  <a href='https://test.tempelgroup.com'
                    style='background:#000;color:#fff;padding:12px 25px;text-decoration:none;font-weight:bold;display:inline-block;margin:5px;'>
                    Ver información
                  </a>

                  <!-- BOTÓN GOOGLE MAPS -->
                  <a href='https://www.google.com/maps/search/?api=1&query=Espacio+DOBBLE+Madrid'
                    target='_blank'
                    style='background:#555;color:#fff;padding:12px 25px;text-decoration:none;font-weight:bold;display:inline-block;margin:5px;'>
                    Ver ubicación
                  </a>

                  <!-- BOTÓN CALENDAR -->
                  <a href='https://calendar.google.com/calendar/render?action=TEMPLATE&text=Evento+Ciberseguridad+Industrial&dates=20260410T070000Z/20260410T130000Z&details=Evento+Tempel+Group+-+Ciberseguridad+Industrial&location=Espacio+DOBBLE,+Madrid'
                    target='_blank'
                    style='background:#1E6BFF;color:#fff;padding:12px 25px;text-decoration:none;font-weight:bold;display:inline-block;margin:5px;'>
                    Añadir al calendario
                  </a>

                </td>
              </tr>

              <a href='https://calendar.google.com/calendar/render?action=TEMPLATE&text=Evento+Ciberseguridad+Industrial&dates=20260410T070000Z/20260410T130000Z&details=Evento+Tempel+Group+-+Ciberseguridad+Industrial&location=Espacio+DOBBLE,+Madrid'
              target='_blank'
              style='background:#1E6BFF;color:#fff;padding:12px 25px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:10px;'>
              Añadir a Google Calendar
              </a>

              <p style='color:#444;line-height:1.6;'>
                Recibirás más información próximamente.
              </p>

              <p style='color:#444;'>
                <strong>Equipo Tempel Group</strong>
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style='background:#f5f5f5;padding:20px;text-align:center;font-size:12px;color:#999;'>

              Tempel Group<br>
              <a href='https://www.tempelgroup.com' style='color:#666;'>www.tempelgroup.com</a><br><br>

              <a href='https://www.linkedin.com/company/tempelgroup/' style='margin:0 5px;color:#666;'>LinkedIn</a>
              |
              <a href='https://www.youtube.com/@TempelGroupWorld' style='margin:0 5px;color:#666;'>YouTube</a>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
";


// HEADERS usuario
$headersUser = "MIME-Version: 1.0\r\n";
$headersUser .= "Content-type:text/html;charset=UTF-8\r\n";
$headersUser .= "From: Tempel Group <no-reply@tempelgroup.com>\r\n";
$headersUser .= "Reply-To: webmaster@tempelgroup.com\r\n";
$headersUser .= "X-Mailer: PHP/" . phpversion();

// Enviar solo si el primero fue OK
if ($success) {
    mail($email, $subjectUser, $bodyUser, $headersUser);
}



// 🔁 RESPUESTA JSON
echo json_encode([
    "ok" => $success
]);

exit;
?>