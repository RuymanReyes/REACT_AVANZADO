import React from 'react';

const Errors = ({mensaje}) => {
    return ( 
        <p className="alert alert-danger error">{mensaje}</p>
     );
}
 
export default Errors;