import React, { useState } from 'react';
import Error from '../components/Error';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar}) => {


    // state del formulario
  

    const [error, guardarError] = useState(false);

    // extraer ciudad y país 

    const { ciudad, pais } = busqueda;

    // función que coloca los elementos en el state
    const handleChange = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    // submit al formulario 
    const handleSumit = e => {
        e.preventDefault();

        if(ciudad.trim() === '' || pais.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        guardarConsultar(true);
    }


    return (  
        <form onSubmit={handleSumit}>

            { error ? <Error mensaje='Ambos campos son Obligatorios'/> : null }
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                <option value=""> -- Seleccione un País-- </option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>

                </select>

            </div>

            <div className=" input-field col s12">
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />

            </div>
            
        </form>
    );
}
 
export default Formulario;