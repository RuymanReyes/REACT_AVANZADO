import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertaContext from '../../Context/alerta/alertaContext';
import proyectoContext from '../../Context/proyectos/ProyectoContext';
import Proyecto from './Proyecto';

const ListadoProyecto = () => {

    // Obtenemos el state del context 
    
    const ProyectoContext = useContext(proyectoContext);
    const {proyectos, obtenerProyectos, mensaje } = ProyectoContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta } = alertaContext


    useEffect(() => {

        if ( mensaje ){
            mostrarAlerta( mensaje.msg, mensaje.categoria )
        }
       obtenerProyectos();
    // eslint-disable-next-line    
    }, [mensaje]);

    // revisamos que proyectos tiene contenido 
    if( proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno </p>;


   
 
    return ( 
        <ul className="listado-proyectos">

        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }

            <TransitionGroup>
            {proyectos.map( proyecto => (
                <CSSTransition
                key={proyecto._id}
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
 
export default ListadoProyecto;