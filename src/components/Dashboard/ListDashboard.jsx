import { useGetListByIdQuery } from '../../api/booksApi';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import BookItem from './BookItem';

function ListDashboard() {
    const { listSlug } = useParams();
    const { user } = useSelector((state) => state.auth);
    const {
        data: list,
        isLoading,
        isError
    } = useGetListByIdQuery({
        userName: user.username,
        listSlug
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
                <h1 className="flex-1 font-semibold pl-1">{list.title}</h1>
                <Link to="/books/new" className=" py-1 px-2 ml-4 rounded-md bg-blue-600 text-white">
                    + Add Book
                </Link>
            </div>
            {list.books.length === 0 ? (
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
                        {list.books.map((book) => (
                            <BookItem key={book._id} {...book} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default ListDashboard;
