import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const Main = () => {
    const currentLocation = useLocation()
    const noHeaderFooter = currentLocation.pathname.includes('login') || currentLocation.pathname.includes('signup')
    return (
        <div>
            {noHeaderFooter ||  <NavBar></NavBar>}
            <Outlet></Outlet>
            {noHeaderFooter ||  <Footer></Footer>}
        </div>
    );
};

export default Main;