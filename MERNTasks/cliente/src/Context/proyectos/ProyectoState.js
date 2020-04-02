import React, {useReducer} from 'react';

import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';

import {FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../Types/index';

import {v4 as uuidv4 } from 'uuid';




const ProyectoState = props => {

    const proyectos = [
        {id: 1, nombre: 'Tienda Virtual'},
        {id: 2,nombre: 'Intranet'},
        {id:3, nombre: 'Diseño sitio web'}
    ]


    const initialState = { 

        proyectos : [],

        formulario : false,

        errorFormulario: false,

        proyecto: null
    }

    // Dispatch para ejecutar las acciones 

    const [state, dispatch] = useReducer(ProyectoReducer, initialState)

    // SERIE DE FUNCIONES PARA EL CRUD DE PROYECTO 

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    // obtener los proyectos 

    const obtenerProyectos = () => {
        dispatch ({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        });
    }

    // crear un nuevo proyecto 
    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4();

        // INSERTAR PROYECTO AL STATE
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        });
    }

    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    // selecciona el proyecto que el usuarui dio click

    const proyectoActual = proyectoId =>{
        dispatch({
           type: PROYECTO_ACTUAL,
        payload: proyectoId  
        }); 
    }

    // ELIMINA UN PROYECTO 
    const eliminarProyecto = proyectoID => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoID
        })
    }


    return ( 
        <ProyectoContext.Provider
            value ={{ 
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
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