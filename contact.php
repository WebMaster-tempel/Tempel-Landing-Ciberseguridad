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

// 🔗 Obtener parámetros UTM
$utm = $data["utm"] ?? [];
$utmClean = [];

if (is_array($utm)) {
    foreach ($utm as $key => $value) {
        if (strpos($key, 'utm_') === 0) {
            $utmClean[$key] = clean($value);
        }
    }
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


// ====================== BLOQUEO DE PRUEBAS ======================
if (strtolower($empresa) === "prueba" || strtolower($cargo) === "prueba") {
    // Bloqueamos guardado en CSV, pero permitimos el envío de emails
    $guardarEnCSV = false;
} else {
    $guardarEnCSV = true;
}


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

// Crear carpeta si no existe
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}


// Función simple para eliminar TODOS los registros con el email de prueba
function limpiarEmailPrueba($file) {
    if (!file_exists($file)) return;

    $lines = file($file);
    if (empty($lines)) return;

    $headers = str_getcsv($lines[0]);
    $emailIndex = array_search("Email", $headers);
    if ($emailIndex === false) return;

    $newLines = [$lines[0]]; // mantener cabecera

    for ($i = 1; $i < count($lines); $i++) {
        $row = str_getcsv($lines[$i]);
        if (isset($row[$emailIndex]) && 
            strtolower(trim($row[$emailIndex])) === "sergi.mallen@tempelgroup.com") {
            continue; // eliminar esta fila
        }
        $newLines[] = $lines[$i];
    }

    file_put_contents($file, implode("", $newLines));
}

// Limpiar el email de prueba ANTES de guardar
limpiarEmailPrueba($file);

// 🛠️ Actualizar cabecera del CSV si es necesario
function updateCsvHeaders($file) {
    $requiredHeaders = [
        "Nombre",
        "Apellidos",
        "Empresa",
        "Cargo",
        "Email",
        "Telefono",
        "Comida",
        "Alergias",
        "Newsletter",
        "UTM_Source",
        "UTM_Medium",
        "UTM_Campaign",
        "UTM_Term",
        "UTM_Content",
        "Fecha"
    ];

    // Si el archivo no existe, se crea con la cabecera correcta
    if (!file_exists($file)) {
        file_put_contents($file, implode(",", $requiredHeaders) . "\n");
        return;
    }

    $rows = array_map('str_getcsv', file($file));
    if (empty($rows)) {
        file_put_contents($file, implode(",", $requiredHeaders) . "\n");
        return;
    }

    $currentHeaders = $rows[0];

    // Verificar si faltan columnas
    $missingHeaders = array_diff($requiredHeaders, $currentHeaders);
    if (empty($missingHeaders)) {
        return; // No hay cambios necesarios
    }

    // Crear índice de cabeceras actuales
    $headerIndex = array_flip($currentHeaders);

    // Reconstruir el archivo con las nuevas columnas
    $updatedRows = [];
    $updatedRows[] = $requiredHeaders;

    for ($i = 1; $i < count($rows); $i++) {
        $newRow = [];
        foreach ($requiredHeaders as $header) {
            if (isset($headerIndex[$header])) {
                $newRow[] = $rows[$i][$headerIndex[$header]] ?? "";
            } else {
                $newRow[] = "";
            }
        }
        $updatedRows[] = $newRow;
    }

    // Guardar el archivo actualizado
    $fp = fopen($file, 'w');
    foreach ($updatedRows as $row) {
        fputcsv($fp, $row);
    }
    fclose($fp);
}

// Ejecutar actualización
updateCsvHeaders($file);

// ====================== GUARDAR EN CSV (solo si no es prueba) ======================
if ($guardarEnCSV) {
    // Crear cabecera si no existe
    if (!file_exists($file)) {
        $headers = "Nombre,Apellidos,Empresa,Cargo,Email,Telefono,Comida,Alergias,Newsletter,UTM_Source,UTM_Medium,UTM_Campaign,UTM_Term,UTM_Content,Fecha\n";
        file_put_contents($file, $headers);
    }

    $row = [
        $nombre,
        $apellidos,
        $empresa,
        $cargo,
        $email,
        $telefono,
        $comida ? "Si" : "No",
        $alergias,
        $newsletter ? "Si" : "No",
        $utmClean["utm_source"] ?? "",
        $utmClean["utm_medium"] ?? "",
        $utmClean["utm_campaign"] ?? "",
        $utmClean["utm_term"] ?? "",
        $utmClean["utm_content"] ?? "",
        date("Y-m-d H:i:s")
    ];

    $line = implode(",", array_map(function($v) {
        return '"' . str_replace('"', '""', $v) . '"';
    }, $row)) . "\n";

    file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
}

