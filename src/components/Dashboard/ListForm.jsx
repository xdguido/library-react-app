import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useAddListMutation,
    useEditListMutation,
    useGetListByIdPrivateQuery
} from '../../api/booksApi';

function ListForm({ edit }) {
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
            review: '',
            slug: `test-slug-${Math.round(Math.random() * 10000)}`
        }
    });

    const { data: list } = useGetListByIdPrivateQuery(listSlug, { skip: !edit });

    useEffect(() => {
        if (list) {
            const { title, review, slug } = list;
            reset({
                title,
                review,
                slug
            });
        }
    }, [list]);

    const navigate = useNavigate();
    const [createList] = useAddListMutation();
    const [editList] = useEditListMutation();
    // const [multiple, setMultiple] = useState(false);

    const onSubmit = (data) => {
        if (edit) {
            editList({ data: { ...data } });
            return navigate('/lists');
        }
        createList({
            data: { ...data }
        });
        navigate('/lists');
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
                        List Title
                    </label>
                    <input
                        className={classNames(
                            errors.title ? 'border-red-600' : 'border-gray-300',
                            'rounded-sm h-9'
                        )}
                        {...register('title', { required: 'Please enter a list title' })}
                        name="title"
                        id="title"
                        type="text"
                        placeholder="New list title here..."
                    />
                    {errors.title && (
                        <span className="text-red-600 text-sm">{errors.title.message}</span>
                    )}
                </div>
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
                        placeholder="Write a list review..."
                        rows="4"
                    ></textarea>
                    {errors.review && (
                        <span className="text-red-600 text-sm">{errors.review.message}</span>
                    )}
                </div>
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

ListForm.propTypes = {
    edit: PropTypes.bool
};

export default ListForm;
