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
        type: GETTING_ITEMS,
        payload: {
            gettingItems: true,
            gettingItemsSuccess: false,
            error
        }
    }
}

export function getItems(query) {
    return function (dispatch) {
        dispatch(gettingItems());

        fetch(`/api/items?q=${query}`, {method: 'GET'}).then((res) => {
            if (res.status !== 200) {
                dispatch(gettingItemsFailure(new Error(`Bad response from server. Status Code: ${res.status}`)));
            }
            return res.json();
        }).then((response) => {
            dispatch(gettingItemsSuccess(response.items, response.categories, query));
        }, (error) => {
            dispatch(gettingItemsFailure(error));
        });;

    }
}