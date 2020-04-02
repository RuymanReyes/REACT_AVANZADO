import React from 'react';

const Navbar = () => {
    return ( 
        <header className="app-header">

            <p className=" nombre-usuario">Hola <span>Ruyman Reyes</span></p>

            <nav className="nav-principal">
                <a href="#!">Cerrar Sesión </a>
            </nav>
        </header>
     );
}
 
export default Navbar;