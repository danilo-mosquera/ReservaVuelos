import { pool } from '../db/connection.js';

// Obtener todas los roles
export const getRoles = async (req, res) => {
  const query = 'SELECT * FROM roles_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los roles' });
  }
};

// Obtener un rol por ID
export const getRoleById = async (req, res) => {
  const { role_id } = req.params;
  const values = [role_id];
  const query = 'SELECT * FROM roles_details WHERE role_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el rol' });
  }
};

// Insertar un rol
export const insertRole = async (req, res) => {
  const { name } = req.body;
  const values = [name];
  const query = 'INSERT INTO roles (name) VALUES ($1) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el rol' });
  }
};

// Actualizar un rol
export const updateRole = async (req, res) => {
  const { role_id } = req.params;
  const { name } = req.body;
  const values = [name, role_id];
  const query = 'UPDATE roles SET name = $1 WHERE role_id = $2 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el rol' });
  }
};

// Eliminar un rol
export const deleteRole = async (req, res) => {
  const { role_id } = req.params;
  const values = [role_id];
  const query = 'DELETE FROM roles WHERE role_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Rol no encontrado' });
    res.json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el rol' });
  }
};