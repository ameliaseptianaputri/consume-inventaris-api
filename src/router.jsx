import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Stuff from './pages/Stuff/Index';
import StuffCreate from './pages/Stuff/Create';
import StuffEdit from './pages/Stuff/Edit';
import Dashboard from './pages/Dashboard';
import Inbound from './pages/Inbound/Index';
import StuffTrash from './pages/Stuff/Trash';
import StuffShow from './pages/Stuff/Show';
import InboundCreate from './pages/Inbound/Create';
import InboundShow from './pages/Inbound/Show';
import InboundTrash from './pages/Inbound/Trash';
import LendingRestoration from './pages/Lending/Restoration';
import Lending from './pages/Lending/Index';
import LendingShow from './pages/Lending/Show';
import LendingCreate from './pages/Lending/Create';
import User from './pages/User/Index';
import UserShow from './pages/User/Show';
import UserEdit from './pages/User/Edit';
import UserTrash from './pages/User/Trash';
import UserCreate from './pages/User/Create';

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> },
    { path: '/stuff/trash', element: <StuffTrash /> },
    { path: '/stuff/:id/show', element: <StuffShow /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/inbound', element: <Inbound /> },
    { path: '/inbound/create', element: <InboundCreate /> },
    { path: '/inbound/:id/show', element: <InboundShow /> },
    { path: '/inbound/trash', element: <InboundTrash /> },
    { path: '/lending', element: <Lending /> },
    { path: '/lending/:id/restoration', element: <LendingRestoration /> },
    { path: '/lending/:id/show', element: <LendingShow /> },
    { path: '/lending/create', element: <LendingCreate /> },
    { path: '/user', element: <User /> },
    { path: '/user/:id/show', element: <UserShow /> },
    { path: '/user/:id/edit', element: <UserEdit /> },
    { path: '/user/trash', element: <UserTrash /> },
    { path: '/user/create', element: <UserCreate /> },
]);
