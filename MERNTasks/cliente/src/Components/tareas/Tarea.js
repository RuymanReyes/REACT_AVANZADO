import React, {useContext} from 'react';
import TareaContext from '../../Context/Tarea/TareaContext';
import proyectoContext from '../../Context/proyectos/ProyectoContext';
import { TAREA_ACTUAL } from '../../Types';



const Tarea = ({tarea}) => {

        // Obtenemos el state del context 
    
        const ProyectoContext = useContext(proyectoContext);
        const { proyecto  } = ProyectoContext;

        // EXTRAER PROYECTO 
        const [ proyectoActual ] = proyecto;
    

        // obtener la función del context de tarea 

        const tareasContext = useContext(TareaContext);
        const {eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext;
        

        // función que se ejecuta cuando se hace clic a eliminar tarea 

        const tareasEliminar = id => {
            eliminarTarea(id);
            obtenerTareas(proyecto[0].id);
        }

        // función que modifica el estado de la tarea 
        const estado = tarea =>{
            if( tarea.estado ){
                tarea.estado = false;
            } else {
                tarea.estado = true;
            }
            cambiarEstadoTarea(tarea);
        }

    // agreaga una tarea actual para editar 

    const seleccionarTarea = tarea => {
       guardarTareaActual(tarea);
    }
    
    return ( 
        <li className="tarea-sombra">
            <p>{tarea.nombre}</p>
        
            <div className="estado">
                {tarea.estado ? 
                (<button type='button'className="completo" onClick={() => estado(tarea)}>Completo</button>)
                :(<button type="button" className="incompleto" onClick={() => estado(tarea)}>Incompleto</button>)}
            </div>

            <div className=" acciones ">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => seleccionarTarea(tarea)}
                    >
                Editar
                </button>
                <button 
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareasEliminar(tarea.id)}>
                Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Tarea;