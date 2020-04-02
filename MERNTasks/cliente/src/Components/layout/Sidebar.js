import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import Listado from '../proyectos/ListadoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyecto';


const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN<span>TASK</span></h1>

            <NuevoProyecto />

            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                    <ListadoProyectos />

            </div>
        </aside>
     );
}
 
export default Sidebar
