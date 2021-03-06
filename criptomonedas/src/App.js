import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
 import imagen from './cryptomonedas.png';
 import Formulario from './components/Formulario';
 import Cotizacion from './components/Cotizacion';
// import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {


  // CREAR STATE 
  const [ moneda, guardarMoneda ]= useState('');

  const [ cryptomoneda, guardarCrypto ] = useState('');

  const [ resultado, guardarResultado ]= useState({})

  useEffect( ()=>{

    const cotizarCryptomoneda = async () => {

      if( moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
  
      const resultado = await axios.get(url);
      console.log(resultado.data.DISPLAY[cryptomoneda][moneda]);

      guardarResultado(resultado.data.DISPLAY[cryptomoneda][moneda]);

    }

    cotizarCryptomoneda();



  }, [moneda, cryptomoneda]);

return (
  <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
          <Heading>Cotiza Cryptomonedas al Instante</Heading>
          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCrypto={guardarCrypto}
          />

          <Cotizacion 
            resultado = {resultado}
          />
      </div>
  </Contenedor>
);
}

export default App;