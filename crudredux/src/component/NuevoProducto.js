import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS DE REDUX 
import { crearNuevoProductoAction } from '../actions/productoActions';

import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaAction';

const NuevoProducto = ({history}) => {

    // state del componentes, Si se usa sólo aquí se puede usar UseState 
    const [ nombre, guardarNombre ] = useState('');
    const [ precio, guardarPrecio ] = useState('');

// USE dispatch y crea una funcion 

const dispatch = useDispatch();

// ACCEDER AL STATE DEL SELECTOR 

const cargando = useSelector( state => state.productos.loading );
const error = useSelector( state => state.productos.error );
const alerta = useSelector( state => state.alerta.alerta );

const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) )


    // AL HACER SUBMIT 
const submitNuevoProducto = e => {
     e.preventDefault();

     // VALIDA FORMULARIO 
     if( nombre.trim === '' || precio <= 0 ){

        const alerta = {
            msg: 'Ambos campos son obligatorios',
            classes: 'alert alert-danger text-center text-uppercase p3'
        }

        dispatch(mostrarAlerta(alerta));
         return;
     }

     // SI NO HAY ERRRORES 
     dispatch( ocultarAlertaAction() );

     // CREAR NUEVO PRODUCTO
     agregarProducto({
         nombre, 
         precio
     }); 

     // REDIRECCIONAR 
     history.push('/');
}


    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className=" text-center mb-4 font-weight-bold">Agregar Nuevo Producto</h2>

                        { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }

                        <form onSubmit={ submitNuevoProducto }>
                            <div className="form-group">
                                <label>Nombre del Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={ e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio del Producto"
                                    name="precio"
                                    value= {precio}
                                    onChange= {e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button 
                                type="submit"
                                className=" btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                    Agregar Nuevo Producto
                            </button>
                        </form>
                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;