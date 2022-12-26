import { store } from '../app/store';
import { refreshToken } from './refreshToken';

export const fetchWrapper = async (endpoint, { body, ...customConfig } = {}) => {
    const token = store.getState().auth.user.accessToken;
    const headers = { 'content-type': 'application/json' };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const config = {
        // method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        }
    };
    if (body) {
        config.body = JSON.stringify(body);
    }

    return window
        .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 403) {
                // get new accessToken
                await refreshToken();
                return;
            }
            if (response.ok) {
                return { data: response.json() };
            } else {
                const errorMessage = await response.text();
                Promise.reject(errorMessage);
                return { error: errorMessage };
                // return Promise.reject(new Error({ error: errorMessage }));
            }
        });
};
