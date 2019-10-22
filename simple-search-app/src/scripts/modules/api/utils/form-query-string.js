export default function (url, params = {}) {
    const keys = Object.keys(params);

    if (keys.length) {
        let queryString = '?';

        keys.forEach(key => {
            queryString = queryString + `${key}=${params[key]}&`;
        });

        url = url + queryString;
    }

    return url;
}