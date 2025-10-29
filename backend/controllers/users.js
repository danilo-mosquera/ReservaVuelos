import { pool } from '../db/connection.js';
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || "supersecretkey";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  const query = 'SELECT * FROM users_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { user_id } = req.params;
  const values = [user_id];
  const query = 'SELECT * FROM users_details WHERE user_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// Obtener un usuario por email
async function getUserByEmail(email) {
  const values = [email];
  const query = 'SELECT * FROM users_details WHERE email = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// Registrar un nuveo usuario
export const register = async (req, res) => {
  const { username, email, password, first_name, last_name, role_id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const values = [username, email, hashedPassword, first_name, last_name, role_id];
  const query = 'INSERT INTO users (username, email, password, first_name, last_name, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  try {
    const result = await pool.query(query, values);
    //res.status(201).json(result.rows[0]);
    if (result.rowCount > 0) {
      res.status(201).json('Has sido registrado con éxito. ¡Bienvenido a la familia AeroSpace!');
    }
  } catch (error) {
    //console.error(error);
    res.status(500).json(error);//{ message: 'Error al registrar el usuario' });
  }
};

export const profile = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Sin autorización' });
  
  try {
    const user = jwt.verify(token, secret);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(user, secret, { expiresIn: "2h" });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true en producción (HTTPS)
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Insertar un usuario
export const insertUser = async (req, res) => {
  const { username, email, password, first_name, last_name, role_id } = req.body;
  const values = [username, email, password, first_name, last_name, role_id = 3];
  const query = 'INSERT INTO users (username, email, password, first_name, last_name, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el usuario' });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { username, email, password, first_name, last_name, role_id } = req.body;
  const values = [username, email, password, first_name, last_name, role_id, user_id];
  const query = 'UPDATE users SET username = $1, email = $2, password = $3, first_name = $4, last_name = $5, role_id = $6 WHERE user_id = $7 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { user_id } = req.params;
  const values = [user_id];
  const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};