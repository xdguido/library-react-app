import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Auth/Login';
import PageLayout from './components/PageLayout';
import RequireAuth from './components/RequireAuth';
import RemindMeLogin from './components/RemindMeLogin';
import Dashboard from './pages/Dashboard';
import CollectionDashboard from './components/Dashboard/CollectionDashboard';
import BooksList from './components/Dashboard/BooksList';
import CollectionList from './components/Dashboard/CollectionList';
import BookDetails from './components/Main/BookDetails';
import BookForm from './components/Dashboard/BookForm';

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
                            {/* <Route path=":username/books" element={<PublicBooks />} /> */}
                            {/* <Route path=":username/collections" element={<PublicCollections />} /> */}
                            <Route path=":userName/books/:bookSlug" element={<BookDetails />} />
                            {/* <Route
                                path=":userName/collections/:collectionSlug"
                                element={<CollectionDetails />}
                            /> */}
                            {/* private routes  */}
                            <Route element={<RemindMeLogin />}>
                                <Route element={<RequireAuth />}>
                                    <Route element={<Dashboard />}>
                                        <Route index element={<BooksList />} />
                                        <Route path="collections" element={<CollectionList />} />
                                        <Route
                                            path="collections/:collectionSlug"
                                            element={<CollectionDashboard />}
                                        />
                                    </Route>
                                    {/* <Route path="settings" element={<Settings />} /> */}
                                    <Route path="books/new" element={<BookForm />} />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
            <Toaster />
        </>
    );
}

export default App;
