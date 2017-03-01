import {
    GETTING_ITEMS,
    GETTING_ITEMS_FAILURE,
    GETTING_ITEMS_SUCCESS
} from '../actions/items';

const initialState = {
    gettingItems: false,
    gettingItemsSuccess: false,
    itemsList: [],
    categories: [],
    error: {},
    query: ''
};

export default function items(state = initialState, action) {
    switch (action.type) {
        case GETTING_ITEMS:
            return {
                ... state,
                gettingItems: action.payload.gettingItems,
                gettingItemsSuccess: action.payload.gettingItemsSuccess
            };
        case GETTING_ITEMS_SUCCESS:
            return {
                ... state,
                gettingItems: action.payload.gettingItems,
                gettingItemsSuccess: action.payload.gettingItemsSuccess,
                itemsList: action.payload.itemsList,
                categories: action.payload.categories,
                query: action.payload.query
            }
        case GETTING_ITEMS_FAILURE:
            return {
                ... state,
                gettingItems: action.payload.gettingItems,
                gettingItemsSuccess: action.payload.gettingItemsSuccess,
                error: action.payload.error
            }

        default:
            return {
                ... state
            }
    }
}