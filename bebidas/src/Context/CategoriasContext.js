import React, {createContext, useState, useEffect } from 'react';
import axios from 'axios';


// CREAR CONTEXT

export const CategoriasContext = createContext();

// PROVIDER EN DDE SE ENCUENTRALAS  FUCNIONES Y EL STATE 

    const CategoriasProvider = (props) => {
        // CREAR EL STATE DEL CONTEXT
        const [categorias, guardarCategorias ] = useState([]);
        console.log(categorias)

        // ejecutar el llamado a la API 

        useEffect(() => {

            const obtenerCategorias = async () => {
                const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

                const categorias = await axios.get(url);
                
                guardarCategorias(categorias.data.drinks)
 

            }
            obtenerCategorias(); 

        }, []);

        return (
            <CategoriasContext.Provider
                value = {{
                    categorias
                }}
            >
                    { props.children }
            </CategoriasContext.Provider>
        )

    }

export default CategoriasProvider;