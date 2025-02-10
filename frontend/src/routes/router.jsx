import {createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';


const router = createBrowserRouter ([
        {
            path:'/',
            element:<Dashboard />
        },
        {
            path:'/login',
            element:<Login />
        },
        {
            path:'/signup',
            element:<Signup/>
        },
        {
            path:'*',
            element:<Login/>
        }

])

export default router;