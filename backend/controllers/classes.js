import { pool } from '../db/connection.js';

// Obtener todas las clases
export const getClasses = async (req, res) => {
  const query = 'SELECT * FROM classes_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las clases' });
  }
};

// Obtener una clase por ID
export const getClassById = async (req, res) => {
  const { class_id } = req.params;
  const values = [class_id];
  const query = 'SELECT * FROM classes_details WHERE class_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Clase no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la clase' });
  }
};

// Insertar una clase
export const insertClass = async (req, res) => {
  const { name } = req.body;
  const values = [name];
  const query = 'INSERT INTO classes (name) VALUES ($1) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar la clase' });
  }
};

// Actualizar una clase
export const updateClass = async (req, res) => {
  const { class_id } = req.params;
  const { name } = req.body;
  const values = [name, class_id];
  const query = 'UPDATE classes SET name = $1 WHERE class_id = $2 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Clase no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la clase' });
  }
};

// Eliminar una clase
export const deleteClass = async (req, res) => {
  const { class_id } = req.params;
  const values = [class_id];
  const query = 'DELETE FROM classes WHERE class_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Clase no encontrada' });
    res.json({ message: 'Clase eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la clase' });
  }
};