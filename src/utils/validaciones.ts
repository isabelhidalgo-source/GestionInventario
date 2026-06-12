// src/utils/validaciones.ts

/**
 * Valida que un campo no esté vacío y cumpla con una longitud mínima.
 * Cumple con: Campos obligatorios y Longitud mínima de texto.
 */
export const validarTexto = (valor: string, nombreCampo: string, minLength: number = 3): string => {
    if (!valor || valor.trim() === "") {
        return `El campo ${nombreCampo} es obligatorio.`;
    }
    if (valor.trim().length < minLength) {
        return `El campo ${nombreCampo} debe tener al menos ${minLength} caracteres.`;
    }
    return ""; // Retorna vacío si está todo correcto
};

/**
 * Valida la contraseña para el Login.
 */
export const validarPassword = (valor: string, minLength: number = 4): string => {
    if (!valor) {
        return "La contraseña es obligatoria.";
    }
    if (valor.length < minLength) {
        return `La contraseña debe tener al menos ${minLength} caracteres.`;
    }
    return "";
};

/**
 * Valida el formato de ingreso de un Correo Electrónico mediante expresiones regulares.
 * Cumple con: Formato de ingreso de valores.
 */
export const validarEmail = (email: string): string => {
    if (!email || email.trim() === "") {
        return "El correo electrónico es obligatorio.";
    }

    // Expresión regular estándar para comprobar el formato de un email (ejemplo@dominio.com)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email.trim())) {
        return "El formato del correo electrónico no es válido (ejemplo@dominio.com).";
    }

    return ""; // Retorna vacío si es un formato válido
};