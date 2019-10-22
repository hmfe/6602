import formQueryString from './utils/form-query-string';

export const get = (url, params = {}) => {
    return fetch(formQueryString(url, params), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => response.json());
};