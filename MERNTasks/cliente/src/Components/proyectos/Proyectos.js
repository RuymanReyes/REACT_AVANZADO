import React, { useContext, useEffect } from 'react';
import AuthContext from '../../Context/autentificacion/authContext';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';



const Proyectos = () => {

// EXTRAER LA INFO DE AUTENTIFICACION 
const authContext = useContext(AuthContext);
const { usuarioAutenticado } = authContext;

useEffect(() => {
    usuarioAutenticado();
        // eslint-disable-next-line
    
// eslint-disable-next-line
}, []);

    return ( 
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">

                <Navbar />
                <main>
                    <FormTarea />
                    <div className=" contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos
