// src/pages/Usuarios.tsx
import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../service/userService";
import type { User, Role } from "../types/auth";
import Button from "../components/Button";

export default function Usuarios() {
    // ==========================================
    // ESTADOS PRINCIPALES
    // ==========================================
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState<Role>("user");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [errorGlobal, setErrorGlobal] = useState("");

    // ==========================================
    // ESTADOS DE VALIDACIÓN VISUAL (Estilo docente)
    // ==========================================
    const [clases, setClases] = useState<Record<string, string>>({});
    const [mensajes, setMensajes] = useState<Record<string, string>>({});
    const [colores, setColores] = useState<Record<string, string>>({});

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        const data = await getUsers();
        setUsuarios(data);
    };

    // ==========================================
    // LOGICA DE MANEJO DE DESENFOQUE (onBlur)
    // ==========================================
    const handleBlurField = (field: "name" | "username" | "email") => {
        let value = "";
        if (field === "name") value = name;
        if (field === "username") value = username;
        if (field === "email") value = email;

        // Si el campo quedó completamente vacío, limpiamos los mensajes y bordes
        if (value.trim() === "") {
            setMensajes(prev => ({ ...prev, [field]: "" }));
            setClases(prev => ({ ...prev, [field]: "" }));
            return;
        }

        // Reglas de validación aplicadas al perder el foco
        if (field === "name" && value.trim().length < 4) {
            setMensajes(prev => ({ ...prev, name: "El nombre completo debe tener al menos 4 caracteres" }));
            setColores(prev => ({ ...prev, name: "red" }));
            setClases(prev => ({ ...prev, name: "error" }));
        } else if (field === "username" && value.trim().length < 3) {
            setMensajes(prev => ({ ...prev, username: "El nombre de usuario debe tener al menos 3 caracteres" }));
            setColores(prev => ({ ...prev, username: "red" }));
            setClases(prev => ({ ...prev, username: "error" }));
        } else if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
            setMensajes(prev => ({ ...prev, email: "Por favor, ingresa un correo electrónico válido" }));
            setColores(prev => ({ ...prev, email: "red" }));
            setClases(prev => ({ ...prev, email: "error" }));
        } else {
            // Si pasa las validaciones, se marca como correcto
            setMensajes(prev => ({ ...prev, [field]: "Campo válido" }));
            setColores(prev => ({ ...prev, [field]: "green" }));
            setClases(prev => ({ ...prev, [field]: "correcto" }));
        }
    };

    const limpiarValidaciones = () => {
        setClases({});
        setMensajes({});
        setColores({});
        setErrorGlobal("");
    };

    const limpiarFormulario = () => {
        setName("");
        setEmail("");
        setUsername("");
        setRole("user");
        setEditingId(null);
        limpiarValidaciones();
    };

    // ==========================================
    // PROCESAR FORMULARIO (SUBMIT)
    // ==========================================
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorGlobal("");

        // Forzar validación manual antes de enviar en caso de campos incorrectos
        const esNombreValido = name.trim().length >= 4;
        const esUsernameValido = username.trim().length >= 3;
        const esEmailValido = /\S+@\S+\.\S+/.test(email);

        if (!esNombreValido || !esUsernameValido || !esEmailValido) {
            handleBlurField("name");
            handleBlurField("username");
            handleBlurField("email");
            setErrorGlobal("Por favor, corrige las alertas del formulario antes de continuar.");
            return;
        }

        const userData = { name, email, username, role };

        try {
            if (editingId !== null) {
                await updateUser(editingId, userData);
                alert("Usuario actualizado con éxito");
            } else {
                await createUser(userData);
                alert("Usuario registrado con éxito");
            }
            limpiarFormulario();
            cargarUsuarios();
        } catch (err) {
            setErrorGlobal("Ocurrió un error al procesar la solicitud.");
        }
    };

    const handleEdit = (user: User) => {
        setEditingId(user.id);
        setName(user.name);
        setEmail(user.email);
        setUsername(user.username);
        setRole(user.role);
        limpiarValidaciones(); // Evita que herede clases visuales de errores previos
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            await deleteUser(id);
            alert("Usuario eliminado");
            cargarUsuarios();
        }
    };

    return (
        <div className="users-crud-container">
            <h2>Panel de Control: Administrar Usuarios</h2>

            {/* Formulario de Registro / Edición */}
            <form onSubmit={handleSubmit} className="users-form" noValidate>
                <h3>{editingId !== null ? "Modificar Datos de Usuario" : "Registrar Nuevo Usuario"}</h3>

                <div className="form-group-grid">

                    {/* INPUT: NOMBRE COMPLETO */}
                    <div className="form-input-container">
                        <input
                            type="text"
                            placeholder="Nombre Completo"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onBlur={() => handleBlurField("name")}
                            className={clases.name || ""}
                        />
                        {mensajes.name && (
                            <span className="mensaje-validacion" style={{ color: colores.name, display: "block", marginTop: "4px", fontSize: "13px" }}>
                                {mensajes.name}
                            </span>
                        )}
                    </div>

                    {/* INPUT: NOMBRE DE USUARIO */}
                    <div className="form-input-container">
                        <input
                            type="text"
                            placeholder="Nombre de Usuario"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            onBlur={() => handleBlurField("username")}
                            className={clases.username || ""}
                        />
                        {mensajes.username && (
                            <span className="mensaje-validacion" style={{ color: colores.username, display: "block", marginTop: "4px", fontSize: "13px" }}>
                                {mensajes.username}
                            </span>
                        )}
                    </div>

                    {/* INPUT: CORREO ELECTRÓNICO */}
                    <div className="form-input-container">
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onBlur={() => handleBlurField("email")}
                            className={clases.email || ""}
                        />
                        {mensajes.email && (
                            <span className="mensaje-validacion" style={{ color: colores.email, display: "block", marginTop: "4px", fontSize: "13px" }}>
                                {mensajes.email}
                            </span>
                        )}
                    </div>

                    {/* SELECT: ROL DE USUARIO */}
                    <div className="form-input-container">
                        <select value={role} onChange={e => setRole(e.target.value as Role)}>
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                </div>

                {errorGlobal && (
                    <p className="error-message-global" style={{ color: "red", margin: "10px 0 0 0", fontWeight: "500" }}>
                        {errorGlobal}
                    </p>
                )}

                <div className="form-actions">
                    <Button type="submit" variant="success" size="medium">
                        {editingId !== null ? "Actualizar Cambios" : "Guardar Usuario"}
                    </Button>
                    {editingId !== null && (
                        <Button type="button" variant="cancelar" size="medium" onClick={limpiarFormulario}>
                            Cancelar
                        </Button>
                    )}
                </div>
            </form>

            {/* Tabla de Usuarios */}
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td><code>{u.username}</code></td>
                            <td>{u.email}</td>
                            <td>
                                <span className={`role-badge badge-${u.role}`}>
                                    {u.role}
                                </span>
                            </td>
                            <td className="table-actions">
                                <Button variant="guardar" size="small" onClick={() => handleEdit(u)}>
                                    Editar
                                </Button>
                                <Button variant="eliminar" size="small" onClick={() => handleDelete(u.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}