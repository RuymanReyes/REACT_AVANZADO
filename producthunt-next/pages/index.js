import React from 'react';
import Layout from '../components/layout/Layout';
import DetallesProducto from '../components/layout/DetalleProductos';
import useProductos from '../Hooks/useProductos';


const Home = () => {

const { productos } = useProductos('creado');   
  return ( 
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {productos.map(producto => (
                <DetallesProducto 
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>

    
  
  );
}
 
export default Home;
