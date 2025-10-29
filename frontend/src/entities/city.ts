import type { Country } from "./country";

export interface City {
    city_id ?: number;
    name ?: string;
    country_id ?: number;
    country ?: Country;
}