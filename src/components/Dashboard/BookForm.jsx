import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useAddBookMutation,
    useEditBookMutation,
    useGetBookByIdPrivateQuery,
    useGetListByIdPrivateQuery
} from '../../api/booksApi';
import ListCombobox from './ListCombobox';
import GenreCombobox from './GenreCombobox';

function BookForm({ edit, fromList }) {
    // use when editing a book.
    const { bookSlug } = useParams();

    // use when adding a book to a list.
    const { listSlug } = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            title: '',
            author: '',
            review: '',
            slug: `test-slug-${Math.round(Math.random() * 10000)}`
        }
    });

    const { data: book } = useGetBookByIdPrivateQuery(bookSlug, { skip: !edit });

    const { data: list } = useGetListByIdPrivateQuery(listSlug, { skip: !fromList });

    useEffect(() => {
        if (book) {
            const { title, author, review, slug, genre, bookList } = book;
            reset({
                title,
                author,
                review,
                slug
            });
            setSelectedGenre(genre);
            setSelectedList(bookList);
        }
    }, [book]);

    useEffect(() => {
        if (list) {
            setSelectedList(list);
        }
    }, [list]);

    const navigate = useNavigate();
    const [createBook] = useAddBookMutation();
    const [editBook] = useEditBookMutation();
    const [multiple, setMultiple] = useState(false);
    const [selectedList, setSelectedList] = useState(listSlug || {});
    const [selectedGenre, setSelectedGenre] = useState('None');

    const onSubmit = (data) => {
        if (edit) {
            editBook({ data: { ...data, genre: selectedGenre, bookList: selectedList._id } });
            return navigate('/');
        }
        createBook({
            data: { ...data, genre: selectedGenre, bookList: selectedList._id }
        });
        if (!multiple) {
            navigate('/');
        }
    };
    const onChange = () => {
        setMultiple((prev) => !prev);
    };
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ');
    };

    // if (isLoading) {
    //     return <span>Loading...</span>;
    // }
    // if (isError) {
    //     return <span>Error</span>;
    // }

    return (
        <div className="flex justify-center p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col bg-white rounded w-full  xl:w-[800px] p-2 sm:p-4 sm:px-12"
                id="bookForm"
            >
                <div className={classNames(errors.title ? 'mb-1' : 'mb-3', 'flex flex-col')}>
                    <label className="sr-only mb-1" htmlFor="title">
                        Book Title
                    </label>
                    <input
                        className={classNames(
                            errors.title ? 'border-red-600' : 'border-gray-300',
                            'rounded-sm h-9'
                        )}
                        {...register('title', { required: 'Please enter a book title' })}
                        name="title"
                        id="title"
                        type="text"
                        placeholder="New book title here..."
                    />
                    {errors.title && (
                        <span className="text-red-600 text-sm">{errors.title.message}</span>
                    )}
                </div>
                <div className={classNames(errors.author ? 'mb-1' : 'mb-3', 'flex flex-col')}>
                    <label className="sr-only mb-1" htmlFor="author">
                        Book Author
                    </label>
                    <input
                        className={classNames(
                            errors.author ? 'border-red-600' : 'border-gray-300',
                            'rounded-sm h-9'
                        )}
                        {...register('author')}
                        name="author"
                        id="author"
                        type="text"
                        placeholder="New book author here..."
                    />
                </div>

                <GenreCombobox
                    selectedGenre={selectedGenre}
                    setSelectedGenre={(genre) => setSelectedGenre(genre)}
                />

                <div className={classNames(errors.review ? 'mb-1' : 'mb-3', 'flex flex-col')}>
                    <label className="sr-only mb-1" htmlFor="review">
                        Review
                    </label>
                    <textarea
                        className={classNames(
                            errors.review ? 'border-red-600' : 'border-gray-300',
                            'rounded-sm'
                        )}
                        {...register('review')}
                        name="review"
                        id="review"
                        placeholder="Write a book review..."
                        rows="4"
                    ></textarea>
                    {errors.review && (
                        <span className="text-red-600 text-sm">{errors.review.message}</span>
                    )}
                </div>

                <ListCombobox
                    selectedList={selectedList}
                    setSelectedList={(collection) => setSelectedList(collection)}
                />

                {!edit && (
                    <label className="mb-3 text-sm" htmlFor="multiple">
                        <input
                            className="mr-2"
                            id="multiple"
                            type="checkbox"
                            checked={multiple}
                            onChange={onChange}
                        />
                        Add multiple books
                    </label>
                )}
                <button
                    className="bg-blue-600 flex items-center justify-center rounded-sm text-sm text-white px-5 py-2"
                    type="submit"
                    form="bookForm"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

BookForm.propTypes = {
    edit: PropTypes.bool,
    fromList: PropTypes.bool
};

export default BookForm;
