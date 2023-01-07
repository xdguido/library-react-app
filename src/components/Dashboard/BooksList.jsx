import { useGetBooksQuery } from '../../api/booksApi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BookItem from './BookItem';

function BooksList() {
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading, isError } = useGetBooksQuery(user.username);

    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>Error</span>;
    }
    return (
        <>
            {data.length === 0 ? (
                <div className="flex flex-col bg-white rounded shadow px-5 py-8">
                    <span className="text-center mb-6">{"You haven't post anything yet."}</span>
                    <div className="text-center">
                        <Link to="/books/new" className="p-2 rounded-md bg-blue-600 text-white">
                            Add Book
                        </Link>
                        <span className="text-gray-800 px-2">or</span>
                        <Link
                            to="/collections/new"
                            className="p-2 rounded-md bg-blue-600 text-white"
                        >
                            Create a Collection
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-center mb-4">
                        <h1 className="flex-1 font-semibold pl-1">Books</h1>
                        <Link
                            to="/books/new"
                            className="py-1 px-2 ml-4 rounded-md bg-blue-600 text-white"
                        >
                            + Add Book
                        </Link>
                    </div>
                    {/* <div className="grid gap-2 grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"> */}
                    <div className="">
                        {data.map((book) => (
                            <BookItem key={book._id} {...book} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default BooksList;
