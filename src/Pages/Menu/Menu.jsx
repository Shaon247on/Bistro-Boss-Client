
import { Helmet } from 'react-helmet-async'
import Cover from '../Shared/Cover/Cover';
import menuImg from '../../assets/menu/banner3.jpg';
import dessertImg from '../../assets/menu/dessert-bg.jpeg';
import soupImg from '../../assets/menu/soup-bg.jpg';
import pizzaImg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import useMenu from '../../Hooks/UseMenu';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import MenuCetagory from './MenuCetagory/MenuCetagory';
const Menu = () => {
    const [menu] = useMenu()
    const desserts = menu.filter(item=> item.category === 'dessert')
    const soups = menu.filter(item=> item.category === 'soup')
    const pizzas = menu.filter(item=> item.category === 'pizza')
    const salads = menu.filter(item=> item.category === 'salad')
    const offered = menu.filter(item=> item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} coverTitle='our menu'></Cover>
            {/* main cover */}
            <SectionTitle
            subHeading="don't miss"
            heading="Today's offer"
            ></SectionTitle>
            {/* offered menu items */}
            <MenuCetagory items={offered}></MenuCetagory>
            {/* dessert menu items */}
            <MenuCetagory items={desserts} title="dessert" coverImg={dessertImg}></MenuCetagory>
            {/* soups menu items */}
            <MenuCetagory items={soups} title="soup" coverImg={soupImg}></MenuCetagory>
            {/* pizzas menu items */}
            <MenuCetagory items={pizzas} title="pizza" coverImg={pizzaImg}></MenuCetagory>
            {/* salads menu items */}
            <MenuCetagory items={salads} title="salad" coverImg={saladImg}></MenuCetagory>

        </div>
    );
};

export default Menu;