import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalendar, FaHome, FaJediOrder, FaList, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart()
    return (
        <div className="flex justify-between">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-5">
                    <li>
                        <NavLink to='/dashboard/userHome'><FaHome></FaHome> User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart> My Cart ({cart.length} )</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar> Reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/review'><FaAd></FaAd> Review</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/bookings'><FaList></FaList> My Bookings</NavLink>
                    </li>
                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to='/menu'><IoMenu></IoMenu> Menu</NavLink></li>
                    <li><NavLink to='/order/salad'><FaShoppingBag></FaShoppingBag> Order Food</NavLink></li>
                </ul>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;