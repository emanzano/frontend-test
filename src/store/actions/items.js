export const GETTING_ITEMS = "GETTING_ITEMS";
export const GETTING_ITEMS_SUCCESS = "GETTING_ITEMS_SUCCESS";
export const GETTING_ITEMS_FAILURE = "GETTING_ITEMS_FAILURE";

function gettingItems() {
    return {
        type: GETTING_ITEMS,
        payload: {
            gettingItems: true,
            gettingItemsSuccess: false
        }
    }
}

function gettingItemsSuccess(itemsList, categories, query) {
    return {
        type: GETTING_ITEMS_SUCCESS,
        payload: {
            gettingItems: false,
            gettingItemsSuccess: true,
            itemsList,
            categories,
            query
        }
    }
}

function gettingItemsFailure(error) {
    return {
        type: GETTING_ITEMS_FAILURE,
        payload: {
            gettingItems: false,
            gettingItemsSuccess: false,
            error
        }
    }
}

export function getItems(query) {
    return function getItemsAction(dispatch) {
        dispatch(gettingItems());

        return fetch(`/api/items?q=${query}`, {method: 'GET'})
        .then(res => res.json())
        .then((json) => {
            dispatch(gettingItemsSuccess(json.items, json.categories, query));
        }, (error) => {
            dispatch(gettingItemsFailure(error));
        });
    }
}

export const GETTING_ITEM = "GETTING_ITEM";
export const GETTING_ITEM_SUCCESS = "GETTING_ITEM_SUCCESS";
export const GETTING_ITEM_FAILURE = "GETTING_ITEM_FAILURE";

function gettingItem() {
    return {
        type: GETTING_ITEM,
        payload: {
            gettingItem: true,
            gettingItemSuccess: false
        }
    }
}

function gettingItemSuccess(item) {
    return {
        type: GETTING_ITEM_SUCCESS,
        payload: {
            gettingItem: false,
            gettingItemSuccess: true,
            item
        }
    }
}

function gettingItemFailure(error) {
    return {
        type: GETTING_ITEM_FAILURE,
        payload: {
            gettingItem: false,
            gettingItemSuccess: false,
            error
        }
    }
}

export function getItem(idquery) {
    return function getItemAction(dispatch) {
        dispatch(gettingItem());

        return fetch(`/api/items/${id}`, {method: 'GET'})
        .then(res => res.json() )
        .then((json) => {
            dispatch(gettingItemSuccess(json.item));
        }, (error) => {
            dispatch(gettingItemFailure(error));
        });;

    }
}