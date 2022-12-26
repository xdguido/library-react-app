import { store } from '../app/store';
import { setUser } from '../features/auth/authSlice';
export const refreshToken = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
        credentials: 'include'
    });
    store.dispatch(setUser(res.data));
    return res.data.accessToken;
};
