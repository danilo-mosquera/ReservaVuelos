import { pool } from '../db/connection.js';

// Obtener todos los ciudades
export const getCities = async (req, res) => {
  const query = 'SELECT * FROM cities_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los ciudades' });
  }
};

// Obtener una ciudad por ID
export const getCityById = async (req, res) => {
  const { city_id } = req.params;
  const values = [city_id];
  const query = 'SELECT * FROM cities_details WHERE city_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Ciudad no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la ciudad' });
  }
};

// Insertar una ciudad
export const insertCity = async (req, res) => {
  const { name, country_id } = req.body;
  const values = [name, country_id];
  const query = 'INSERT INTO cities (name, country_id) VALUES ($1, $2) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar la ciudad' });
  }
};

// Actualizar una ciudad
export const updateCity = async (req, res) => {
  const { city_id } = req.params;
  const { name, country_id } = req.body;
  const values = [name, country_id, city_id];
  const query = 'UPDATE cities SET name = $1, country_id = $2 WHERE city_id = $3 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Ciudad no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la ciudad' });
  }
};

// Eliminar una ciudad
export const deleteCity = async (req, res) => {
  const { city_id } = req.params;
  const values = [city_id];
  const query = 'DELETE FROM cities WHERE city_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Ciudad no encontrada' });
    res.json({ message: 'Ciudad eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la ciudad' });
  }
};
