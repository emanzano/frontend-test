import {
    GETTING_ITEMS,
    GETTING_ITEMS_FAILURE,
    GETTING_ITEMS_SUCCESS,
    GETTING_ITEM,
    GETTING_ITEM_FAILURE,
    GETTING_ITEM_SUCCESS
} from '../actions/items';

const initialState = {
    gettingItems: false,
    gettingItemsSuccess: false,
    itemsList: [],
    categories: [],
    error: {},
    query: '',
    gettingItem: false,
    gettingItemSuccess: false,
    item: null
};

export default function items(state = initialState, action) {

    switch (action.type) {
        case GETTING_ITEMS:
            return {
                ...state,
                gettingItems: action.payload.gettingItems,
                gettingItemsSuccess: action.payload.gettingItemsSuccess
            };

        case GETTING_ITEMS_SUCCESS:
            return {
                ...state,
                gettingItems: action.payload.gettingItems,
                gettingItemsSuccess: action.payload.gettingItemsSuccess,
                itemsList: action.payload.itemsList,
                categories: action.payload.categories,
                query: action.payload.query
            }

        case GETTING_ITEMS_FAILURE:
            return {
                ...state,
                gettingItems: action.payload.gettingItems,
                gettingItemsSuccess: action.payload.gettingItemsSuccess,
                error: action.payload.error
            }

        case GETTING_ITEM:
            return {
                ...state,
                gettingItem: action.payload.gettingItem,
                gettingItemSuccess: action.payload.gettingItemSuccess
            }
        
        case GETTING_ITEM_SUCCESS:
            return {
                ...state,
                gettingItem: action.payload.gettingItem,
                gettingItemSuccess: action.payload.gettingItemSuccess,
                item: action.payload.item,
            }
        
        case GETTING_ITEM_FAILURE:
            return {
                ...state,
                gettingItem: action.payload.gettingItem,
                gettingItemSuccess: action.payload.gettingItemSuccess,
                error: action.payload.error
            }
        
        default:
            return {
                ...state
            }
    }
}