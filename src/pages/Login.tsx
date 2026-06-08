import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
// Context autenticación JWT
import { useAuth } from '../context/AuthContext'
import logo from '../assets/imagenes/logo.png'

const LoginPage = () => {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        const success = await login(usuario, password)
        if (!success) {
            setError('Credenciales incorrectas')
            return
        }
        navigate('/home')
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <div className="login-logo">
                        <img src={logo} alt="Logo del sistema" />
                    </div>
                </div>
                <div className="login-right">
                    <div className="login-content">
                        <h1>Login</h1>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Usuario'
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type='password'
                                    placeholder='Contraseña'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <p className="error">
                                    {error}
                                </p>
                            )}

                            <button type='submit' className="btn-login">
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage