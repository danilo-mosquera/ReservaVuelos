import { pool } from '../db/connection.js';

// Obtener todos los aeropuertos
export const 
getAirports = async (req, res) => {
  const query = 'SELECT * FROM airports_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los aeropuertos' });
  }
};

// Obtener un aeropuerto por ID
export const getAirportById = async (req, res) => {
  const { airport_id } = req.params;
  const values = [airport_id];
  const query = 'SELECT * FROM airports_details WHERE airport_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Aeropuerto no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el aeropuerto' });
  }
};

// Insertar un aeropuerto
export const insertAirport = async (req, res) => {
  const { name, city_id, address } = req.body;
  const values = [name, city_id, address];
  const query = 'INSERT INTO airports (name, city_id, address) VALUES ($1, $2, $3) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el aeropuerto' });
  }
};

// Actualizar un aeropuerto
export const updateAirport = async (req, res) => {
  const { airport_id } = req.params;
  const { name, city_id, address } = req.body;
  const values = [name, city_id, address, airport_id];
  const query = 'UPDATE airports SET name = $1, city_id = $2, address = $3 WHERE airport_id = $4 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Aeropuerto no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el aeropuerto' });
  }
};

// Eliminar un aeropuerto
export const deleteAirport = async (req, res) => {
  const { airport_id } = req.params;
  const values = [airport_id];
  const query = 'DELETE FROM airports WHERE airport_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Aeropuerto no encontrado' });
    res.json({ message: 'Aeropuerto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el aeropuerto' });
  }
};