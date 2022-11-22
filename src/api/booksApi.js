import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books'
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: '/books',
                method: 'post',
                body: newBook
            }),
            invalidatesTags: ['Books']
        }),
        editBook: builder.mutation({
            query: (book) => ({
                url: '/books',
                method: 'put',
                body: book
            }),
            invalidatesTags: ['Books']
        }),
        removeBook: builder.mutation({
            query: (book) => ({
                url: '/books',
                method: 'delete',
                body: book
            }),
            invalidatesTags: ['Books']
        })
    })
});

export const { useGetBooksQuery, useAddBookMutation } = booksApi;
