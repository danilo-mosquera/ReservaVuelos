import type { Airline } from "./airline";

export interface Aircraft {
    aircraft_id ?: number;
    name ?: string;
    airline_id ?: number;
    airline ?: Airline;
}