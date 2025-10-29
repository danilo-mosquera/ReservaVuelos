import jwt from "jsonwebtoken";
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const otpStore = new Map();
const secret = process.env.JWT_SECRET || "supersecretkey";
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verifica si el token JWT es válido
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido o expirado" });
    req.user = user;
    next();
  });
}

// Middleware para roles
export function authorizeRole(...roles) { //export function authorizeRole(role) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) { //if (!role === req.user.role_id) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
  };
}

// Enviar OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // válido 5 min

  // Enviar correo
  try {
    await transporter.sendMail({
      from: `"Aero Space" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Código de verificación',
      text: `Tu código de verificación es: ${otp}`,
      html: `<h3>Tu código de verificación es: <b>${otp}</b></h3><p>Este código expira en 5 minutos.</p>`
    });
    res.json({ message: 'Código de verificación enviado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error enviando el correo' });
  }
});

// Verificar OTP y registrar usuario
router.post('/verify-otp', async (req, res) => {
  const { email, otp, password } = req.body;
  const record = otpStore.get(email);

  if (!record) return res.status(400).json({ message: 'No se encuentra el código de verificación' });
  if (record.expires < Date.now()) return res.status(400).json({ message: 'Código de verificación caducado' });
  if (record.otp !== otp) return res.status(400).json({ message: 'Código de verificación inválido' });

  otpStore.delete(email);

  // Aquí haces tu INSERT en la tabla "users"
  // await db.query('INSERT INTO users(email, password) VALUES($1, $2)', [email, hashPassword(password)]);
  
  res.json({ message: 'Correo verificado y usuario registrado' });
});

export default router;