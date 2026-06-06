import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    // ESTADO PARA GUARDAR EL USERNAME
    const [username, setUsername] = useState("");
    // ESTADO PARA GUARDAR EL PASSWORD
    const [password, setPassword] = useState("");

    // FUNCION QUE SE EJECUTA AL ENVIAR EL FORMULARIO
    const handleLogin = (e: React.FormEvent) => {

        e.preventDefault();

        // VALIDACION SIMPLE DE USUARIO Y PASSWORD
        if (username === "admin" && password === "123") {

            // GUARDA VARIABLES DE AUTENTICACION
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("username", username);
            //localStorage.setItem("password", password);

            //REDIRECCION A DASHBOARD
            navigate("/dashboard");

        } else {
            // MENSAJE DE ERROR SI LOS DATOS SON INCORRECTOS
            alert("Datos incorrectos..");

        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /><br />
                <button type="submit">Ingresar</button>

            </form>
        </div>
    );
}