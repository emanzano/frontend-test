import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'

// Reducers imports
import items from './store/reducers/items';

const configureStore = () => {

    const store = createStore(items, 
    compose(
        applyMiddleware(
        thunkMiddleware ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
    
    return store;
};

export default configureStore;