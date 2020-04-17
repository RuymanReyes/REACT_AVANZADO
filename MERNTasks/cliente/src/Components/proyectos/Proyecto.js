import React, {useContext} from 'react';
import proyectoContext from '../../Context/proyectos/ProyectoContext';
import TareaContext from '../../Context/Tarea/TareaContext';


const Proyecto = ({proyecto}) => {

      // Obtenemos el state del context 
    
      const ProyectoContext = useContext(proyectoContext);
      const {proyectoActual} = ProyectoContext;

      // obtener la función del context de tarea 

      const tareasContext = useContext(TareaContext);
      const {obtenerTareas} = tareasContext;

      // función para agreagar el proyecto actual  
      const selecccionarProyecto = id => {
          proyectoActual(id);
          obtenerTareas(id);
      }
  
    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selecccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;