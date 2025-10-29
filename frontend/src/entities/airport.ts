import type { City } from "./city";

export interface Airport {
    airport_id ?: number;
    name ?: string;
    address ?: string;
    city_id ?: number;
    city ?: City;
}