import React, {useReducer} from 'react';

import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import clienteAxios from '../../config/axios';

import {FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from '../../Types/index';


const ProyectoState = props => {

   
    const initialState = { 

        proyectos : [],

        formulario : false,

        errorFormulario: false,

        proyecto: null,

        mensaje: null
    };

    // Dispatch para ejecutar las acciones 

    const [state, dispatch] = useReducer(ProyectoReducer, initialState);

    // SERIE DE FUNCIONES PARA EL CRUD DE PROYECTO 

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    // obtener los proyectos 

    const obtenerProyectos = async () => {
        try{
            const resultado = await clienteAxios.get('/api/proyectos');
            console.log(resultado)

            dispatch ({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            });

        } catch(error){
            const alerta = {
                msg: 'Hubo un error', 
                categoria: ' alerta.error'
            }
            dispatch({
                type:PROYECTO_ERROR, 
                payload: alerta 
            })
        }
    }

    // crear un nuevo proyecto 
    const agregarProyecto = async proyecto => {
        
        try{
            const resultado = await clienteAxios.post('/api/proyectos', proyecto );
            console.log(resultado)
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })

        } catch(error){
            const alerta = {
                msg: 'Hubo un error', 
                categoria: ' alerta.error'
            }
            dispatch({
                type:PROYECTO_ERROR, 
                payload: alerta 
            })
        }
    }

    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    };

    // selecciona el proyecto que el usuarui dio click

    const proyectoActual = proyectoId =>{
        dispatch({
           type: PROYECTO_ACTUAL,
        payload: proyectoId  
        }); 
    };

    // ELIMINA UN PROYECTO 
    const eliminarProyecto = async proyectoID => {

        try{
            await clienteAxios.delete(`/api/proyectos/${proyectoID}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoID
            });
        } catch(error){
            const alerta = {
                msg: 'Hubo un error', 
                categoria: ' alerta.error'
            }
            dispatch({
                type:PROYECTO_ERROR, 
                payload: alerta 
            })
        }
       
    };


    return ( 
        <ProyectoContext.Provider
            value ={{ 
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto, 
                mostrarError, 
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;