import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../LayOut/Main";
import Menu from "../Pages/Menu/Menu";
import OrderFood from "../Pages/OrderFood/OrderFood/OrderFood";

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
        }
      ]
    },
  ]);

  export default router