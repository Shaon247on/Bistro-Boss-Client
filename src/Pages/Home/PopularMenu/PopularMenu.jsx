import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../Hooks/UseMenu';

const PopularMenu = () => {  

    const [menu] = useMenu()
    const popular = menu.filter(item=> item.category === 'popular')
    return (
        <section>
            <SectionTitle
                heading='From Our menu'
                subHeading='Popular Items'
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className='text-center my-6 mb-20'>
                <button className="btn btn-outline border-0 border-b-4">View Full Menu</button>
            </div>

        </section>
    );
};

export default PopularMenu;