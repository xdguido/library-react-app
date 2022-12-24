import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
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
            author: ''
        }
    });
    const navigate = useNavigate();
    // const location = useLocation();

    const [createBook, { isLoading }] = useAddBookMutation();
    const [multiple, setMultiple] = useState(false);

    const onSubmit = (data) => {
        createBook(data);
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
                className="flex flex-col bg-white rounded w-full  xl:w-[1000px] p-2 sm:p-4 sm:px-12"
            >
                <div className={classNames(errors.title ? 'mb-1' : 'mb-3', 'flex flex-col')}>
                    <label className="mb-1" htmlFor="title">
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
                    <label className="mb-1" htmlFor="author">
                        Book Author
                    </label>
                    <input
                        className={classNames(
                            errors.author ? 'border-red-600' : 'border-gray-300',
                            'rounded-sm h-9'
                        )}
                        {...register('author', { required: 'Please enter a book author' })}
                        name="author"
                        id="author"
                        type="text"
                        placeholder="New book author here..."
                    />
                    {errors.author && (
                        <span className="text-red-600 text-sm">{errors.author.message}</span>
                    )}
                </div>

                <GenreCombobox {...register('genre')} />

                <CollectionCombobox {...register('collection')} />

                <div className={classNames(errors.review ? 'mb-1' : 'mb-3', 'flex flex-col')}>
                    <label className="mb-1" htmlFor="review">
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
                        placeholder="Book review here..."
                        rows="6"
                    ></textarea>
                    {errors.review && (
                        <span className="text-red-600 text-sm">{errors.review.message}</span>
                    )}
                </div>
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
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default BookForm;
