// src/pages/LoginPage.tsx
import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/imagenes/logo.png'
import Button from '../components/Button'

const LoginPage = () => {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [errorGlobal, setErrorGlobal] = useState('')

    const [mensajeUsuario, setMensajeUsuario] = useState('')
    const [mensajePassword, setMensajePassword] = useState('')
    const [colorUsuario, setColorUsuario] = useState('')
    const [colorPassword, setColorPassword] = useState('')
    const [claseUsuario, setClaseUsuario] = useState('')
    const [clasePassword, setClasePassword] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Iniciar Sesión | Tecnopolis";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 'Inicia sesión de forma segura en Tecnopolis para gestionar tu cuenta, revisar el catálogo tecnológico y acceder a las herramientas de administración.');

        const ogTags = [
            { property: "og:title", content: "Iniciar Sesión - Tecnopolis" },
            { property: "og:description", content: "Ingresa de forma segura a tu panel de control y soluciones de hardware premium." },
            { property: "og:type", content: "website" }
        ];

        ogTags.forEach(({ property, content }) => {
            let ogTag = document.querySelector(`meta[property="${property}"]`);
            if (!ogTag) {
                ogTag = document.createElement('meta');
                ogTag.setAttribute('property', property);
                document.head.appendChild(ogTag);
            }
            ogTag.setAttribute('content', content);
        });
    }, []);

    const handleBlurUsuario = () => {
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

    const handleBlurPassword = () => {
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
        <main className="login-page">
            <div className="login-container">
                <section className="login-left" aria-label="Identidad corporativa">
                    <div className="login-logo">
                        <img src={logo} alt="Logotipo oficial de Tecnopolis" />
                    </div>
                </section>
                <section className="login-right" aria-label="Formulario de ingreso">
                    <div className="login-content">
                        <h1>Login</h1>

                        <form onSubmit={handleSubmit} className="login-form" noValidate>

                            <div className="form-group">
                                <label htmlFor="username-input" className="sr-only" style={{ display: 'none' }}>Usuario</label>
                                <input
                                    id="username-input"
                                    type='text'
                                    placeholder='Usuario'
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    onBlur={handleBlurUsuario}
                                    className={claseUsuario}
                                />
                                {mensajeUsuario && (
                                    <span className="mensaje-validacion" style={{ color: colorUsuario }}>
                                        {mensajeUsuario}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password-input" className="sr-only" style={{ display: 'none' }}>Contraseña</label>
                                <input
                                    id="password-input"
                                    type='password'
                                    placeholder='Contraseña'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                </section>
            </div>
        </main>
    )
}

export default LoginPage