export const validarTexto = (valor: string, nombreCampo: string, minLength: number = 3): string => {
    if (!valor || valor.trim() === "") {
        return `El campo ${nombreCampo} es obligatorio.`;
    }
    if (valor.trim().length < minLength) {
        return `El campo ${nombreCampo} debe tener al menos ${minLength} caracteres.`;
    }
    return "";
};

export const validarPassword = (valor: string, minLength: number = 4): string => {
    if (!valor) {
        return "La contraseña es obligatoria.";
    }
    if (valor.length < minLength) {
        return `La contraseña debe tener al menos ${minLength} caracteres.`;
    }
    return "";
};

export const validarEmail = (email: string): string => {
    if (!email || email.trim() === "") {
        return "El correo electrónico es obligatorio.";
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email.trim())) {
        return "El formato del correo electrónico no es válido (ejemplo@dominio.com).";
    }

    return "";
};