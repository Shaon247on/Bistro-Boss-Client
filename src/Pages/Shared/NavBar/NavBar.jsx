import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaShoppingCart  } from 'react-icons/fa';
import useCart from "../../../Hooks/useCart";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [carts] = useCart()


    const navBar = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Menu</Link></li>
        <li><Link to='/order/salad'>Order Food</Link></li>
    </>

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navBar}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navBar}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        {/* <span>{user?.displayName}</span> */}
                        <Link to='/dashboard/cart'>
                            <button className=" bg-transparent text-white outline-none border-none flex gap-3 items-center">
                                <FaShoppingCart className="text-2xl "></FaShoppingCart>
                                <div className="bg-gray-700 rounded-full text-white -700 -ml-[20px] -mt-[20px] p-[2px] text-sm px-2">{carts.length}</div>
                            </button>
                        </Link>
                        <Link to='/login'><button onClick={handleLogOut} className="btn btn-ghost">Log Out</button></Link>
                    </>
                        :
                        <Link to='/login'><button className="btn btn-ghost">Login</button></Link>


                }
            </div>
        </div>
    );
};

export default NavBar;