export type Role = 'admin' | 'user';

export interface User {
    id: number;
    username: string;
    email: string;
    role: Role;
    name: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}