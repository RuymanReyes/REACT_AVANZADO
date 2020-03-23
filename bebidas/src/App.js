import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
//import ListaRecetas from './components/ListaRecetas';

import CategoriasProvider from './Context/CategoriasContext';
//import RecetasProvider from './context/RecetasContext';
//import ModalProvider from './context/ModalContext';

function App() {
  return (
      <CategoriasProvider>
        
              <Header />

              <div className="container mt-5">
                  <div className="row">
                      <Formulario />
                  </div>

                  
              </div>

         
      </CategoriasProvider>
  );
}

export default App;