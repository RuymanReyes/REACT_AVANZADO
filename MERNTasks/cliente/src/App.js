import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/auth/Login';
import NuevaCuenta from './Components/auth/NuevaCuenta';
import Proyectos from './Components/proyectos/Proyectos';
import RutaPrivada from './Components/rutas/RutaPrivada';
import tokenAuth from './config/token';
import AlertaState from './Context/alerta/alertaState';
import AuthState from './Context/autentificacion/authState';
import ProyectoState from './Context/proyectos/ProyectoState';
import TareaState from './Context/Tarea/TareaState';





// REvisar que tenemos un token 

const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
              <RutaPrivada exact path="/proyectos" component={Proyectos} />
            </Switch>
           </Router> 
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>

  );
}

export default App;
