import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

function BookItem(props) {
    const { title, author, slug, user } = props;
    return (
        <Link
            to={`/${user._id}/books/${slug}`}
            className="relative flex flex-col justify-between cursor-pointer bg-white rounded shadow p-3 pr-5 m-2"
        >
            <div className="mb-1">
                <h3 title={title} className="truncate font-serif">
                    {title}
                </h3>
                <h4 title={author} className="truncate text-sm ">
                    {author}
                </h4>
            </div>
            <button className="absolute rounded text-gray-400 hover:bg-gray-100 top-1 right-1">
                <EllipsisVerticalIcon className="h-5 w-5 " aria-hidden="true" />
            </button>
        </Link>
    );
}

BookItem.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    slug: PropTypes.string,
    user: PropTypes.string
};

export default BookItem;
