import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import PageLayout from './components/PageLayout';
import RequireAuth from './components/RequireAuth';
import RemindMeLogin from './components/RemindMeLogin';
import BooksList from './components/Dashboard/BooksList';

const Register = lazy(() => import('./pages/Auth/Register'));
const Recovery = lazy(() => import('./pages/Auth/Recovery'));
const OAuthHandler = lazy(() => import('./pages/Auth/OAuthHandler'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <>
            <Router>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Routes>
                        <Route path="/" element={<PageLayout />}>
                            {/* public routes  */}
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="recovery/:token" element={<Recovery />} />
                            <Route path="oauth/:provider" element={<OAuthHandler />} />
                            <Route path="*" element={<NotFound />} />
                            {/* private routes  */}
                            <Route element={<RemindMeLogin />}>
                                <Route element={<RequireAuth />}>
                                    <Route element={<Dashboard />}>
                                        <Route index element={<BooksList />} />
                                        <Route path="/collections" element={<BooksList />} />
                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
            {/* <ToastContainer /> */}
        </>
    );
}

export default App;
