import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';
import Loader from 'react-loader-spinner';


import { FirebaseContext } from '../../firebase';

const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;
const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    `;



const Producto = () => {

    // state del componente 
    const [producto, guardarProducto] = useState({});
    const [error, guardarError ] = useState(false);
    const [ comentario, guardarComentario ] = useState({});
    const [ consultarDB, guardarConsultarDB ] = useState(true);

    // routing para obtener el id actual

    const router = useRouter(); 
    const { query: {id} } = router;

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado} = producto;

    // ADMINISTRAR Y VALIDAR VOTOS 

    const votarProducto = () => {
        if( !usuario ){
            return router.push('/login');
        }
        // obtener votos 
        const nuevoTotal = votos + 1;

        // verificar si ha votado
        if(haVotado.includes(usuario.uid) ) return;

        // guardar el id del usuario que ha votado 

        const nuevoHaVotado= [... haVotado, usuario.uid];

        // ACTUALIZAR VOTOS BD 
        firebase.db.collection('productos').doc(id).update({ 
            votos: nuevoTotal,
            haVotado: nuevoHaVotado
        });

        // actualizar state 
        guardarProducto({
            ...producto, 
            votos: nuevoTotal
        })

        guardarConsultarDB(true)

    }


    // contect de Firebase 

    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if (id && consultarDB){
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(producto.exists) {
                    guardarProducto(producto.data());
                    guardarConsultarDB(false);
                } else {
                   guardarError( true );
                   guardarConsultarDB(false);
                }
            }
            obtenerProducto();
        }
    }, [id]);

    if( Object.keys(producto).lenght === 0 ) return 'Cargando...';

   // Funciones para crear comentarios
   const comentarioChange = e => {
    guardarComentario({
        ...comentario,
        [e.target.name] : e.target.value
    })
}

// Identifica si el comentario es del creador del producto
const esCreador = id => {
    if(creador.id === id) {
        return true;
    }
}

const agregarComentario = e => {
    e.preventDefault();

    if(!usuario) {
        return router.push('/login')
    }

    // información extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    // Tomar copia de comentarios y agregarlos al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    // Actualizar la BD
    firebase.db.collection('productos').doc(id).update({
        comentarios: nuevosComentarios
    })

    // Actualizar el state
    guardarProducto({
        ...producto,
        comentarios: nuevosComentarios
    })

    guardarConsultarDB(true); // hay un COMENTARIO, por lo tanto consultar a la BD
}
    
    return ( 
       <Layout>
          { !creado || !creador || !empresa || !comentarios  ? 
                  <Loader css={css`
                  text-align: center;
                  margin-top: 5rem;
              `}
                  type="Oval"
                  color= 'var(--naranja)'
                  height={100}
                  width={100}
                  timeout={5000} //3 secs
          
              /> :
              (
                <>
                { error && <Error404 /> }
                <div className="contenedor">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}>{nombre} </h1>
                </div>
                <ContenedorProducto>
                    <div>
                     <p>Publicado hace: { formatDistanceToNow( new Date(creado), {locale: es} )} </p>

                     <p>Publicado por: {creador.nombre} de: {empresa}</p>
                    <img src={urlimagen} />
                    <p>{descripcion}</p>

                    { usuario && (
                                    <>
                                    <h2>Agrega tu comentario</h2>
                                    <form
                                        onSubmit={agregarComentario}
                                    >
                                        <Campo>
                                            <input
                                                type="text"
                                                name="mensaje"
                                                onChange={comentarioChange}
                                            />
                                        </Campo>
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar Comentario"
                                        />
                                    </form>
                                    </>
                                ) }

                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comentarios</h2>

                                {comentarios.length === 0 ? "Aún no hay comentarios" : (
                                    <ul>
                                        {comentarios.map((comentario, i) => (
                                            <li 
                                                key={`${comentario.usuarioId}-${i}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comentario.mensaje}</p>
                                                <p>Escrito por: 
                                                    <span
                                                        css={css`
                                                            font-weight:bold;
                                                        `}
                                                    >
                                                    {''} {comentario.usuarioNombre}
                                                    </span>
                                                </p>
                                                { esCreador( comentario.usuarioId ) && <CreadorProducto>Es Creador</CreadorProducto> }
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                
                            </div>

                    <aside>
                        <Boton
                            target='_blank'
                            bgColor='true'
                            href={url}
                        >Visitar URL</Boton>
                            <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >
                                    <p css={css`
                                        text-align: center;
                                    `}>{votos} Votos</p>

                                     {usuario && (
                                     <Boton
                                        onClick={votarProducto}
                                     > Votar </Boton>
                                     )}
                                </div>
                    </aside>
                </ContenedorProducto>
            </>

              )
          }
       </Layout>
     );
}
 
export default Producto;