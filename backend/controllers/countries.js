import { pool } from '../db/connection.js';

// Obtener todos los países
export const getCountries = async (req, res) => {
  const query = 'SELECT * FROM countries_details';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los países' });
  }
};

// Obtener un país por ID
export const getCountryById = async (req, res) => {
  const { country_id } = req.params;
  const values = [country_id];
  const query = 'SELECT * FROM countries_details WHERE country_id = $1';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'País no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el país' });
  }
};

// Insertar un país
export const insertCountry = async (req, res) => {
  const { name, code } = req.body;
  const values = [name, code];
  const query = 'INSERT INTO countries (name, code) VALUES ($1, $2) RETURNING *';
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el país' });
  }
};

// Actualizar un país
export const updateCountry = async (req, res) => {
  const { country_id } = req.params;
  const { name, code } = req.body;
  const values = [name, code, country_id];
  const query = 'UPDATE countries SET name = $1, code = $2 WHERE country_id = $3 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'País no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el país' });
  }
};

// Eliminar un país
export const deleteCountry = async (req, res) => {
  const { country_id } = req.params;
  const values = [country_id];
  const query = 'DELETE FROM countries WHERE country_id = $1 RETURNING *';
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'País no encontrado' });
    res.json({ message: 'País eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el país' });
  }
};
