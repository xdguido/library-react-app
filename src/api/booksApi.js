import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { fetchWrapper } from './fetchWrapper';

export const booksApi = createApi({
    reducerPath: 'booksApi',
    // baseQuery: fetchWrapper({}),
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Books', 'Collections'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: (userName) => `api/books/${userName}`,
            providesTags: [{ type: 'Books', id: 'List' }]
        }),
        getBookById: builder.query({
            query: ({ userName, bookSlug }) => `api/books/${userName}/${bookSlug}`,
            providesTags: [{ type: 'Books', id: 'Item' }]
        }),
        getCollections: builder.query({
            query: () => '/collections'
        }),
        getCollectionById: builder.query({
            query: (id) => `collections/${id}`
        }),
        getBooksDashboard: builder.query({
            query: (userName) => `api/books/${userName}`,
            providesTags: [{ type: 'Books', id: 'List' }]
        }),
        // getBookByIdDashboard: builder.query({
        //     query: (userName, bookId) => `books/${userName}/${bookId}`,
        //     providesTags: [{ type: 'Books', id: 'Item' }]
        // }),
        // getCollectionsDashboard: builder.query({
        //     query: () => '/collections',
        //     providesTags: [{ type: 'Collections', id: 'List' }]
        // }),
        // getCollectionByIdDashboard: builder.query({
        //     query: (id) => `/collections/${id}`,
        //     providesTags: [{ type: 'Collections', id: 'Item' }]
        // }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: 'api/books/newBook',
                method: 'post',
                body: newBook
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const addResult = dispatch(
                    booksApi.util.updateQueryData('getBooksDashboard', undefined, (draft) => {
                        draft.push(args);
                    })
                );
                try {
                    const success = await queryFulfilled;
                    if (success) {
                        toast.success('Saved.', {
                            position: 'bottom-center'
                        });
                    }
                } catch (err) {
                    toast.error('Error while saving.', {
                        position: 'bottom-center'
                    });
                    addResult.undo();
                    dispatch(booksApi.util.invalidateTags({ type: 'Books', id: 'List' }));
                }
            }
        }),
        addLike: builder.mutation({
            query: (data) => ({
                url: 'api/books/addLike',
                method: 'post',
                // headers: { Authorization: `Bearer ${accessToken}` },
                body: data
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const addResult = dispatch(
                    booksApi.util.updateQueryData('getBookById', undefined, (draft) => {
                        draft.push(args);
                    })
                );
                try {
                    const success = await queryFulfilled;
                    if (success) {
                        toast.success('Saved.', {
                            position: 'bottom-center'
                        });
                    }
                } catch (err) {
                    toast.error('Error while saving.', {
                        position: 'bottom-center'
                    });
                    addResult.undo();
                    dispatch(booksApi.util.invalidateTags({ type: 'Books', id: 'Item' }));
                }
            }
        }),
        editBook: builder.mutation({
            query: (book) => ({
                url: '/books',
                method: 'put',
                body: book
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const editResult = dispatch(
                    booksApi.util.updateQueryData('getBooksDashboard', undefined, (draft) => {
                        Object.assign(draft, args);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    toast.error('Error while saving');
                    editResult.undo();
                    dispatch(booksApi.util.invalidateTags({ type: 'Books', id: 'List' }));
                }
            }
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

export const {
    useGetBooksQuery,
    useGetBooksDashboardQuery,
    useGetBookByIdQuery,
    // useGetBookByIdDashboardQuery,
    useGetCollectionsQuery,
    useGetCollectionByIdQuery,
    // useGetCollectionsDashboardQuery,
    // useGetCollectionByIdDashboardQuery,
    useAddBookMutation,
    useAddLikeMutation
} = booksApi;
