import { pool } from '../db/connection.js';

// Obtener todas las aerolíneas
export const getAirlines = async (req, res) => {
  const query = 'SELECT * FROM airlines_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las aerolíneas' });
  }
};

// Obtener una aerolínea por ID
export const getAirlineById = async (req, res) => {
  const { airline_id } = req.params;
  const values = [airline_id];
  const query = 'SELECT * FROM airlines_details WHERE airline_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Aerolínea no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la aerolínea' });
  }
};

// Insertar una aerolínea
export const insertAirline = async (req, res) => {
  const { name } = req.body;
  const values = [name];
  const query = 'INSERT INTO airlines (name) VALUES ($1) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar la aerolínea' });
  }
};

// Actualizar una aerolínea
export const updateAirline = async (req, res) => {
  const { airline_id } = req.params;
  const { name } = req.body;
  const values = [name, airline_id];
  const query = 'UPDATE airlines SET name = $1 WHERE airline_id = $2 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Aerolínea no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la aerolínea' });
  }
};

// Eliminar una aerolínea
export const deleteAirline = async (req, res) => {
  const { airline_id } = req.params;
  const values = [airline_id];
  const query = 'DELETE FROM airlines WHERE airline_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Aerolínea no encontrada' });
    res.json({ message: 'Aerolínea eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la aerolínea' });
  }
};