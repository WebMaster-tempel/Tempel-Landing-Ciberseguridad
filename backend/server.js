import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "tempelgroup-com.mail.protection.outlook.com",
    port: 25,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    await transporter.sendMail({
      from: "no-reply@tempelgroup.com",
      to: "no-reply@tempelgroup.com",
      subject: "Nuevo contacto web",
      text: `
        Nombre: ${name}
        Email: ${email}
        Mensaje: ${message}
      `
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error enviando email" });
  }
});

app.listen(3000, () => console.log("API lista en puerto 3000"));