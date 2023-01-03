import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

function ListItem(props) {
    const { title, slug } = props;
    return (
        <Link
            to={`/lists/${slug}`}
            className="relative flex flex-col justify-between cursor-pointer bg-white rounded shadow p-3 pr-5 m-2"
        >
            <div className="mb-1">
                <h3 title={title} className="truncate font-serif">
                    {title}
                </h3>
            </div>
            <button className="absolute rounded text-gray-400 hover:bg-gray-100 top-1 right-1">
                <EllipsisVerticalIcon className="h-5 w-5 " aria-hidden="true" />
            </button>
        </Link>
    );
}

ListItem.propTypes = {
    title: PropTypes.string,
    slug: PropTypes.string,
    user: PropTypes.string
};

export default ListItem;
