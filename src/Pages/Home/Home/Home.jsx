import Category from "../Category/Category";
import Banner from "../Banner/Banner";
import PopularMenu from "../PopularMenu/PopularMenu";
import Featured from "../Featured/Featured";
import Testimonial from "../Testimonial/Testimonial";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>           
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;    <h1>Hello from home</h1>