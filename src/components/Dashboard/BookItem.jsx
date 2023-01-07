import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function BookItem(props) {
    const { title, author, slug, user } = props;
    return (
        <div className="relative flex justify-between cursor-default bg-white rounded shadow p-3 pr-5 m-2">
            <Link to={`/${user._id}/books/${slug}`} className="cursor-pointer mb-1">
                <h3 title={title} className=" font-serif">
                    {title}
                </h3>
                <h4 title={author} className=" text-sm ">
                    {author}
                </h4>
            </Link>

            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to={`/books/edit/${slug}`}
                                        className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <PencilIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Edit
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <TrashIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Delete
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

BookItem.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    slug: PropTypes.string,
    review: PropTypes.string,
    genre: PropTypes.string,
    bookList: PropTypes.string,
    user: PropTypes.object
};

export default BookItem;
