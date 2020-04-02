import React, { useContext, useState, useEffect} from 'react';
import proyectoContext from '../../Context/proyectos/ProyectoContext';
import TareaContext from '../../Context/Tarea/TareaContext';
import TareaReducer from '../../Context/Tarea/TareaReducer';
import ListadoProyectos from '../proyectos/ListadoProyecto';

const FormTarea = () => {

    // Obtenemos el state del context 
    
    const ProyectoContext = useContext(proyectoContext);
    const { proyecto  } = ProyectoContext;


    // STATE DEL FORMULARIO 

    const [tarea, guardarTarea ] = useState({
        nombre:'',
    })

    // obtener la función del context de tarea 

    const tareasContext = useContext(TareaContext);
    const {agregarTarea, validarTarea, errorTarea, obtenerTareas, tareaSeleccionada, actualizarTarea, limpiarTarea } = tareasContext;


        // EFECT QUE DETECTA UNA TAREA SELECCIONADA 

        useEffect( ()=>{
            if( tareaSeleccionada !== null){
                guardarTarea(tareaSeleccionada)
            } else {
                guardarTarea({
                    nombre: ''
                })
            }
        }, [tareaSeleccionada]);
    

    // extraer el nombre del proyecto 

    const {nombre } = tarea;

    // Si no hay proyectos seleccionados 
    if(!proyecto) return null;


    // ARRAY DESTRUCTURING PARA EXTRAER EL PROYECTO ACTUAL 

    const [proyectoActual] = proyecto;

    // leer los valores del formulario 

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }


    const onSumit = e => {
        e.preventDefault();

        if( nombre.trim()=== ''){
            validarTarea()
        }

        // REVISAR SI ES EDICIÖN O NUEVA TAREA 
        if( tareaSeleccionada === null ){
            tarea.proyectoID = proyectoActual.id;
            tarea.estado = false;  
            agregarTarea(tarea);
        } else {
            actualizarTarea(tarea); 

            // elimina tarea seleccionada 
            limpiarTarea();
        }

        obtenerTareas(proyectoActual.id);

        guardarTarea({
            nombre: ''
        })
    }
    
    return ( 
        <div className="formulario">
            <form onSubmit={onSumit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>

                <div className="contendedor-input">
                    <input 
                        type="submit"
                        className=" btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>: null }
        </div>
     );
}
 
export default FormTarea;