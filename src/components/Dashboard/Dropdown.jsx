import { Fragment, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { NavLink, useLocation } from 'react-router-dom';

const navBar = [
    { id: 1, name: 'Books', href: '/', disabled: false },
    { id: 2, name: 'Lists', href: '/lists', disabled: false },
    { id: 3, name: 'Achievements', href: '/achievements', disabled: true },
    { id: 4, name: 'Follows', href: '/follows', disabled: true }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Dropdown() {
    const [selectedLink, setSelectedLink] = useState(navBar[0].name);
    const [isShowing, setIsShowing] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const selectedLink = navBar.find((link) => link.href === currentPath);
        if (selectedLink) {
            setSelectedLink(selectedLink.name);
        }
    }, [location]);

    return (
        <button
            className="md:hidden flex relative justify-between w-full cursor-default rounded-md bg-white mb-3 pl-3 pr-9 py-2 text-left shadow focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 sm:text-sm"
            onClick={() => setIsShowing((isShowing) => !isShowing)}
        >
            <span className="truncate mr-2">{selectedLink}</span>
            <span className="rounded-md bg-gray-200 px-1">22</span>

            <span className="absolute pointer-events-none inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>

            <Transition
                as={Fragment}
                show={isShowing}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <ul className="absolute left-0 top-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {navBar.map((item) => (
                        <li key={item.id}>
                            <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                    classNames(
                                        isActive ? 'bg-blue-100 text-blue-700' : '',
                                        item.disabled ? 'pointer-events-none text-gray-500' : '',
                                        'flex relative justify-between px-3 py-2'
                                    )
                                }
                                aria-current={({ isActive }) => (isActive ? item.name : undefined)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className="flex">
                                            <span
                                                className={classNames(
                                                    isActive ? 'flex' : 'hidden',
                                                    'pr-1 items-center text-blue-600'
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            {item.name}
                                        </div>
                                        <span className="rounded-md bg-gray-200 text-gray-800 px-1">
                                            0
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </Transition>
        </button>
    );
}

export default Dropdown;
