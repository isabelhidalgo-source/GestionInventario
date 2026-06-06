import React from 'react'
import Button from './Button'

type Props = {
    title: string
    price: number
    setTitle: (v: string) => void
    setPrice: (v: number) => void
    onSubmit: (e: React.FormEvent) => void
    editing?: boolean
    onCancel?: () => void
}

export default function ProductForm({ title, price, setTitle, setPrice, onSubmit, editing, onCancel }: Props) {
    return (
        <>
            <h2>{editing ? 'Editar Producto' : 'Registrar Producto'}</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Nombre producto"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />

                <Button type="submit" variant="guardar">{editing ? 'Actualizar' : 'Guardar'}</Button>

                {editing && (
                    <Button
                        type="button"
                        variant="cancelar"
                        onClick={() => onCancel && onCancel()}
                    >
                        Cancelar
                    </Button>
                )}
            </form>
        </>
    )
}
