import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { setUser } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user.accessToken;
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});
export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
        const refresh = await baseQuery('/auth/refresh', api, {
            credentials: 'include',
            ...extraOptions
        });
        if (refresh.data) {
            api.dispatch(setUser(refresh.data));
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
