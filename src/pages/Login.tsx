// Hooks React
import { FormEvent, useState } from 'react'
// Navegación rutas
import { useNavigate } from 'react-router-dom'
// Context autenticación JWT
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
    // Estado usuario input
    const [usuario, setUsuario] = useState('')
    // Estado password input
    const [password, setPassword] = useState('')
    // Estado mensaje error
    const [error, setError] = useState('')
    // Función login global
    const { login } = useAuth()
    // Navegación paginas
    const navigate = useNavigate()
    // Enviar formulario login
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')

        // Consumir login API
        const success = await login(usuario, password)

        // Login incorrecto
        if (!success) {
            setError('Credenciales incorrectas')
            return
        }

        // Redirigir al catálogo de productos
        navigate('/productos')
    }

    return (
        <div className="cajalogin" >
            <h1>Login con JWT</h1>
            <form onSubmit={handleSubmit}>

                {/* Input usuario */}
                <input
                    type='text'
                    placeholder='Usuario'
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />

                <br /><br />

                {/* Input password */}
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                {/* Botón login */}
                <button type='submit'>
                    Ingresar
                </button>

            </form>

            {/* Mensaje error */}
            {
                error && (
                    <p className="error">
                        {error}
                    </p>
                )
            }
        </div>
    )
}

export default LoginPage