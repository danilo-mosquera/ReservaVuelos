import type { Role } from "./role";

export interface User {
    user_id ?: number;
    username ?: string;
    email ?: string;
    password ?: string;
    first_name ?: string;
    last_name ?: string;
    role_id ?: number;
    role ?: Role;
}