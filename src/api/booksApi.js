import { createApi } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Books', 'Lists'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: (userName) => `/books/${userName}`,
            providesTags: [{ type: 'Books', id: 'List' }]
        }),
        getBookById: builder.query({
            query: ({ userName, bookSlug }) => `/books/${userName}/${bookSlug}`,
            providesTags: [{ type: 'Books', id: 'Item' }]
        }),
        getLists: builder.query({
            query: (userName) => `/lists/${userName}`,
            providesTags: [{ type: 'Lists', id: 'List' }]
        }),
        getListById: builder.query({
            query: ({ userName, listSlug }) => `/lists/${userName}/${listSlug}`,
            providesTags: [{ type: 'Lists', id: 'Item' }]
        }),

        getBookByIdDashboard: builder.query({
            query: (bookSlug) => `/books/editBook/getOne/${bookSlug}`,
            providesTags: [{ type: 'Books', id: 'Item' }]
        }),

        addBook: builder.mutation({
            query: (newBook) => ({
                url: '/books/addBook',
                method: 'post',
                body: newBook
            }),
            async onQueryStarted(newBook, { dispatch, queryFulfilled }) {
                const addResult = dispatch(
                    booksApi.util.updateQueryData('getBooks', newBook.data.user, (draft) => {
                        draft.push(newBook.data);
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
        addList: builder.mutation({
            query: (newList) => ({
                url: '/lists/addBook',
                method: 'post',
                body: newList
            }),
            async onQueryStarted(newList, { dispatch, queryFulfilled }) {
                const addResult = dispatch(
                    booksApi.util.updateQueryData('getLists', newList.data.user, (draft) => {
                        draft.push(newList.data);
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
                    dispatch(booksApi.util.invalidateTags({ type: 'Lists', id: 'List' }));
                }
            }
        }),
        toggleLike: builder.mutation({
            query: ({ bookData, likeState }) => ({
                url: `/books/toggleLike/${likeState}`,
                method: 'post',
                body: bookData
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const success = await queryFulfilled;
                    if (success && !args.likeState) {
                        toast.success('Saved.', {
                            position: 'bottom-center'
                        });
                    }
                    dispatch(booksApi.util.invalidateTags([{ type: 'Books', id: 'Item' }]));
                } catch (err) {
                    toast.error('Error.', {
                        position: 'bottom-center'
                    });
                }
            }
        }),
        toggleSave: builder.mutation({
            query: ({ bookData, saveState }) => ({
                url: `/books/toggleSave/${saveState}`,
                method: 'post',
                body: bookData
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const success = await queryFulfilled;
                    if (success && !args.saveState) {
                        toast.success('Saved.', {
                            position: 'bottom-center'
                        });
                    }
                    dispatch(booksApi.util.invalidateTags([{ type: 'Books', id: 'Item' }]));
                } catch (err) {
                    toast.error('Error.', {
                        position: 'bottom-center'
                    });
                }
            }
        }),

        editBook: builder.mutation({
            query: (bookData) => ({
                url: '/books/editBook',
                method: 'put',
                body: bookData
            }),
            async onQueryStarted(bookData, { dispatch, queryFulfilled }) {
                const addResult = dispatch(
                    booksApi.util.updateQueryData('getBooks', bookData.data.user, (draft) => {
                        draft.push(bookData.data);
                    })
                );
                try {
                    const success = await queryFulfilled;
                    if (success) {
                        toast.success('Saved.', {
                            position: 'bottom-center'
                        });
                    }
                } catch {
                    toast.error('Error while saving');
                    addResult.undo();
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
    useGetBookByIdQuery,
    useGetListsQuery,
    useGetListByIdQuery,
    useAddBookMutation,
    useAddListMutation,
    useEditBookMutation,
    useToggleLikeMutation,
    useToggleSaveMutation,
    useGetBookByIdDashboardQuery,
    useLazyGetBookByIdDashboardQuery
} = booksApi;
