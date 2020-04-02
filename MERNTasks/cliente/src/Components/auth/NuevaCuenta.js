import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {


    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '', 
        password:'',
        confirmar:''
    });

    // extraer Usuario 

    const {nombre, email, password, confirmar } = usuario;

    const onChange = (e) =>{
        guardarUsuario({
            ...usuario, 
            [e.target.name] : e.target.value
        })

    }

    // CUANDO EL USUARIO QUIERE INICIAR SESIÓN
        const onSubmit = e => {
            e.preventDefault();


            // VALIDAR NO HAYA CAMPOS VACIOS 



            // PASSWORD MINIMO DE 6 CARACTERES 


            // LOS DOS PASSWORD SON IGUALES 


            // PASARLO AL ACTION 
        }



    return ( 
        <div className=" form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>
                

                <form onSubmit={onsubmit}>
                <div className=" campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="nombre"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                <div className=" campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className=" campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu Password"
                            onChange={onChange}
                        />
                    </div>
                    <div className=" campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Repite tu Password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className=" btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                   
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default Login
