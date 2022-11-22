import { useGetBooksQuery, booksApi } from '../../api/booksApi';
import { useSelector } from 'react-redux';

function BooksList() {
    const { data, isLoading, isError } = useGetBooksQuery();
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
                <>
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
                </>
            ) : (
                data.map((book) => <span key={book._id}>{book.name}</span>)
            )}
        </>
    );
}

export default BooksList;
