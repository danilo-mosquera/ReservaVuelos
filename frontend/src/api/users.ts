import type { User } from "../entities/user";

const url = 'http://localhost:3000/api/users';

export async function register(user: User) {
  const response = await fetch(`${url}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  
  if (!response.ok) throw new Error('Error al registrarse');
  return await response.json();
}

export async function login(user: User) {
  const response = await fetch(`${url}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  
  if (!response.ok) throw new Error('Error al iniciar sesión');
  return await response.json();
}

export async function profile() {
  const response = await fetch(`${url}/profile`, {credentials: 'include'});
  console.log('response', response);
  if (!response.ok) throw new Error('Error al buscar el perfil');
  const data : User = await response.json();
  return data;
}