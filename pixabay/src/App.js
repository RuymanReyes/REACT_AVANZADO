import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagen from './components/ListadoImagen';


function App() {

const [ busqueda, guardarBusqueda ] = useState('');
const [ imagenes, guardarImagenes ] = useState([]);
const [ paginaActual, guardarPaginaActual ] = useState(1);
const [ totalPaginas, guardarTotalPaginas ] = useState(10);


useEffect(()=> {
  const consultarApi = async () => {
    if(busqueda === '') {
      return;
    }

    const imagenesPorPagina = 30;
    const key = '10789485-f7119328ae530103b52f994ad';
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
  

    const respuesta = await fetch (url);
    const resultado = await respuesta.json();

    guardarImagenes( resultado.hits );

    // CALCULAR EL TOTAL DE PAGINAS 

    const calcularTotalPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina );
    guardarTotalPaginas(calcularTotalPaginas);

    // MOVER LA PANTALLA HACIA ARRIBA 

    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({behavior:'smooth'});
  }

  consultarApi();

}, [busqueda, paginaActual]);

// DEFINIR LA PAGINA ANTERIOR 

const paginaAnterior = () => {
  const nuevaPaginaActual = paginaActual -1;

  if( nuevaPaginaActual === 0 )return;

  guardarPaginaActual(nuevaPaginaActual);
}

// DEFINIR LA PAGINA SIGUIENTE

const paginaSiguiente = () => {
  const nuevaPaginaActual = paginaActual +1;

if( nuevaPaginaActual > totalPaginas ) return;
  guardarPaginaActual(nuevaPaginaActual);
}


  return (
    <div className="container">
      <div className="jumbotron">
         <p className="lead text-center">Buscador de imagenes</p>
         <Formulario 
          guardarBusqueda= {guardarBusqueda}
         />
      </div>

      <div className=" row justify-content-center">
        <ListadoImagen 
          imagenes={imagenes}
        />

      { (paginaActual === 1 ) ? null  : (
        <button
          type='button'
          className='btn btn-info mr-1'
          onClick={paginaAnterior}
          >
          Anterior &laquo;  
          </button>
      ) }
        
        {(paginaActual === totalPaginas ) ? null : (
          <button
          type='button'
          className='btn btn-info'
          onClick={paginaSiguiente}
          >
          Siguiente &raquo;  
          </button>
        )}

      </div>
    </div>
  );
}

export default App;
