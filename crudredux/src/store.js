import { createStore, applyMiddleware, compose }   from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),

    typeof window === 'object' && 
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? 
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f 

    // esta parte es lo necesario para cargar la extensión redux dev tools, 
    // si no lo tiene instalada seguirá funcionando 
     
    )
);

export default store;
