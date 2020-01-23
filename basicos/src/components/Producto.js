import React from 'react'


const Producto = ({producto, carrito, agregarProducto, productos}) => {

    const { nombre, precio, id  } = producto;

    // Agregar al carrito
    const seleccionarProducto = (id) => {
        const producto = productos.filter( producto => producto.id === id )[0];
        agregarProducto([
            ...carrito,
            producto
        ]);
    }

    // Eliminar Producto del carrito
    const eliminarProducto = (id) => {
        const productos = carrito.filter(producto => producto.id !== id );

        // colocar los productos en el state 
        agregarProducto(productos)
    }

    return ( 
        <div>
            <h2>{ nombre }</h2>
            <p> $ { precio } </p>


            {productos
            ?
                (
                    <button
                    type= "buton"
                    onClick = { () => seleccionarProducto(id) }
                    >
                        Comprar 
                </button>
                )
            :
                (
                    <button
                    type= "buton"
                    onClick= { () => eliminarProducto(id)  }
                    >
                        Eliminar 
                </button>
                )
            }
        </div>
     );
}
 
export default Producto;