import React, { Fragment, useState } from 'react';

import uuid from 'uuid/v4';


const Formulario = ({crearCita}) => {

    // CREAR STATE DE CITAS 

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '', 
        sintomas: ''
    });

    const [error, actualizarError ] = useState( false );

    // FUNCION QUE SE EJECUTA CADA VEZ QUE SE ESCRIBE EN UN INPUT

    const actualizarState =  (e) => {

        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    };

    // ESTRAER LOS VALORES 

    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // CUANDO EL USARIO AGREAGA UNA CITA 

    const submitCita = (e) => {
        e.preventDefault();

        // VALIDAR 
        if( mascota.trim()  === '' || propietario.trim()  === ''|| fecha.trim()  === '' ||hora.trim()  === '' ||sintomas.trim()  === '') {
            actualizarError(true)
            return
        }
        // eliminamos el mensaje 
        actualizarError(false);

        // asignar ID

        cita.id= uuid();

        // CREAR CITA 
        crearCita(cita);

        // REINICIAR FORMULARIO 
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '', 
            sintomas: ''
        })
    }

    return (  
        <Fragment>
            <h2>Crear Cita</h2>

            {error ?  <p className="alerta-error">Todos los campos son obligatorios</p>   : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className= "u-full-width"
                    placeholder="Nombre de mascota"
                    onChange={actualizarState}
                    value= {mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className= "u-full-width"
                    placeholder="Dueño de la mascota"
                    onChange={actualizarState}
                    value= {propietario}


                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className= "u-full-width"
                    onChange={actualizarState}
                    value= {fecha}


                />
                 <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value= {hora}


                />
                 <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value= {sintomas}

                >
                </textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                    onChange={actualizarState}

                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}
 
export default Formulario;