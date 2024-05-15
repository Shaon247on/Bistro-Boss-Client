import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import image1 from '../../../assets/home/slide1.jpg';
import image2 from '../../../assets/home/slide2.jpg';
import image3 from '../../../assets/home/slide3.jpg';
import image4 from '../../../assets/home/slide4.jpg';
import image5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle subHeading='Fron 11:00 am to 10:00 pm' heading='Order Online'></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-36"
            >
                <SwiperSlide className=''>
                    <img src={image1} alt="" />
                    <h3 className='text-4xl text-center -mt-20 text-white uppercase mb-10'>Salad</h3>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img src={image2} alt="" />
                    <h3 className='text-4xl text-center -mt-20 text-white uppercase mb-10'>Pizza</h3>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img src={image3} alt="" />
                    <h3 className='text-4xl text-center -mt-20 text-white uppercase mb-10'>Soup</h3>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img src={image4} alt="" />
                    <h3 className='text-4xl text-center -mt-20 text-white uppercase mb-10'>Desserts</h3>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img src={image5} alt="" />
                    <h3 className='text-4xl text-center -mt-20 text-white uppercase mb-10'>Salad</h3>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;