import { pool } from '../db/connection.js';

// Obtener todos los aviones
export const getAircrafts = async (req, res) => {
  const query = 'SELECT * FROM aircrafts_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los aviones' });
  }
};

// Obtener un avión por ID
export const getAircraftById = async (req, res) => {
  const { aircraft_id } = req.params;
  const values = [aircraft_id];
  const query = 'SELECT * FROM aircrafts_details WHERE aircraft_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Avión no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el avión' });
  }
};

// Insertar un avión
export const insertAircraft = async (req, res) => {
  const { name, airline_id } = req.body;
  const values = [name, airline_id];
  const query = 'INSERT INTO aircrafts (name, airline_id) VALUES ($1, $2) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el avión' });
  }
};

// Actualizar un avión
export const updateAircraft = async (req, res) => {
  const { aircraft_id } = req.params;
  const { name, airline_id } = req.body;
  const values = [name, airline_id, aircraft_id];
  const query = 'UPDATE aircrafts SET name = $1, airline_id = $2 WHERE aircraft_id = $3 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Avión no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el avión' });
  }
};

// Eliminar un avión
export const deleteAircraft = async (req, res) => {
  const { aircraft_id } = req.params;
  const values = [aircraft_id];
  const query = 'DELETE FROM aircrafts WHERE aircraft_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Avión no encontrado' });
    res.json({ message: 'Avión eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el avión' });
  }
};