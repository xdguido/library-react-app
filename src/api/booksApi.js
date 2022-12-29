import { createApi } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: baseQueryWithReauth,
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
            query: (userName) => `api/collections/${userName}`,
            providesTags: [{ type: 'Collections', id: 'List' }]
        }),
        getCollectionById: builder.query({
            query: ({ userName, collectionSlug }) =>
                `api/collections/${userName}/${collectionSlug}`,
            providesTags: [{ type: 'Books', id: 'Item' }]
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
                url: 'api/books/addBook',
                method: 'post',
                body: newBook
            }),
            async onQueryStarted(newBook, { dispatch, queryFulfilled }) {
                const addResult = dispatch(
                    booksApi.util.updateQueryData(
                        'getBooksDashboard',
                        newBook.data.user,
                        (draft) => {
                            draft.push(newBook.data);
                        }
                    )
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
    useGetCollectionsQuery,
    useGetCollectionByIdQuery,
    useAddBookMutation,
    useAddLikeMutation
    // useGetBookByIdDashboardQuery,
    // useGetCollectionsDashboardQuery,
    // useGetCollectionByIdDashboardQuery,
} = booksApi;
