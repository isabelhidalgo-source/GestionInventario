import { Role, User } from '../types/auth';

/**
 * Comprueba si existe un token en el almacenamiento local.
 */
export function isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
}

/**
 * Elimina el token del almacenamiento local.
 */
export function logout(): void {
    localStorage.removeItem('token');
}

/**
 * Decodifica el token antiguo y mapea estrictamente el rol 
 * para que sea compatible con los guardianes de ruta modernos.
 */
export function getUser(): { username: string; role: Role } | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        // 1. Decodificar Base64 nativo
        const decoded = atob(token);

        // 2. Limpiar el sufijo ':token' del string legacy
        const username = decoded.replace(':token', '');

        // 3. Mapeo estricto de roles (sin textos en español que rompan la app)
        const role: Role = username === 'admin' ? 'admin' : 'user';

        // 4. Retornamos solo los datos reales extraídos y normalizados
        return {
            username,
            role
        };

    } catch (e) {
        console.error("Token corrupto o inválido:", e);
        return null;
    }
}