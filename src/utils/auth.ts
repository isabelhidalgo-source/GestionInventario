// Compatibilidad: funciones antiguas usadas en algunas rutas/componentes
// No usan React hooks para que las importaciones a nivel de módulo sigan funcionando.

export function isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
}

export function logout(): void {
    localStorage.removeItem('token')
}

export function getUser() {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
        const decoded = atob(token)
        const username = decoded.replace(':token', '')
        // Map simple roles compatible con la app legacy
        const rol = username === 'admin' ? 'Administrador' : 'Invitado'
        return { usuario: username, rol }
    } catch (e) {
        return null
    }
}