if ($result === false) {
    echo json_encode(["ok" => false, "error" => "Error escribiendo archivo"]);
    exit;
}


// 🚀 ENVÍO
$success = mail($to, $subject, $body, $headers);


// 📧 EMAIL AUTOMÁTICO AL USUARIO

$subjectUser = "Tu plaza está confirmada – Reserva la fecha";

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
 
              <h2 style='margin:0 0 20px 0;color:#111;'>Solicitud de inscripción recibida</h2>
 
              <p style='color:#444;line-height:1.6;'>
                Hola <strong>$nombre</strong>,
              </p>
 
              <p style='color:#444;line-height:1.6;'>
                Gracias por registrarte en el evento de ciberseguridad de Tempel Group.
              </p>
 
              <p style='color:#444;line-height:1.6;'>
                Hemos recibido correctamente tu solicitud de inscripción.
              </p>
 
              <p style='color:#444;line-height:1.6;'>
                Dado que el evento cuenta con <strong>plazas limitadas</strong>, la asignación final de asistentes se realizará en base al <strong>orden de registro</strong>.
              </p>
 
              <div style='margin:25px 0;'>
 
                <img src='https://test.tempelgroup.com/img/foto-sala-dobble.jpg'
                    alt='Espacio DOBBLE'
                    style='width:100%;max-width:540px;height:auto;border:1px solid #eee;margin-bottom:15px;'>
 
                <div style='background:#f9f9f9;border:1px solid #eee;padding:15px;font-size:14px;color:#333;line-height:1.6;'>
 
                  📅 <strong>Fecha:</strong> 28 de abril de 2026<br>
 
                  📍 <strong>Ubicación:</strong>
                  <a href='https://www.google.com/maps/search/?api=1&query=Espacio+DOBBLE+Madrid'
                    target='_blank'
                    style='color:#1E6BFF;text-decoration:none;'>
                    Espacio DOBBLE, Madrid
                  </a><br>
 
                  🕘 <strong>Horario:</strong> 09:30 - 15:00
 
                </div>
 
                <p style='color:#444;line-height:1.6;margin-top:20px;'>
                  En esta sesión descubrirás cómo las empresas están afrontando los nuevos retos en ciberseguridad y qué estrategias están aplicando para proteger sus sistemas, datos y operaciones.
                </p>
 
                <p style='color:#444;line-height:1.6;'>
                  Será una oportunidad única para aprender, compartir experiencias y adelantarte a amenazas que ya están impactando a empresas como la tuya.
                </p>
 
                <p style='color:#444;line-height:1.6;'>
                  En los próximos días te enviaremos la <strong>confirmación de tu plaza</strong> y más detalles sobre el evento.
                </p>
 
              </div>
 
              " . ($comida ? "
              <p style='color:#444;margin:15px 0 5px 0;'>
                ✔ Has confirmado asistencia a la comida.
              </p>
 
              " . (!empty($alergias) ? "
              <p style='color:#444;margin:0 0 15px 0;'>
                🥗 <strong>Alergias / intolerancias:</strong> $alergias
              </p>
              " : "") . "
 
              " : "
              <p style='color:#444;margin:15px 0;'>
                ℹ️ No asistirás a la comida.
              </p>
              ") . "
 
              <p style='color:#444;margin-top:10px;'>
                Nos vemos pronto,<br>
                <strong>Equipo Tempel Group</strong>
              </p>
 
            </td>
          </tr>
 
          <!-- BOTONES -->
          <tr>
            <td align='center' style='padding:15px 30px 30px 30px;'>
 
              <a href='https://www.tempelgroup.com/eventos/evento-ciberseguridad-industrial/'
                style='background:#000;color:#fff;padding:12px 25px;text-decoration:none;font-weight:bold;display:inline-block;margin:5px;'>
                Ver información
              </a>
 
              <a href='https://www.google.com/maps/search/?api=1&query=Espacio+DOBBLE+Madrid'
                target='_blank'
                style='background:#555;color:#fff;padding:12px 25px;text-decoration:none;font-weight:bold;display:inline-block;margin:5px;'>
                Ver ubicación
              </a>
 
              <a href='https://calendar.google.com/calendar/render?action=TEMPLATE&text=Evento+Ciberseguridad+Industrial&dates=20260428T073000Z/20260428T130000Z&details=Evento+Tempel+Group+-+Ciberseguridad+Industrial&location=Espacio+DOBBLE,+Madrid'
                target='_blank'
                style='background:#1E6BFF;color:#fff;padding:12px 25px;text-decoration:none;font-weight:bold;display:inline-block;margin:5px;'>
                Añadir al calendario
              </a>
 
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
$headersUser .= "Cc: marketing@tempelgroup.com\r\n";
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