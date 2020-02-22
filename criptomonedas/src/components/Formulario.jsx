import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../Hooks/useMoneda';
import useCrypto from '../Hooks/useCrypto';
import Axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCrypto}) => {

    // STATE DEL LISTADO DE CRYPTO 

    const [ listaCrypto, guardarCryptomoneda ] = useState([]);

    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        {codigo: 'MXN', nombre: 'Peso Mexicano' },
        {codigo: 'EUR', nombre: 'Euros' },
        {codigo: 'GBP', nombre: 'Libras' },
       
    ]

    // USAR CRYPTO
    const [ cryptomoneda, SelectCrypto] = useCrypto('Elige tu Cryptomoneda', '', listaCrypto);

    // USAR USEMONEDA

    const [ moneda, SelectMonedas, actualizarState ] = useMoneda('Elije tu Moneda', '', MONEDAS);


    // EJECUTAR LA LLAMADA A LA API 

    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await Axios.get(url);

            guardarCryptomoneda(resultado.data.Data);
        }

        consultarApi();
    }, []);

const cotizarMoneda = e => {
    e.preventDefault();
    if( moneda === ''|| cryptomoneda === '' ){
        guardarError( true );
        return; 
    }

    guardarError(false);

    guardarMoneda( moneda );
    guardarCrypto(cryptomoneda);
}



    return ( 
        <form onSubmit = {cotizarMoneda}>

            { error ? <Error mensaje="Todos los campos son obligatorios" /> : null }

            <SelectMonedas />

            <SelectCrypto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;