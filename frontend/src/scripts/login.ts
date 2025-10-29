import { login, profile } from "../api/users";
import type { User } from "../entities/user";

const registerForm = document.querySelector<HTMLButtonElement>('#register-form');

registerForm?.addEventListener('submit', e => {
    e.preventDefault();
    
    const email = document.querySelector<HTMLInputElement>('#email')?.value?.trim();
    const password = document.querySelector<HTMLInputElement>('#password')?.value;

    const user : User = {
        email: email,
        password: password,
    }

    const response = login(user);
    const profilex = profile();
});