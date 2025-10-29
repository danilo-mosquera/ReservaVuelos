import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import flightsRoutes from './routes/flights.js';
import countriesRoutes from './routes/countries.js';
import citiesRoutes from './routes/cities.js';
import airlinesRoutes from './routes/airlines.js';
import airportsRoutes from './routes/airports.js';
import aircraftsRoutes from './routes/aircrafts.js';
import usersRoutes from './routes/users.js';
import rolesRoutes from './routes/roles.js';
import classesRoutes from './routes/classes.js';
import seatsRoutes from './routes/seats.js';
import flightSeatsRoutes from './routes/flightSeats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

app.use('/api/flights', flightsRoutes);
app.use('/api/countries', countriesRoutes);
app.use('/api/cities', citiesRoutes);
app.use('/api/airlines', airlinesRoutes);
app.use('/api/airports', airportsRoutes);
app.use('/api/aircrafts', aircraftsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/seats', seatsRoutes);
app.use('/api/flightSeats', flightSeatsRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));