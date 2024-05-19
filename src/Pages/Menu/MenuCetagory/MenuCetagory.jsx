import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const  MenuCetagory = ({ items, title, coverImg }) => {
    return (
        <div className="pt-8">
            {
                title && <Cover img={coverImg} coverTitle={title}></Cover>

            }
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-16'>
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="text-center my-16">
                <Link to={`/order/${title}`}><button className="btn btn-outline border-0 border-b-4">Order Now</button></Link>
            </div>
        </div>
    );
};

export default MenuCetagory;