import React, {useContext} from 'react';

import CategoriasContext from '../Context/CategoriasContext';

const Formulario = () => {

    const { categorias } = useContext(CategoriasContext);
    console.log(categorias)

    
    return ( 
        <form>
            <fieldset>
                <legend>Buscar bebidas por catergorías o Ingredientes </legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                            name="nombre"
                            className="form-control"
                            type="text"
                            placeholder="Buscar por Ingrediente"
                        />
                </div>
                <div className="col-md-4"> 
                    <select
                        className="form-control"
                        name="categoria"
                    >
                        <option value=""> --- Selecciona Categoría --- </option>
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                        type="Submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;