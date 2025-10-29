import { pool } from '../db/connection.js';

// Obtener todas los boletos de avión
export const getFlightSeats = async (req, res) => {
  const query = 'SELECT * FROM flight_seats_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los boletos de avión' });
  }
};

// Obtener un boleto de avión por ID
export const getFlightSeatById = async (req, res) => {
  const { flight_id, seat_id } = req.params;
  const values = [flight_id, seat_id];
  const query = 'SELECT * FROM flight_seats_details WHERE flight_id = $1 AND seat_id = $2';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Boleto de avión no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el boleto de avión' });
  }
};

// Insertar un boleto de avión
export const insertFlightSeat = async (req, res) => {
  const { flight_id, seat_id } = req.body;
  const values = [flight_id, seat_id];
  const query = 'INSERT INTO flight_seats (flight_id, seat_id) VALUES ($1, $2) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el boleto de avión' });
  }
};

// Actualizar un boleto de avión
export const updateFlightSeat = async (req, res) => {
  const { flight_id, seat_id } = req.params;
  const { available } = req.body;
  const values = [available, flight_id, seat_id];
  const query = 'UPDATE flight_seats SET available = $1 WHERE flight_id = $2 AND seat_id = $3 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Boleto de avión no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el boleto de avión' });
  }
};

// Eliminar un boleto de avión
export const deleteFlightSeat = async (req, res) => {
  const { flight_id, seat_id } = req.params;
  const values = [flight_id, seat_id];
  const query = 'DELETE FROM flight_seats WHERE flight_id = $1 AND seat_id = $2 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Boleto de avión no encontrado' });
    res.json({ message: 'Boleto de avión eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el boleto de avión' });
  }
};