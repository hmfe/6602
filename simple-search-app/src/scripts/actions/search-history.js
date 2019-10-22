export const ADD_ITEM = '@search-history/ADD_ITEM';
export const REMOVE_ITEM = '@search-history/REMOVE_ITEM';
export const CLEAR = '@search-history/CLEAR';

export const addItem = item => ({
    type: ADD_ITEM,
    payload: item
});

export const removeItem = id => ({
    type: REMOVE_ITEM,
    id
});

export const clear = () => ({
    type: CLEAR
});