// Librería HTTP para consumir APIs
import axios from 'axios'

// Instancia principal de Axios
const API = axios.create({
    baseURL: 'https://libreriamanitas.com/apilogin',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor para enviar JWT automáticamente
API.interceptors.request.use((config) => {
    // Obtiene token guardado
    const token = localStorage.getItem('token')
    // Si existe token
    if (token) {
        // Enviar Authorization Bearer
        config.headers.Authorization = `Bearer ${token}`
    }
    // Continuar petición
    return config
})

// Login del usuario
export const loginRequest = async (usuario: string, password: string) => {
    // POST hacia login.php
    const response = await API.post(
        '/login.php',
        {
            usuario,
            password
        }
    )
    // Retorna respuesta JWT
    return response.data
}

// Verificar sesión JWT
export const verifyRequest = async () => {
    const response = await API.get('/verify.php')
    // Retorna usuario validado
    return response.data
}

// Logout del sistema
export const logoutRequest = async () => {
    const response = await API.get('/logout.php')
    // Retorna respuesta logout
    return response.data
}

// Exporta instancia Axios
export default API