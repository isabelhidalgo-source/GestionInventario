import type { JSX } from "react";

interface Props {
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    edad: number;
    nombreDueño: string;
    estaInternado: boolean;
    imagen: string;
}

function Card({
    id,
    nombre,
    especie,
    raza,
    edad,
    nombreDueño,
    estaInternado,
    imagen,
}: Props): JSX.Element {
    return (
        <div className="card">
            <img src={imagen} alt={nombre} className="card-img" />
            <div className="card-content">
                <h3>{nombre}</h3>
                <p><strong>Especie:</strong> {especie}</p>
                <p><strong>Raza:</strong> {raza}</p>
                <p><strong>Edad:</strong> {edad} años</p>
                <p><strong>Dueño:</strong> {nombreDueño}</p>
                <p><strong>Estado:</strong> {estaInternado ? "Internado" : "Alta"}</p>
                <p className="id-text"><strong>ID Paciente:</strong> {id}</p>
            </div>
        </div>
    );
}

export default Card;