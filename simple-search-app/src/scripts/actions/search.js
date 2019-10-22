import { get } from '../modules/api';
import { movieServiceApiKey, searchMovieServiceUrl } from '../modules/api/config';
import transformResponse from './utils/transform-response';

export const TOGGLE_ACTIVE = '@search/TOGGLE_ACTIVE';
export const SET_QUERY_STRING = '@search/SET_QUERY_STRING';
export const TOGGLE_FETCHING = '@search/TOGGLE_FETCHING';
export const SET_ITEMS = '@search/SET_ITEMS';

export const toggleActive = flag => ({
    type: TOGGLE_ACTIVE,
    payload: flag
});

export const setQueryString = val => ({
    type: SET_QUERY_STRING,
    payload: val
});

export const toggleFetching = flag => ({
    type: TOGGLE_FETCHING,
    payload: flag
});

export const setItems = items => ({
    type: SET_ITEMS,
    payload: items
});

export const makeSearch = queryString => {
    return (dispatch, getState) => {
        get(searchMovieServiceUrl, {
            'api_key': movieServiceApiKey,
            'page': 1,
            'include_adult': false,
            'query': queryString,
            'language': 'en-US'
        })
        .then(res => {
            const state = getState();

            if (state.search.queryString) {
                dispatch(setItems(transformResponse(res.results)));
            }

            dispatch(toggleFetching(false));
        })
        .catch(() => {
            dispatch(toggleFetching(false));
        });
    }
};