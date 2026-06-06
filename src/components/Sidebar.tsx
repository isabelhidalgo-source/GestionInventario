import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Sidebar.module.css';

const navItems = [
    { to: '/productos', label: 'Productos', icon: '📦', roles: ['admin', 'user'] },
];

const Sidebar = () => {
    const { user, logout } = useAuth();

    const filtered = navItems.filter(item =>
        item.roles.includes(user?.role ?? '')
    );

    return (
        <aside className={styles.sidebar} role="complementary" aria-label="Menú lateral">
            <div className={styles.logo}>
                <span className={styles.logoIcon}>⚡</span>
                <span className={styles.logoText}>TechStore</span>
            </div>

            <div className={styles.userInfo}>
                <div className={styles.avatar} aria-hidden="true">
                    {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className={styles.userName}>{user?.name}</p>
                    <span className={`${styles.badge} ${user?.role === 'admin' ? styles.admin : styles.user}`}>
                        {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </span>
                </div>
            </div>

            <nav aria-label="Menú de navegación">
                <ul className={styles.nav}>
                    {filtered.map(item => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `${styles.navItem} ${isActive ? styles.active : ''}`
                                }
                            >
                                <span className={styles.icon} aria-hidden="true">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <button className={styles.logout} onClick={logout} aria-label="Cerrar sesión">
                <span aria-hidden="true">🚪</span>
                <span>Cerrar Sesión</span>
            </button>
        </aside>
    );
};

export default Sidebar;