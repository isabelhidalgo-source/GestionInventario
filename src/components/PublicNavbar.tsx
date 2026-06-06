import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicNavbar() {
    const { isAuthenticated, user } = useAuth()
    return (
        <nav>
            {isAuthenticated && (
                <>
                    <Link to="/">Home</Link>
                    {" | "}
                    <Link to="/productos">Productos</Link>
                    <hr />
                    <p>Usuario: {user?.name} | Rol: {user?.role}</p>
                </>
            )}
        </nav>
    )
}