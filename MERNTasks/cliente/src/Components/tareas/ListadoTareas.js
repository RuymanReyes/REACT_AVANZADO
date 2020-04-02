import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../Context/proyectos/ProyectoContext';
import TareaContext from '../../Context/Tarea/TareaContext';
import Tarea from './Tarea';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const ListadoTareas = () => {
        // Obtenemos el state del context 
    
        const ProyectoContext = useContext(proyectoContext);
        const { proyecto, eliminarProyecto  } = ProyectoContext;

        // Obtener las tareas desde el context

      const tareasContext = useContext(TareaContext);
      const {tareasProyecto} = tareasContext;

        // SI no hay proyectos seleccionados 
        if(!proyecto) return <h2>Selecciona un proyecto</h2>


        // ARRAY DESTRUCTURING PARA EXTRAER EL PROYECTO ACTUAL 

        const [proyectoActual] = proyecto;
    

 

    // ELIMINA EL PROYECTO 
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            
            <ul className="listado-tareas">
                {tareasProyecto.length === 0 
                ? <li className="tarea">No hay Tareas</li> 
                : 
                <TransitionGroup>
                   { tareasProyecto.map(tarea => (
                    <CSSTransition
                    key= {tarea.id}
                    timeout={200}
                    classNames="tarea"
                    >
                        <Tarea 
                        
                        tarea= {tarea}
                    />
                    </CSSTransition>
                ))}
                </TransitionGroup>
                }
            
            </ul> 

            <button type="button" className="btn btn-eliminar" onClick={onClickEliminar}>
                Eliminar Proyecto &times;
            </button>
            
        </Fragment>
       
     );
}
 
export default ListadoTareas;