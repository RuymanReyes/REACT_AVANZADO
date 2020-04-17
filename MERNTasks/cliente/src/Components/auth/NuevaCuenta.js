import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../Context/alerta/alertaContext';
import AuthContext from '../../Context/autentificacion/authContext';

const Login = (props) => {

    // extraer los valores del context 
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { registrarUsuario, mensaje, autenticado } = authContext;

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado. 

    useEffect( () => {
        if( autenticado ){
            props.history.push('/proyectos');

        }
        if ( mensaje ){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
// eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);


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
            if( nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === '' ) {
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
                return;
            }

            // PASSWORD MINIMO DE 6 CARACTERES 
            if( password.length < 6 ) {
                mostrarAlerta('El password debe de ser de al menos 6 carácteres', ' alerta-error');
                return
            }


            // LOS DOS PASSWORD SON IGUALES 
            if( password !== confirmar ) {
                mostrarAlerta('Los Password deben de ser iguales', ' alerta-error');
                return
            }

            // PASARLO AL ACTION 

            registrarUsuario({
                nombre, 
                email,
                password
            })
        }



    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }


            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>
                

                <form onSubmit={onSubmit}>
                    

                <div className="campo-form">
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

                <div className="campo-form">
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

                    <div className="campo-form">
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
                    <div className="campo-form">
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
