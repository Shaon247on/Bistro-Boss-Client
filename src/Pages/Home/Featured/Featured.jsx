import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredimg from '../../../assets/home/featured.jpg';
import "./Featured.css"

const Featured = () => {
    return (
        <div className="featured-item text-white bg-fixed">
            <div className="bg-slate-500/40 w-full pt-6 py-28 h-full">
                <SectionTitle
                    subHeading='check it out'
                    heading='Featured Item'
                ></SectionTitle>
                <div className="md:flex items-center justify-center  py-20 px-36">
                    <div>
                        <img src={featuredimg} alt="" />
                    </div>
                    <div className="md:ml-8">
                        <p>Aug 20th, 2019</p>
                        <p className="uppercase">Where I can get some</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos saepe, molestiae reprehenderit illo eligendi eveniet hic consequatur non aperiam deserunt architecto delectus fuga in magni quis, dolor, sequi ea sed!</p>
                        <button className="btn btn-outline border-0 border-b-4">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;