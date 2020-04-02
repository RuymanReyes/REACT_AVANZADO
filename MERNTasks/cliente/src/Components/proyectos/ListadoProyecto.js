import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../Context/proyectos/ProyectoContext';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const ListadoProyectos = () => {

    // Obtenemos el state del context 
    
    const ProyectoContext = useContext(proyectoContext);
    const {proyectos, obtenerProyectos} = ProyectoContext;


    useEffect(() => {
       obtenerProyectos();
        
    }, []);

    // revisamos que proyectos tiene contenido 
    if( proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno </p>;


   
 
    return ( 
        <ul className="listado-proyectos">
            <TransitionGroup>
            {proyectos.map( proyecto => (
                <CSSTransition
                key={proyecto.id}
                timeout={200}
                className="proyecto"
                >
                    <Proyecto
                    
                    proyecto={proyecto}
                />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;