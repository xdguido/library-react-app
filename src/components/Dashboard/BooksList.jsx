import { useGetBooksDashboardQuery, booksApi } from '../../api/booksApi';
import { useSelector } from 'react-redux';
import BookItem from './BookItem';

function BooksList() {
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading, isError } = useGetBooksDashboardQuery(user.username);
    // const {} = useSelector(booksApi.endpoints.getBooks.select());

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
                        <button className="p-2 rounded-md bg-blue-600 text-white">
                            Add a Book
                        </button>
                        <span className="text-gray-800 px-2">or</span>
                        <button className="p-2 rounded-md bg-blue-600 text-white">
                            Create a Collection
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="font-semibold mb-2 pl-1">Books</h1>
                    <div className="grid gap-2 grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {data.map((book) => (
                            <BookItem
                                key={book._id}
                                title={book.title}
                                author={book.author}
                                review={book.review}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default BooksList;
