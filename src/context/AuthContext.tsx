import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { loginRequest, verifyRequest, logoutRequest } from '../api/mockAuthApi'
import type { User } from '../types/auth'

interface AuthContextProps {
    user: User | null
    loading: boolean
    isAuthenticated: boolean
    login: (usuario: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => { verificarSesion() }, [])

    const verificarSesion = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            setLoading(false)
            return
        }

        try {
            const response = await verifyRequest()
            setUser(response.user)
        } catch (error) {
            localStorage.removeItem('token')
            setUser(null)
        }
        setLoading(false)
    }

    const login = async (usuario: string, password: string) => {
        try {
            const response = await loginRequest(usuario, password)
            localStorage.setItem('token', response.token)
            setUser(response.user)
            return true
        } catch (error) {
            return false
        }
    }

    const logout = async () => {
        try {
            await logoutRequest()
        } catch (error) { }
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)