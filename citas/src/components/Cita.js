import React from 'react';
import propTypes from 'prop-types';


const Cita = ({cita, eliminarCita}) => {
    return ( 
        <div className="cita">
            <p>Mascota: <span>{cita.mascota}</span> </p>
            <p>Mascota: <span>{cita.propietario}</span> </p>
            <p>Mascota: <span>{cita.fecha}</span> </p>
            <p>Mascota: <span>{cita.hora}</span> </p>
            <p>Mascota: <span>{cita.sintomas}</span> </p>

            <button
                className="button eliminar u-full-width"
                onClick={() => eliminarCita(cita.id)}
            >Eliminar &times;</button>
        </div>
     );
}

// PROPTYPES 
Cita.propTypes = {
    cita: propTypes.object.isRequired,
    eliminarCita: propTypes.func.isRequired
}
 
export default Cita;