import { createStore, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
// Reducers imports
import items from './store/reducers/items';

const configureStore = () => {
    const logger = createLogger();

    const store = createStore(combineReducers({
        items
    }), applyMiddleware(
        logger,
        thunk
    ));
    
    return store;
};

export default configureStore;