import "./Button.css";

//solo se permiten estos valores
type Variant = "guardar" | "cancelar" | "eliminar" | "success" | "ghost";
type Size = "small" | "medium" | "large";

//children: contenido dinámico
//variant: tipo del boton (color)
//size: tamano
//onclick: funcion al click
//disabled: true/false habilitado
//type: button type (submit, button, reset)
type ButtonProps = {
    children: React.ReactNode;
    variant?: Variant;
    size?: Size;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
};

function Button({
    children,
    variant = "guardar",
    size = "medium",
    onClick,
    disabled = false,
    type = "button",
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`btn ${variant} ${size}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;