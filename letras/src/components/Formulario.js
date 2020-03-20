import React, {useState, } from 'react';

const Formulario = ({guardarBusquedaLetra}) => {

const [ busqueda, guardarBusqueda ] = useState({
    artista: '',
    cancion: '' 
});
const [error, guardarError ] = useState(false);

const {artista, cancion } = busqueda;

// FUNCION A CADA INPUT PARA LEER SU CONTENIDO 

const actualizarState = e => {
    guardarBusqueda({
        ...busqueda, 
        [e.target.name] : e.target.value
    })
}

// CONSULTAR APIS 

const buscarInformacion = e => {
    e.preventDefault();

    if(artista.trim() === '' || cancion.toString() === '' ){
        guardarError(true)
        return;
    }
    guardarError(false);
    // PASAR AL COMPONENTE PRINCIPAL 


    guardarBusquedaLetra(busqueda);
}



    return ( 
        <div className=" bg-info">
            <div className=" container">
                 { error ? <p className=" alert alert-danger text-center p-2">Todos los Campos son Obligatorios</p> : null } 
                <div className="row">
                   
                    <form className="col card text-white bg-transparent mb-5 pt5 pb-2" onSubmit={buscarInformacion} >
                        <fieldset>
                            <legend className="text-center">Buscador Letras Canciones </legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input
                                            type='text'
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre del Artista"
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input
                                            type='text'
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre de la canción"
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Buscar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Formulario;