import { combineReducers } from "redux";

import search from './search';
import searchHistory from './search-history';

export default combineReducers({
    search,
    searchHistory
});