import {
    TOGGLE_FETCHING,
    TOGGLE_ACTIVE,
    SET_QUERY_STRING,
    SET_ITEMS
} from '../actions/search';

const initialState = {
    queryString: '',
    isFetching: false,
    isActive: false,
    items: []
};

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        case TOGGLE_ACTIVE:
            return {
                ...state,
                isActive: action.payload
            };
        case SET_QUERY_STRING:
            return {
                ...state,
                queryString: action.payload
            };
        case SET_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
};

export default SearchReducer;