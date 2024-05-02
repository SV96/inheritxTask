import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/Home"
import SignUp from './pages/Signup'
import Login from './pages/Login'


export const router = createBrowserRouter([  
    {
        path: "/sign-up",
        children: [
            {
                index: true,
                element: <SignUp />,
            },
        ],
    },
    {
        path: "/login",
        children: [
            {
                index: true,
                element: <Login />,
            },
        ],
    },
    {
        path: "/",
        children: [
            {
                index: true,
                element: <Login />,
            },
        ],
    },
    {
        path: "/home",
        children: [
            {
                index: true,
                element:  <Home />,
            },
        ],
    },
    
])