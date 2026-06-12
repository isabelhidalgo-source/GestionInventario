// src/components/ProductForm.tsx
import React from 'react'
import Button from './Button'
import type { ProductFormData } from '../types/product'

type Props = {
    formData: ProductFormData
    setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>
    onSubmit: (e: React.FormEvent) => void
    editing?: boolean
    onCancel?: () => void

    clases: Record<string, string>
    mensajes: Record<string, string>
    colores: Record<string, string>
    onBlurField: (field: keyof ProductFormData) => void
}

export default function ProductForm({
    formData,
    setFormData,
    onSubmit,
    editing,
    onCancel,
    clases,
    mensajes,
    colores,
    onBlurField
}: Props) {

    const handleChange = (field: keyof ProductFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <h2>{editing ? 'Editar Producto' : 'Registrar Producto'}</h2>
            <form onSubmit={onSubmit} noValidate>

                {/* NOMBRE DEL PRODUCTO */}
                <div style={{ marginBottom: '12px' }}>
                    <input
                        type="text"
                        placeholder="Nombre producto"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        onBlur={() => onBlurField('title')}
                        className={clases.title || ''}
                    />
                    {mensajes.title && (
                        <span style={{ color: colores.title, display: 'block', marginTop: '4px', fontSize: '13px' }}>
                            {mensajes.title}
                        </span>
                    )}
                </div>

                {/* PRECIO */}
                <div style={{ marginBottom: '12px' }}>
                    <input
                        type="number"
                        placeholder="Precio"
                        value={formData.price === 0 ? "" : formData.price}
                        onChange={(e) => handleChange('price', Number(e.target.value))}
                        onBlur={() => onBlurField('price')}
                        className={clases.price || ''}
                    />
                    {mensajes.price && (
                        <span style={{ color: colores.price, display: 'block', marginTop: '4px', fontSize: '13px' }}>
                            {mensajes.price}
                        </span>
                    )}
                </div>

                {/* CATEGORÍA */}
                <div style={{ marginBottom: '12px' }}>
                    <input
                        type="text"
                        placeholder="Categoría"
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        onBlur={() => onBlurField('category')}
                        className={clases.category || ''}
                    />
                    {mensajes.category && (
                        <span style={{ color: colores.category, display: 'block', marginTop: '4px', fontSize: '13px' }}>
                            {mensajes.category}
                        </span>
                    )}
                </div>

                {/* DESCRIPCIÓN */}
                <div style={{ marginBottom: '15px' }}>
                    <textarea
                        placeholder="Descripción corta"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        onBlur={() => onBlurField('description')}
                        className={clases.description || ''}
                        rows={3}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {mensajes.description && (
                        <span style={{ color: colores.description, display: 'block', marginTop: '4px', fontSize: '13px' }}>
                            {mensajes.description}
                        </span>
                    )}
                </div>

                <Button type="submit" variant="guardar">{editing ? 'Actualizar' : 'Guardar'}</Button>

                {editing && (
                    <Button type="button" variant="cancelar" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
            </form>
        </>
    )
}