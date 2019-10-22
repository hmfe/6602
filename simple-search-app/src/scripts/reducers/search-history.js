import {
    ADD_ITEM,
    REMOVE_ITEM,
    CLEAR
} from "../actions/search-history";

const initialState = {
    items: []
};

const SearchStoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case REMOVE_ITEM:
            const items = state.items.filter(item => item.createdDate !== action.id);

            return {
                ...state,
                items: [...items]
            };
        case CLEAR:
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
};

export default SearchStoryReducer;