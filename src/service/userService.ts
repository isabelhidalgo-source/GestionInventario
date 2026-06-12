// src/service/userService.ts
import type { User } from "../types/auth";

const LOCAL_STORAGE_KEY = "mock_users_crud";

const defaultUsers: User[] = [
    { id: 1, username: "admin", email: "admin@example.com", role: "admin", name: "Administrador" },
    { id: 2, username: "user", email: "user@example.com", role: "user", name: "Usuario Común" },
    { id: 3, username: "carlitos", email: "carlos@example.com", role: "user", name: "Carlos Pérez" }
];

const getStoredUsers = (): User[] => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    return JSON.parse(stored);
};

export const getUsers = async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return getStoredUsers();
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    const users = getStoredUsers();
    const newUser: User = {
        ...user,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    };
    users.push(newUser);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    return newUser;
};

export const updateUser = async (id: number, updatedData: Omit<User, "id">): Promise<User> => {
    const users = getStoredUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("Usuario no encontrado");

    const updatedUser: User = { ...updatedData, id };
    users[index] = updatedUser;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    return updatedUser;
};

export const deleteUser = async (id: number): Promise<boolean> => {
    const users = getStoredUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredUsers));
    return true;
};