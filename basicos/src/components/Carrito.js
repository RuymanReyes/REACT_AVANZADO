import React from 'react';
import './carrito.css';
import Producto from './Producto';

const Carrito = ({carrito, agregarProducto}) => (
    <div className="carrito">
        <h2>Tu Carrito de Compra</h2>

        {carrito.length === 0 
        ?
            <p>No hay elementos en el Carrito</p>

        : carrito.map(producto => (
            <Producto 
                key={producto.id}
                producto={producto}
                carrito= {carrito}
                agregarProducto = {agregarProducto}
            />
        )) }
        
    </div>
);
 
export default Carrito;