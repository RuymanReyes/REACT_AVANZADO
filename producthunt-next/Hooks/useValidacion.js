import React, { useState, useEffect } from 'react';

const useValidación = (stateInicial, validar, fn ) => {

    const [valores, guardarValores ] = useState(stateInicial);
    const [ errores, guardarErrores ] = useState({});
    const [ submitForm, guardarSubmitForm ] = useState(false);

    useEffect(() =>{
        if(submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores){
                fn(); // función que se ejectuta en el componente
            }
            guardarSubmitForm(false);
        }
    }, [errores])

    // función que se ejecuta conforme el usuario va escribiendo 

     const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    // funcicion que se ejecuta cuando el usuario hace submit 

    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }

    // cuando se realiza el evento de blur 

    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        submitForm,
        handleSubmit,
        handleChange,
        handleBlur
    };
}
 
export default useValidación;