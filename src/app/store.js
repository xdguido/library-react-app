import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { booksApi } from '../api/booksApi';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [booksApi.reducerPath]: booksApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware)
});

setupListeners(store.dispatch);
