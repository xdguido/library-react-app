import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddBookMutation } from '../../api/booksApi';
import CollectionCombobox from './CollectionCombobox';
import GenreCombobox from './GenreCombobox';

function BookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            title: '',
            author: '',
            slug: `test-slug-${Math.round(Math.random() * 10000)}`
        }
    });
    const navigate = useNavigate();
    // const location = useLocation();

    const [createBook, { isLoading }] = useAddBookMutation();
    const [multiple, setMultiple] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    const onSubmit = (data) => {
        createBook({
            data: { ...data, genre: selectedGenre, bookCollection: selectedCollection._id }
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

                    {/* <span className="text-gray-400 text-sm">{'Default: "Unknown author"'}</span> */}
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

                <CollectionCombobox
                    selectedCollection={selectedCollection}
                    setSelectedCollection={(collection) => setSelectedCollection(collection)}
                />

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
                <button
                    className={classNames(
                        isLoading ? 'bg-blue-400' : 'bg-blue-600 ',
                        'flex items-center justify-center rounded-sm text-sm text-white px-5 py-2'
                    )}
                    disabled={isLoading}
                    type="submit"
                    form="bookForm"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default BookForm;
