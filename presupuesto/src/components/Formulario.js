import React, {useState } from 'react';
import Errors from '../components/Errors';
import shortId from 'shortid';


const Formulario = ({guardarGasto, guardaCrearGasto}) => {

    const [ nombre, guardarNombre ] = useState('');
    const [ cantidad, guardarCantidad ] = useState(0);
    const [ error, guardarError ] = useState(false);




    // Cuando se agrega un gasto 

    const agregarGasto = e => {
        e.preventDefault();

        // VALIDAR 
        if( cantidad < 1  || nombre.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // contruir el gasto 

        const gasto = { 
            nombre, 
            cantidad, 
            id: shortId.generate() 
        };

        // Pasar Gasto al componente principal 

        guardarGasto(gasto);
        guardaCrearGasto(true);

        // RESETEAR EL FORMULARIO 

     guardarNombre('');
     guardarCantidad(0);
    };
    
    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos</h2>

            { error ? <Errors mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto "/> : null }


            <div className="campo">
                <label>Nombre del Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="ej.Transporte"
                    value= {nombre}
                    onChange= { e=> guardarNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad del Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="ej.300"
                    value={cantidad}
                    onChange={ e => guardarCantidad( e.target.value, 10  )}
                />
            </div>
            <input 
                type="submit"
                className=" button-primary u-full-width"
                value="Agregar Gasto"
            />
            
        </form>
     );
}
 
export default Formulario;