import type { Class } from "./class";

export interface Seat {
    seat_id ?: number;
    row ?: string;
    column ?: string;
    class_id ?: number;
    class ?: Class;
}