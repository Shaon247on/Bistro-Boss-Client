import { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const PopularMenu = () => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => {
                const populerItems = data.filter(item => item.category === 'popular')
                setMenu(populerItems)
            })
    }, [])
    return (
        <section>
            <SectionTitle
                heading='From Our menu'
                subHeading='Popular Items'
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    menu.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className='text-center my-6 mb-20'>
                <button className="btn btn-outline border-0 border-b-4">View Full Menu</button>
            </div>

        </section>
    );
};

export default PopularMenu;