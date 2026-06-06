import logoImg from "../assets/logo.png";

type NavbarProps = {
    title: string;
};

import { useAuth } from "../context/AuthContext";

export default function Navbar({ title }: NavbarProps) {
    const { user } = useAuth();

    return (
        <header className="header">
            <div className="header-brand">
                <img src={logoImg} alt="Logo" className="nav-logo" />
                <h1>
                    {title} - {user?.name ?? 'Invitado'} {user ? `| ${user.role}` : ''}
                </h1>
            </div>
        </header>
    );
}