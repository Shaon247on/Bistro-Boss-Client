import FoodCard from "../../../Components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    return (
        <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide className="mb-20">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9'>
                    {
                        items.slice(0,6).map(salad => <FoodCard key={salad._id} item={salad}></FoodCard>)
                    }
                </div>
            </SwiperSlide>
            {
                items.length>6 &&<SwiperSlide className="mb-20">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9'>
                    {
                        items.slice(6,12).map(salad => <FoodCard key={salad._id} item={salad}></FoodCard>)
                    }
                </div>
            </SwiperSlide>
            }
            {
                items.length >12 && <SwiperSlide className="mb-20">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9'>
                    {
                        items.slice(12,18).map(salad => <FoodCard key={salad._id} item={salad}></FoodCard>)
                    }
                </div>
            </SwiperSlide>
            }
        </Swiper>
    );
};

export default OrderTab;