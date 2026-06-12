// Mock authentication API for frontend-only authentication
import type { User } from "../types/auth";

// Predefined users
const users: Record<string, { password: string; user: User }> = {
    admin: {
        password: "admin123",
        user: { id: 1, username: "admin", email: "admin@example.com", role: "admin", name: "Administrador" },
    },
    user: {
        password: "user123",
        user: { id: 2, username: "user", email: "user@example.com", role: "user", name: "Usuario" },
    },
};


const makeToken = (username: string) => btoa(username + ":token");

export const loginRequest = async (usuario: string, password: string) => {
    const entry = users[usuario];
    if (!entry || entry.password !== password) {
        const err: any = new Error("Credenciales inválidas");
        err.response = { status: 401 };
        throw err;
    }

    const token = makeToken(usuario);
    localStorage.setItem("token", token);

    return { token, user: entry.user };
};

export const verifyRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        const err: any = new Error("No token");
        err.response = { status: 401 };
        throw err;
    }

    // decode username
    try {
        const decoded = atob(token);
        const username = decoded.replace(":token", "");
        const entry = users[username];
        if (!entry) throw new Error("Usuario no encontrado");
        return { user: entry.user };
    } catch (e) {
        const err: any = new Error("Token inválido");
        err.response = { status: 401 };
        throw err;
    }
};

export const logoutRequest = async () => {
    localStorage.removeItem("token");
    return { success: true };
};

export default { loginRequest, verifyRequest, logoutRequest };
