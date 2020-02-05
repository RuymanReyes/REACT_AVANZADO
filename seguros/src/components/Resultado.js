import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled';


const Mensaje = styled.p `
    background-color:rgb(127, 224, 237);
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
`;

const Texto = styled.p`
    color: #00838F;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin:0;
`;

const ResultadoCotizacion = styled.div `
    text-align:center;
    padding:.5rem;
    border: 1px, solid, #26C6DA;
    background-color: rgb(127,224,237);
    margin-top: 1rem;
    position: relative;
`;

const Resultado = ({cotizacion}) => {
    return (  
        (cotizacion === 0 ) 
            ? <Mensaje>Elige marca, año y tipo de seguro </Mensaje> 
            : (
                <ResultadoCotizacion>
                    <TransitionGroup
                        component= 'p'
                        className="resultado"
                    >
                        <CSSTransition
                            key={cotizacion }
                            classNames="resultado"
                            timeout={{enter:500, exit:500}}
                        >
                            <Texto>el total es: $ {cotizacion} </Texto>
                        </CSSTransition>
                    </TransitionGroup>
                </ResultadoCotizacion>
            )
        

    );
}
 
export default Resultado;