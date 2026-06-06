import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Home() {
    const { user } = useContext(UserContext);

    return (
        <>
            <h2>Dashboard</h2>
            <p>Bienvenido {user.name} - Rol: {user.role}</p>

            <div className="cards">
                <div className="card">
                    <h3>Pacientes Hoy</h3>
                    <p>20</p>
                </div>

                <div className="card">
                    <h3>Médicos Activos</h3>
                    <p>5</p>
                </div>

                <div className="card">
                    <h3>Emergencias</h3>
                    <p>1</p>
                </div>
            </div>
        </>
    );
}