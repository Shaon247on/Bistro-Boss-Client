import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../LayOut/Main";
import Menu from "../Pages/Menu/Menu";
import OrderFood from "../Pages/OrderFood/OrderFood/OrderFood";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../LayOut/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
          path:'/menu',
          element: <Menu></Menu>
        },
        {
          path:'/order/:category',
          element: <OrderFood></OrderFood>
        },
        {
          path:'/login',
          element: <Login></Login>
        },
        {
          path:'/signup',
          element: <SignUp></SignUp>
        }
      ]
    },
    {
      path:'/dashboard',
      element: <Dashboard></Dashboard>,
      children:[
        {
          path:'/dashboard/cart',
          element:<Cart></Cart>
        }
      ]
    }
  ]);

  export default router