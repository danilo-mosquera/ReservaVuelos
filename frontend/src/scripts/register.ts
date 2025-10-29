import { register } from "../api/users";
import type { User } from "../entities/user";

const registerForm = document.querySelector<HTMLButtonElement>('#register-form');

registerForm?.addEventListener('submit', e => {
    e.preventDefault();
    
    const email = document.querySelector<HTMLInputElement>('#email')?.value?.trim();
    const password = document.querySelector<HTMLInputElement>('#password')?.value;
    const confirmPassword = document.querySelector<HTMLInputElement>('#confirm-password')?.value;
    const username = document.querySelector<HTMLInputElement>('#username')?.value;
    const firstName = document.querySelector<HTMLInputElement>('#first-name')?.value;
    const lastName = document.querySelector<HTMLInputElement>('#last-name')?.value;

    if (password !== confirmPassword) {
        alert('¡Las contraseñas no coinciden!');
        return;
    }
    
    const user : User = {
        email: email,
        password: password,
        username: username,
        first_name: firstName,
        last_name: lastName,
        role_id: 3
    }

    const response = register(user);
    alert(response);
});