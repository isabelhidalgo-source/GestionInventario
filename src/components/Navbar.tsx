import logoImg from "../assets/logo.png";

type NavbarProps = {
    title: string;
};

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar({ title }: NavbarProps) {
    const { user } = useContext(UserContext);

    return (
        <header className="header">
            <div className="header-brand">
                <img src={logoImg} alt="Logo" className="nav-logo" />
                <h1>{title}-{user.name}|{user.role}</h1>
            </div>
        </header>
    );
}