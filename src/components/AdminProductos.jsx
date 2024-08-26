import React, { useState } from "react";
import axios from 'axios';

const AdminProductos = () => {
    const [tamaños, setTamaños] = useState([]);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [sugerencias, setSugerencias] = useState([]);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    
    const manejarCambioBuscador = async (e) => {
        const valor = e.target.value;
        setBuscador(valor);
        if (valor.length > 2) {
            try {
                const response = await axios.get(`http://localhost:3000/api/sugerencias?query=${valor}`);
                setSugerencias(response.data);
                setMostrarSugerencias(true);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setMostrarSugerencias(false);
        }
    };
    const manejarSeleccionSugerencia = (producto) => {
        setBuscador(producto.nombre);
        setMostrarSugerencias(false);
        try {
            // Actualizar el estado del formulario con los datos del producto seleccionado
            setFormulario({
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                categoria: producto.categoria,
                color: producto.color,
                stock: producto.stock,
                precio: producto.precio,
            });
            setTamaños(producto.tamanos || []); // Asegúrate de que los tamaños del producto se carguen correctamente
            setProductoEncontrado(producto);
    
            // Ocultar las sugerencias
            setMostrarSugerencias(false);
        } catch (error) {
            console.error('Error al seleccionar el producto:', error);
            alert('Hubo un problema al seleccionar el producto');
        }
        // Aquí puedes cargar el producto seleccionado en el formulario
    };
    
    const [formulario, setFormulario] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        categoria: "",
        color: "",
        stock: 0,
        precio: 0,
    });
    const [productoEncontrado, setProductoEncontrado] = useState(null);
    const [buscador, setBuscador] = useState("");

    // Opciones de tamaño disponibles
    const opcionesTamaño = ["S", "M", "L", "XL"];

    // Filtra tamaños disponibles que aún no se han seleccionado
    const opcionesTamañoDisponibles = opcionesTamaño.filter(t => 
        !tamaños.some(tamaño => tamaño.tamano === t)
    );

    const agregarTamaño = () => {
        if (tamaños.length < 4) {
            setTamaños([...tamaños, { tamano: "", stock: "" }]);
        } else {
            alert('No se pueden agregar más de 4 tamaños');
        }
    };

    const alternarMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const seleccionarTamaño = (valor, index) => {
        setTamaños(tamaños.map((tamaño, i) =>
            i === index ? { ...tamaño, tamano: valor } : tamaño
        ));
    };

    const manejarCambio = (e, index) => {
        const nuevoStock = e.target.value;
        setTamaños(tamaños.map((tamaño, i) =>
            i === index ? { ...tamaño, stock: nuevoStock } : tamaño
        ));
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
    
        const producto = {
            ...formulario,
            tamanos: tamaños.length > 0 ? tamaños : [], // Asegúrate de que los datos se envían correctamente
        };
    
        try {
            if (formulario.id) {
                const response = await axios.put(`http://localhost:3000/api/productos/${formulario.id}`, producto);
                if (response.status === 200) {
                    alert('Producto actualizado correctamente');
                }
            } else {
                const response = await axios.post('http://localhost:3000/api/productos', producto);
                if (response.status === 201) {
                    alert('Producto agregado correctamente');
                }
            }
            // Restablece el formulario y los tamaños
            setFormulario({
                id: "",
                nombre: "",
                descripcion: "",
                categoria: "",
                color: "",
                stock: 0,
                precio: 0,
            });
            setTamaños([]);
            setProductoEncontrado(null);
            setBuscador("");
            console.log('Datos enviados:', producto); // Verifica que los datos sean correctos
        } catch (error) {
            console.error('Error al agregar o actualizar producto:', error);
            alert('Hubo un problema al procesar el producto');
        }
    };
    
    const manejarBusqueda = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.get(`http://localhost:3000/api/buscar?nombre=${buscador}`);
    
            if (response.status === 200 && response.data) {
                const producto = response.data;
                setFormulario({
                    id: producto.id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    categoria: producto.categoria,
                    color: producto.color,
                    stock: producto.stock,
                    precio: producto.precio,
                });
                setTamaños(producto.tamanos || []);
                setProductoEncontrado(producto);
            } else {
                alert('Producto no encontrado');
            }
            setBuscador("");
        } catch (error) {
            console.error('Error al buscar producto:', error);
            alert('Hubo un problema al buscar el producto');
        }
    };

    const manejarEliminacion = async () => {
        if (!formulario.id) {
            alert('No hay ningún producto seleccionado para eliminar');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:3000/api/productos/${formulario.id}`);

            if (response.status === 200) {
                alert('Producto eliminado correctamente');
                setFormulario({
                    id: "",
                    nombre: "",
                    descripcion: "",
                    categoria: "",
                    color: "",
                    stock: 0,
                    precio: 0,
                });
                setTamaños([]);
                setProductoEncontrado(null);
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Hubo un problema al eliminar el producto');
        }
    };

    // Maneja el enfoque y desenfoque del campo de precio
    const manejarEnfoquePrecio = () => {
        if (formulario.precio === 0) {
            setFormulario({ ...formulario, precio: "" });
        }
    };

    const manejarDesenfoquePrecio = () => {
        if (formulario.precio === "") {
            setFormulario({ ...formulario, precio: 0 });
        }
    };

    return (
        <div className="w-auto max-w-md bg-white m-6 p-6 border-2 rounded-lg shadow-md">
            <div className="text-center mb-4">
                <h1 className="font-bold text-xl">Administrar Productos</h1>
            </div>
            
            <form className="flex flex-col gap-4" onSubmit={manejarEnvio}>
                <div className="flex flex-col">
                    <label htmlFor="buscador" className="font-semibold text-center">Buscador</label>
                    <div className="flex flex-col relative">
                        <input 
                            type="text" 
                            id="buscador" 
                            name="buscador" 
                            className="border rounded px-2 py-1 flex-grow" 
                            value={buscador} 
                            onChange={manejarCambioBuscador}
                            placeholder="Buscar producto por nombre"
                        />
                        {mostrarSugerencias && (
                            <ul className="absolute bg-white border rounded w-full max-h-48 overflow-auto mt-8">
                                {sugerencias.map((producto) =>(
                                    <li
                                        key={producto.id}
                                        onClick={() =>manejarSeleccionSugerencia(producto)}
                                        className="px-4 py-2 border-t-2  hover:bg-gray-200 cursor-pointer"
                                    >
                                        {producto.nombre}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <div className="flex flex-col w-1/2">
                        <div className="border rounded w-full h-24 flex items-center justify-center">
                            <span>Cargar IMG</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col w-full">
                    <label htmlFor="nombre" className="font-semibold text-center">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        className="border rounded px-2 py-1" 
                        onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} 
                        value={formulario.nombre}
                        placeholder="Nombre del producto"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="descripcion" className="font-semibold text-center">Descripción</label>
                    <input 
                        type="text" 
                        id="descripcion" 
                        name="descripcion" 
                        className="border rounded px-2 py-1" 
                        onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })} 
                        value={formulario.descripcion}
                        placeholder="Descripción del producto"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="categoria" className="font-semibold text-center">Categoría</label>
                    <input 
                        type="text" 
                        id="categoria" 
                        name="categoria" 
                        className="border rounded px-2 py-1" 
                        onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })} 
                        value={formulario.categoria}
                        placeholder="Categoría del producto"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <label htmlFor="color" className="font-semibold text-center">Color</label>
                        <input 
                            type="text" 
                            id="color" 
                            name="color" 
                            className="border rounded px-2 py-1" 
                            onChange={(e) => setFormulario({ ...formulario, color: e.target.value })} 
                            value={formulario.color}
                            placeholder="Color del producto"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center">
    <label className="font-semibold text-center">Tamaños</label>
    {tamaños.map((tamaño, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
            <select 
                className="border rounded px-2 py-1" 
                value={tamaño.tamano} 
                onChange={(e) => seleccionarTamaño(e.target.value, index)}
            >
                <option value="">Seleccionar</option>
                {opcionesTamaño.map(opcion => (
                    <option key={opcion} value={opcion} disabled={!opcionesTamañoDisponibles.includes(opcion)}>
                        {opcion}
                    </option>
                ))}
            </select>
            <input 
                type="number" 
                name="stock" 
                className="border rounded px-2 py-1 w-24" 
                value={tamaño.stock || ''} 
                onChange={(e) => manejarCambio(e, index)} 
                placeholder="Stock"
            />
        </div>
    ))}
    <button 
        type="button" 
        onClick={agregarTamaño} 
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        disabled={tamaños.length >= 4}
    >
        Agregar Tamaño
    </button>
</div>
                
                <div className="flex flex-col">
                    <label htmlFor="precio" className="font-semibold text-center">Precio</label>
                    <input 
                        type="number" 
                        id="precio" 
                        name="precio" 
                        className="border rounded px-2 py-1" 
                        onChange={(e) => setFormulario({ ...formulario, precio: parseFloat(e.target.value) || 0 })} 
                        value={formulario.precio === 0 ? "" : formulario.precio} 
                        onFocus={manejarEnfoquePrecio} 
                        onBlur={manejarDesenfoquePrecio}
                        placeholder="Precio del producto"
                    />
                </div>

                <div className="flex gap-4 justify-center mt-4">
                    <button type="submit" className="pl-4 pr-4 py-2 bg-green-500 text-white rounded">Guardar</button>
                    <button 
                        type="button" 
                        onClick={manejarEliminacion} 
                        className="pl-4 pr-4 py-2 bg-red-500 text-white rounded"
                    >
                        Eliminar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductos;