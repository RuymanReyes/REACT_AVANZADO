import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

import propTypes from 'prop-types';

function App() {

  // LOCALSTORAGE 

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //ARREGLO DE CITAS
  const [citas, guardarCitas ] = useState(citasIniciales);

  // USEEFECT para realizar ciertas operaciones cuando el State cambia 

  useEffect( ()=> {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);


  // modificación de CITA 

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // FUNCION QUE ELIMINA UNA CITA POR SU ID 

    const eliminarCita = (id) => {
      const nuevasCitas = citas.filter(cita => cita.id !==id);
      guardarCitas(nuevasCitas)
    }

    // Mensaje Condicional
    const titulo = citas.length === 0 ? ' No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map( cita => (
              <Cita
                key={cita.id}
                cita= {cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
   
  );
}

// PROPTYPES 
Formulario.propTypes = {
  crearCita: propTypes.func.isRequired
}


export default App;
