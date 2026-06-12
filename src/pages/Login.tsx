// src/pages/LoginPage.tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/imagenes/logo.png'
import Button from '../components/Button'

const LoginPage = () => {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [errorGlobal, setErrorGlobal] = useState('')

    // Estados para mensajes, colores y clases (Estilo de la rúbrica del docente)
    const [mensajeUsuario, setMensajeUsuario] = useState('')
    const [mensajePassword, setMensajePassword] = useState('')
    const [colorUsuario, setColorUsuario] = useState('')
    const [colorPassword, setColorPassword] = useState('')
    const [claseUsuario, setClaseUsuario] = useState('')
    const [clasePassword, setClasePassword] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    // 🌟 SE ACTIVA AL SALIR DEL INPUT USUARIO (onBlur)
    const handleBlurUsuario = () => {
        // Si el campo quedó completamente vacío, limpiamos los mensajes y bordes
        if (usuario.trim() === "") {
            setMensajeUsuario("")
            setClaseUsuario("")
            return
        }

        if (usuario.length < 3) {
            setMensajeUsuario("El nombre debe tener al menos 3 caracteres")
            setColorUsuario("red")
            setClaseUsuario("error")
        } else {
            setMensajeUsuario("Nombre válido")
            setColorUsuario("green")
            setClaseUsuario("correcto")
        }
    }

    // 🌟 SE ACTIVA AL SALIR DEL INPUT PASSWORD (onBlur)
    const handleBlurPassword = () => {
        // Si el campo quedó completamente vacío, limpiamos los mensajes y bordes
        if (password === "") {
            setMensajePassword("")
            setClasePassword("")
            return
        }

        if (password.length < 4) {
            setMensajePassword("La contraseña debe tener al menos 4 caracteres")
            setColorPassword("red")
            setClasePassword("error")
        } else {
            setMensajePassword("Contraseña válida")
            setColorPassword("green")
            setClasePassword("correcto")
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setErrorGlobal('')

        // Forzar la validación visual al enviar en caso de que intenten dar click directo a ingresar
        if (usuario.length < 3 || password.length < 4) {
            handleBlurUsuario()
            handleBlurPassword()
            setErrorGlobal('Usuario o Contraseña incorrectos.')
            return
        }

        const success = await login(usuario, password)
        if (!success) {
            setErrorGlobal('Credenciales incorrectas')
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

                        <form onSubmit={handleSubmit} className="login-form" noValidate>

                            {/* CAMPO: USUARIO */}
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Usuario'
                                    value={usuario}
                                    /* El cambio se guarda de forma limpia sin lanzar errores inmediatamente */
                                    onChange={(e) => setUsuario(e.target.value)}
                                    /* 🌟 Ejecuta la validación del docente SOLO al salir del campo */
                                    onBlur={handleBlurUsuario}
                                    className={claseUsuario}
                                />
                                {mensajeUsuario && (
                                    <span className="mensaje-validacion" style={{ color: colorUsuario }}>
                                        {mensajeUsuario}
                                    </span>
                                )}
                            </div>

                            {/* CAMPO: CONTRASEÑA */}
                            <div className="form-group">
                                <input
                                    type='password'
                                    placeholder='Contraseña'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    /* 🌟 Ejecuta la validación del docente SOLO al salir del campo */
                                    onBlur={handleBlurPassword}
                                    className={clasePassword}
                                />
                                {mensajePassword && (
                                    <span className="mensaje-validacion" style={{ color: colorPassword }}>
                                        {mensajePassword}
                                    </span>
                                )}
                            </div>

                            {errorGlobal && <p className="error-message-global" style={{ color: 'red', marginTop: '10px' }}>{errorGlobal}</p>}

                            <div className="login-actions">
                                <Button type="submit" variant="success" size="medium">
                                    Ingresar
                                </Button>
                                <Button type="button" variant="cancelar" size="medium" onClick={() => navigate('/')}>
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage