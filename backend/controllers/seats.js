import { pool } from '../db/connection.js';

// Obtener todas los asientos
export const getSeats = async (req, res) => {
  const query = 'SELECT * FROM seats_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los asientos' });
  }
};

// Obtener una aerolínea por ID
export const getSeatById = async (req, res) => {
  const { seat_id } = req.params;
  const values = [seat_id];
  const query = 'SELECT * FROM seats_details WHERE seat_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Asiento no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el asiento' });
  }
};

// Insertar una aerolínea
export const insertSeat = async (req, res) => {
  const { row, column, class_id, aircraft_id } = req.body;
  const values = [row, column, class_id, aircraft_id];
  const query = 'INSERT INTO seats (row, column, class_id, aircraft_id) VALUES ($1, $2, $3, $4) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el asiento' });
  }
};

// Actualizar una aerolínea
export const updateSeat = async (req, res) => {
  const { seat_id } = req.params;
  const { row, column, class_id, aircraft_id } = req.body;
  const values = [row, column, class_id, aircraft_id, seat_id];
  const query = 'UPDATE seats SET row = $1, column = $2, class_id = $3, aircraft_id = $4 WHERE seat_id = $5 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Asiento no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el asiento' });
  }
};

// Eliminar una aerolínea
export const deleteSeat = async (req, res) => {
  const { seat_id } = req.params;
  const values = [seat_id];
  const query = 'DELETE FROM seats WHERE seat_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Asiento no encontrado' });
    res.json({ message: 'Asiento eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el asiento' });
  }
};