import type { Role } from '../types/auth';

export function isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
}

export function logout(): void {
    localStorage.removeItem('token');
}

export function getUser(): { username: string; role: Role } | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = atob(token);
        const username = decoded.replace(':token', '');
        const role: Role = username === 'admin' ? 'admin' : 'user';

        return {
            username,
            role
        };

    } catch (e) {
        console.error("Token corrupto o inválido:", e);
        return null;
    }
}