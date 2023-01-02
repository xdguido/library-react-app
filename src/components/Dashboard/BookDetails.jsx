import { formatDistance } from 'date-fns';
import {
    useGetBookByIdQuery,
    useToggleLikeMutation,
    useToggleSaveMutation
} from '../../api/booksApi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    HeartIcon as HeartOutline,
    BookmarkSquareIcon as BookmarkOutline,
    DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import {
    HeartIcon as HeartSolid,
    BookmarkSquareIcon as BookmarkSolid
} from '@heroicons/react/24/solid';
import profilePicture from '../../assets/profile_picture.webp';

function BookDetails() {
    const { userName, bookSlug } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { data: book, isLoading, isError } = useGetBookByIdQuery({ userName, bookSlug });
    const [createLike] = useToggleLikeMutation();
    const [createSave] = useToggleSaveMutation();

    let bookData = null;
    let likeState = null;
    let saveState = null;
    if (user && book) {
        bookData = { data: { user: user.username, doc: book._id, docModel: 'Book' } };
        likeState = book.likes.some((like) => like.user === user.username);
        saveState = book.saves.some((save) => save.user === user.username);
        // console.log(book);
        // console.log(likeState);
    }

    const handleLike = (data) => {
        if (!user) {
            return alert('Sign in to like a book');
        }
        createLike({ ...data });
    };
    const handleSave = (data) => {
        if (!user) {
            return alert('Sign in to save a book');
        }
        createSave({ ...data });
    };
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ');
    };

    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>Error</span>;
    }
    return (
        <div className="flex justify-center p-4">
            <div className="hidden md:flex flex-col bg-white rounded p-2 mr-1">
                <button
                    title="Like"
                    onClick={() => handleLike({ bookData, likeState })}
                    className={classNames(
                        likeState ? 'text-blue-600 ' : 'text-gray-400 ',
                        'rounded hover:bg-gray-100 hover:text-blue-600 p-1'
                    )}
                >
                    {likeState ? (
                        <HeartSolid className="h-7 w-7" />
                    ) : (
                        <HeartOutline className="h-7 w-7" />
                    )}
                </button>
                <span title="Likes" className="text-gray-400 text-center mb-1">
                    {book.numLikes.toString()}
                </span>
                <button
                    title="Save to bookmark"
                    onClick={() => handleSave({ bookData, saveState })}
                    className={classNames(
                        saveState ? 'text-blue-600 ' : 'text-gray-400 ',
                        'rounded hover:bg-gray-100 hover:text-blue-600 p-1'
                    )}
                >
                    {saveState ? (
                        <BookmarkSolid className="h-7 w-7" />
                    ) : (
                        <BookmarkOutline className="h-7 w-7" />
                    )}
                </button>
                <span className="text-gray-400 text-center mb-1">{book.numSaves.toString()}</span>
                <button
                    title="Search on Google"
                    className="rounded text-gray-400 hover:bg-gray-100 hover:text-blue-600 p-1 mb-1"
                >
                    <DocumentMagnifyingGlassIcon className="h-7 w-7" />
                </button>
            </div>
            <div className="flex flex-col bg-white rounded w-full  xl:w-[1000px] p-2 sm:p-4 sm:px-12">
                <div className="relative text-center px-12 mb-4">
                    <h1 title="Book Title" className="text-2xl font-serif">
                        {book.title}
                    </h1>
                    <h2 title="Book Author" className="">
                        {book.author}
                    </h2>
                </div>
                <p title="Resume" className="">
                    {book.review}
                </p>
            </div>
            <div className="hidden md:block w-56  bg-white rounded p-2 ml-1">
                <div className="flex items-center mb-1">
                    <div className="shrink-0 rounded-full overflow-hidden text-sm bg-slate-100 text-gray-600 mr-2">
                        <img
                            className="h-8 w-8"
                            src={book.user.image_url || profilePicture}
                            referrerPolicy="no-referrer"
                            alt="profile picture"
                        />
                    </div>
                    <span className="block break-all">{book.user.name}</span>
                </div>
                <span className="block text-sm">
                    Posted {formatDistance(new Date(book.createdAt), new Date())} ago.
                </span>
            </div>
        </div>
    );
}

export default BookDetails;
