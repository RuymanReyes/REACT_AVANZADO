import React, { useReducer } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import {v4 as uuidv4 } from 'uuid';


import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from '../../Types';


const TareaState = props => {
    const initialState = {
        tareas: [
            {id:1, nombre:'Elegir Plataforma', estado: true, proyectoID: 1}, 
            {id:2, nombre:'Elegir Colores', estado: false, proyectoID: 3}, 
            {id:3, nombre:'Elegir Plataforma de Pago', estado: true, proyectoID: 1}, 
            {id:4, nombre:'Elegir hosting', estado: true, proyectoID: 2}, 
            {id:5, nombre:'Elegir web', estado: true, proyectoID: 1}, 
            {id:6, nombre:'Elegir login', estado: true, proyectoID: 3}, 
            {id:7, nombre:'Elegir hosting', estado: true, proyectoID: 2}, 
            {id:8, nombre:'Elegir unlogin', estado: true, proyectoID: 1}, 
            {id:9, nombre:'Elegir colores', estado: true, proyectoID: 3}, 
            {id:10, nombre:'Elegir hosting', estado: true, proyectoID: 2}, 
        ],
        tareasProyecto: null,
        errorTarea: false, 
        tareaSeleccionada: null,
    }

    // crear el dispatch y state 

    const [state, dispatch ] = useReducer(TareaReducer, initialState);


    // Crear las funciones 

    // obtener las tareas del proyecto 

    const obtenerTareas = proyectoID => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoID
        });
    }

    // AGREGAR TAREA AL PROYECTO SELECCIONADO 

    const agregarTarea = tarea =>{
        tarea.id = uuidv4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        });
    }

    // VALIDAR Y MUESTRA UN ERROR ENC ASO DE QUES EA NECESARIO 

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    }

    // eliminar una tarea 

    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        });
    }
// Cambia el estaado de cada Tarea 
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        });
    }

    // extrae una tarea para edición 
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    // EDITA O MODIFICA UNA TAREA 
    const actualizarTarea = tarea =>{
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        });
    }

    // Elimina la tarea Seleccionada 
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <TareaContext.Provider
        value= {{
            tareas: state.tareas,
            tareasProyecto: state.tareasProyecto,
            errorTarea: state.errorTarea,
            tareaSeleccionada: state.tareaSeleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            cambiarEstadoTarea,
            guardarTareaActual,
            actualizarTarea, 
            limpiarTarea,
        }}>
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;