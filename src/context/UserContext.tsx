// Importamos createContext para crear el contexto global
// e importamos useState para manejar el estado
import { createContext, useState } from "react";

// Definimos el tipo User
// Este type describe cómo será el objeto usuario
type User = {
    name: string;
    role: string;
};

// Definimos el tipo del contexto
// Es decir: qué datos tendrá disponible el contexto global
type UserContextType = {
    user: User;
    //propiedad user estructura User
};

// Definimos las props del Provider
// children representa los componentes hijos
type UserProviderProps = {
    children: React.ReactNode;
};
// React.ReactNode permite recibir:
// componentes, texto, etiquetas JSX, etc.

// Creamos el contexto global
// createContext necesita un valor inicial
// {} objeto vacio con estructura UserContextType
export const UserContext = createContext({} as UserContextType);

// Creamos el componente Provider
// Este componente envolverá toda la aplicación
export function UserProvider({ children }: UserProviderProps) {

    // Creamos el estado global del usuario
    // user contiene los datos
    // useState<User> indica que seguirá la estructura User
    const [user] = useState<User>({
        name: "Carlos",
        role: "Administrador",
    });

    // Retornamos el Provider
    return (
        // UserContext.Provider comparte datos globales
        // value={{ user }} envía el usuario a toda la app
        //children representa todos los componentes
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}