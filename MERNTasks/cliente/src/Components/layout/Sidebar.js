import React from 'react';
import ListadoProyecto from '../proyectos/ListadoProyecto';
import NuevoProyecto from '../proyectos/NuevoProyecto';


const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN<span>TASK</span></h1>

            <NuevoProyecto />

            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                    <ListadoProyecto />

            </div>
        </aside>
     );
}
 
export default Sidebar
