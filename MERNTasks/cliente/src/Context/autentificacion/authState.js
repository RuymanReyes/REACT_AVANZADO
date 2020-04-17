import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import { REGISTRO_ERROR,REGISTRO_EXITO, OBTENER_USUARIOS, LOGIN_EXITO, LOGIN_ERROR, CERRAR_SESION} from '../../Types';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = props => {

    const initialState = {
        token : localStorage.getItem('token'), 
        autenticado: null, 
        usuario: null, 
        mensaje: null,
        cargando: true,
    };

    const [state, dispatch ] = useReducer(AuthReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta);

            dispatch({
                type: REGISTRO_EXITO,
                payload: respuesta.data
            });

            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    };

        // Retorna el usuario autenticado
        const usuarioAutenticado = async () => {
            const token = localStorage.getItem('token');
            if(token) {
                tokenAuth(token);
            }
    
            try {
                const respuesta = await clienteAxios.get('/api/auth');
                // console.log(respuesta);
                dispatch({
                    type: OBTENER_USUARIOS,
                    payload: respuesta.data.usuario
                });
    
            } catch (error) {
                console.log(error.response);
                dispatch({
                    type: LOGIN_ERROR
                });
            }
        };


    // cuando el usuario inicia sesión 

    const inciarSesion = async datos => {
        try{
            const respuesta = await clienteAxios.post('/api/auth', datos );
            
            dispatch({
                type: LOGIN_EXITO,
                payload: respuesta.data
            });

            // obtener el usuario
            usuarioAutenticado();

        } catch ( error ) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    };


// cierra la sesión del usuario 
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    };

    return (
        <AuthContext.Provider 
            value={{
                token: state.token, 
                autenticado: state.autenticado,
                usuario: state.usuario, 
                mensaje: state.mensaje,
                cargando: state.cargando, 
                registrarUsuario, 
                inciarSesion,
                usuarioAutenticado, 
                cerrarSesion,
            }}>

                 {props.children}

        </AuthContext.Provider>
            
    )
}

export default AuthState 
