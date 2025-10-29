import type { Aircraft } from "./aircraft";
import type { Airline } from "./airline";
import type { Airport } from "./airport";
import type { Time } from "./time";

export interface Flight {
    flight_id ?: number;
    aircraft_id ?: number;
    aircraft ?: Aircraft;
    airline_id ?: number;
    airline ?: Airline;
    departure_airport_id ?: number;
    departure_airport ?: Airport;
    departure_time_string ?: string;
    departure_time ?: Time;
    arrival_airport_id ?: number;
    arrival_airport ?: Airport;
    arrival_time_string ?: string;
    arrival_time ?: Time; 
    duration ?: Time; 
}