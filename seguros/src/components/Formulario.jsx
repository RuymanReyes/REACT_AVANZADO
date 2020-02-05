import React, {useState} from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, CalcularMarca, ObtenerPlan} from '../helper';



const Campo = styled.div `
 display:flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label `
    flex: 0 0 100px;
`;

const Select = styled.select `
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;
const Input = styled.input `
  margin: 0  1rem;
`;

const Button = styled.button `
    background-color: #00838F;
    font-size: 1rem;
    width: 100%;
    padding: 1rem;
    color:#fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition:background-color .3s ease;
    margin-top: 2rem;
    &:hover {
        cursor: pointer;
        background-color: #26C6DA;
    }
`;

const Error = styled.div `
    background-color:red;
    color: white;
    padding: 1rem;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {


const [ datos, guardarDatos ] = useState({
    marca:'',
    year:'',
    plan:''
});

const [ error, guardarError ] = useState(false);


const { marca, year, plan } = datos;




// Leer los datos del formulario y colocar el state

const obtenerInformación = e => {
    guardarDatos({
        ...datos,
        [ e.target.name ]: e.target.value 
    })
}

const cotizadorSeguro = e => {
    e.preventDefault();
    if ( marca ===''|| year === ''|| plan === ''){
        guardarError(true);
        return
    }
    guardarError(false)

    // BASE DE PRECIO 
    let resultado = 2000;


    // obtener la diferencia por cada año un 3% menos 

    const diferencia = obtenerDiferenciaYear(year);
    resultado -= ((diferencia * 3) * resultado )/100;
    console.log(resultado);

    console.log(diferencia);


    // americano 15%, asiatico 5%, Europeo 30%

    resultado = CalcularMarca(marca) * resultado;
    console.log(resultado);

    // basico aumenta un 20 % 
    // completo aumenta un 50%
   const incrementoPlan = ObtenerPlan(plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2)
  
    guardarCargando(true);

    setTimeout(() => {
        guardarCargando(false)
        guardarResumen({
                cotizacion: resultado,
                datos
            })
    }, 3000);

    
    // total 

   
}

  return (  

      <form
        onSubmit={cotizadorSeguro}
      >
          { error ? <Error>Todos los campos son Obligatorios </Error> : null }

          <Campo>
          <Label>Marca</Label>
              <Select
                  name="marca"
                  value={marca}
                  onChange={obtenerInformación}
              >
                  <option value="">--Seleccione--</option>
                  <option value="americano">Américano</option>
                  <option value="europeo">Europeo</option>
                  <option value="asiatico">Asiático</option>
                  
              </Select>
          </Campo>
          <Campo>
              <Label>Año</Label>
              <Select
                  name="year"
                  value={year}
                  onChange={obtenerInformación}
              >
              <option value="">-- Seleccione --</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
              </Select>
          </Campo>

          <Campo>
              <Label>Plan</Label>
              <Input
                  type="radio"
                  name="plan"
                  value="basico"
                  check= {plan === 'basico'}
                  onChange={obtenerInformación}
              /> Básico
              <Input
                  type="radio"
                  name="plan"
                  value="completo"
                  check={ plan === 'completo'}
                  onChange={obtenerInformación}
              /> Completo
          </Campo>

          <Button type="submit">Cotizar</Button>
      </form>
  );
}

export default Formulario;