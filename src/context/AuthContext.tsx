// centraliza toda la autenticación JWT del sistema.
// para compartir el usuario autenticado y las funciones login/logout en toda la app
// Hooks y tipos de React
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react' // 🌟 SOLUCIÓN: Importación exclusiva de tipo para cumplir con verbatimModuleSyntax

// Funciones API JWT (mock para demo)
import { loginRequest, verifyRequest, logoutRequest } from '../api/mockAuthApi'
// Tipo User
import type { User } from '../types/auth'

// Estructura global del contexto
interface AuthContextProps {
    user: User | null
    loading: boolean
    isAuthenticated: boolean
    login: (usuario: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
}

// Contexto global autenticacion
const AuthContext = createContext({} as AuthContextProps)

// Provider principal JWT
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Estado usuario
    const [user, setUser] = useState<User | null>(null)
    // Estado loading
    const [loading, setLoading] = useState(true)
    // Verifica sesión al iniciar app
    useEffect(() => { verificarSesion() }, [])

    // Validar token JWT
    const verificarSesion = async () => {
        // Obtener token
        const token = localStorage.getItem('token')
        // Si no existe token
        if (!token) {
            setLoading(false)
            return
        }

        try {
            // Verificar JWT backend
            const response = await verifyRequest()
            // Guardar usuario valido
            setUser(response.user)
        } catch (error) {
            // Token inválido
            localStorage.removeItem('token')
            setUser(null)
        }
        // Finaliza loading
        setLoading(false)
    }

    // Login usuario
    const login = async (usuario: string, password: string) => {
        try {
            // Consumir login API
            const response = await loginRequest(usuario, password)
            // Guardar JWT
            localStorage.setItem('token', response.token)
            // Guardar usuario
            setUser(response.user)
            // Login correcto
            return true
        } catch (error) {
            // Login incorrecto
            return false
        }
    }

    // Logout sistema
    const logout = async () => {
        try {
            // Consumir logout API
            await logoutRequest()
        } catch (error) { }
        // Eliminar token JWT
        localStorage.removeItem('token')
        // Limpiar usuario
        setUser(null)
    }

    // Compartir autenticación global
    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

// Hook personalizado autenticacion
export const useAuth = () => useContext(AuthContext)