import { pool } from '../db/connection.js';

// Obtener todos los vuelos
export const getFlights = async (req, res) => {
  const query = 'SELECT * FROM flights_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los vuelos' });
  }
};

// Obtener un vuelo por ID
export const getFlightById = async (req, res) => {
  const { flight_id } = req.params;
  const values = [flight_id];
  const query = 'SELECT * FROM flights_details WHERE flight_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el vuelo' });
  }
};

// Insertar un vuelo
export const insertFlight = async (req, res) => {
  const { aircraft_id, airline_id, departure_airport_id, departure_time, arrival_airport_id, arrival_time } = req.body;
  const values = [aircraft_id, airline_id, departure_airport_id, departure_time, arrival_airport_id, arrival_time];
  const query = 'INSERT INTO flights (aircraft_id, airline_id, departure_airport_id, departure_time, arrival_airport_id, arrival_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el vuelo' });
  }
};

// Actualizar un vuelo
export const updateFlight = async (req, res) => {
  const { flight_id } = req.params;
  const { aircraft_id, airline_id, departure_airport_id, departure_time, arrival_airport_id, arrival_time } = req.body;
  const values = [aircraft_id, airline_id, departure_airport_id, departure_time, arrival_airport_id, arrival_time, flight_id];
  const query = 'UPDATE flights SET aircraft_id = $1, airline_id = $2, departure_airport_id = $3, departure_time = $4, arrival_airport_id = $5, arrival_time = $6 WHERE flight_id = $7 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el vuelo' });
  }
};

// Eliminar un vuelo
export const deleteFlight = async (req, res) => {
  const { flight_id } = req.params;
  const values = [flight_id];
  const query = 'DELETE FROM flights WHERE flight_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    res.json({ message: 'Vuelo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el vuelo' });
  }
};
