import type { Flight } from "../entities/flight";

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const url = `${baseUrl}/api/flights`;

export async function getFlights() {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener vuelos');
  const data: Flight[] = await res.json();
  return data;
}

export async function getFlightById(id: number) {
  const res = await fetch(`${url}/${id}`);
  if (!res.ok) throw new Error('Vuelo no encontrado');
  const data: Flight = await res.json();
  return data;
}

export async function insertFlight(flight: Flight) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(flight),
  });
  if (!res.ok) throw new Error('Error al insertar vuelo');
  const data: Flight = await res.json();
  return data;
}

export async function updateFlight(id: number, flight: Flight) {
  const res = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(flight),
  });
  if (!res.ok) throw new Error('Error al actualizar vuelo');
  const data: Flight = await res.json();
  return data;
}

export async function deleteFlight(id: number) {
  const res = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar vuelo');
  const data: Flight = await res.json();
  return data;
}