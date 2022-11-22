import { useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import Dropdown from '../components/Dashboard/Dropdown';

const navBar = [
    { id: 1, name: 'Books', href: '/', disabled: false },
    { id: 2, name: 'Collections', href: '/collections', disabled: false },
    { id: 3, name: 'Achievements', href: '/asd', disabled: true },
    { id: 4, name: 'Follows', href: '/asd', disabled: true }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Dashboard() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex flex-auto justify-center p-4">
            <div className="flex flex-col w-full xl:w-[1200px]">
                <header className="rounded-md py-2 mb-4">
                    <h1 className="text-2xl">
                        Welcome <span className="font-semibold">{user && user.name}</span>
                    </h1>
                </header>
                <Dropdown />
                <div className="flex">
                    <nav className="hidden md:block w-60 mr-3">
                        <ul className="list-none">
                            {navBar.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.href}
                                        className={({ isActive }) =>
                                            classNames(
                                                isActive ? 'bg-white' : '',
                                                item.disabled
                                                    ? 'pointer-events-none text-gray-500'
                                                    : '',
                                                'flex justify-between rounded-md hover:bg-white px-2 py-1 mb-1'
                                            )
                                        }
                                        aria-current={({ isActive }) =>
                                            isActive ? 'page' : undefined
                                        }
                                    >
                                        {item.name}
                                        <span className="rounded-md bg-gray-200 text-gray-800 px-1">
                                            0
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div
                        id="user-dashboard"
                        className="flex flex-col flex-1 bg-white rounded-md shadow px-5 py-8"
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
