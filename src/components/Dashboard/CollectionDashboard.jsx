import { useGetCollectionByIdQuery } from '../../api/booksApi';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import BookItem from './BookItem';

function CollectionDashboard() {
    const { collectionSlug } = useParams();
    const { user } = useSelector((state) => state.auth);
    const {
        data: collection,
        isLoading,
        isError
    } = useGetCollectionByIdQuery({
        userName: user.username,
        collectionSlug
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>Error</span>;
    }
    return (
        <>
            <div className="flex items-center mb-4">
                <h1 className="font-semibold pl-1">{collection.title}</h1>
                <Link to="/books/new" className="py-1 px-2 ml-4 rounded-md bg-blue-600 text-white">
                    + Add Book
                </Link>
            </div>
            {collection.books.length === 0 ? (
                <div className="flex flex-col bg-white rounded shadow px-5 py-8">
                    <span className="text-center mb-6">{"You haven't post anything yet."}</span>
                    <div className="text-center">
                        <Link to="/books/new" className="p-2 rounded-md bg-blue-600 text-white">
                            Add Book
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <div className="">
                        {collection.books.map((book) => (
                            <BookItem key={book._id} {...book} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default CollectionDashboard;
