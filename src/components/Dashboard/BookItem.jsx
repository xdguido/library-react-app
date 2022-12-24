import PropTypes from 'prop-types';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

function BookItem({ title, author, resume }) {
    return (
        <div className="relative flex flex-col justify-between cursor-default bg-white rounded shadow h-28 p-3 pr-5 m-1">
            <div className="mb-1">
                <h3 title={title} className="truncate font-serif">
                    {title}
                </h3>
                <h4 title={author} className="truncate text-sm ">
                    {author}
                </h4>
            </div>
            <p className="text-clip overflow-hidden text-sm text-gray-400">{resume}</p>
            <button className="absolute rounded text-gray-400 hover:bg-gray-100 top-1 right-1">
                <EllipsisVerticalIcon className="h-5 w-5 " aria-hidden="true" />
            </button>
        </div>
    );
}

BookItem.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    resume: PropTypes.string
};

export default BookItem;
