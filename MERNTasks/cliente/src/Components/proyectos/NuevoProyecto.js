import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../Context/proyectos/ProyectoContext';

const NuevoProyecto = () => {


    // Obtenemos el state del context 
    
    const ProyectoContext = useContext(proyectoContext);
    const {formulario, errorFormulario,  mostrarFormulario, agregarProyecto, mostrarError,  } = ProyectoContext;

// State para Proyecto 
    const [ proyecto, guardarProyecto, ] = useState({
        nombre:'', 
    });

    const { nombre } = proyecto 

    // LEE LOS CONTENIDOS DEL INPUT 

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto, 
            [e.target.name] : e.target.value
        })
    }

    // CUANDO EL USUARIO ENVIA UN PROYECTO

    const onSubmitProyecto = e => { 
        e.preventDefault();

        // Validar el proyecto 
        if(nombre === ''){
            mostrarError()
            return
        }


        /// agregar al state
        agregarProyecto(proyecto)

        // reiniciar el form 

        guardarProyecto({
            nombre: ''
        })
       
    }
    // MOSTRAR FORMAULARIO 
        const onClickFormulario = () => {
            mostrarFormulario();
        }


    return ( 
        <Fragment>
           <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={onClickFormulario}
        >
            Nuevo Proyecto 
        </button> 
            
            { formulario ? (
                <form className=" formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
                <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre del Proyecto"
                    name="nombre"
                    onChange={onChangeProyecto}
                    value={nombre}
                />
    
                <input
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Agregar Proyecto"
                />
    
            </form>
            ) : null
            }

            {errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        
        </Fragment>
        
     );
}
 
export default NuevoProyecto;