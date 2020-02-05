import React, {Fragment, useState} from 'react';
import Errors from './Errors';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    // DEFINIR STATE 

    const [ cantidad, guardarCantidad ] = useState(0);
    const [ error, guardarError ] = useState(false);

    // Función que lee el presupuesto 

    const definirPresupuesto = e => {
        guardarCantidad( parseInt(e.target.value));
    }

    // submit para definir presupuesto 
    const agregarPresupuesto = e => {
        e.preventDefault();

        // VALIDAR 
        if( cantidad < 1 || isNaN(cantidad)) {
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    }

    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>
            { error ? <Errors mensaje="el presupuesto es Incorrecto"/>  : null }
            <form
                onSubmit={agregarPresupuesto}
            >
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />
                <input 
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir Presupuesto"
                    
                />
            </form>
        </Fragment>
     );
}
 
export default Pregunta;