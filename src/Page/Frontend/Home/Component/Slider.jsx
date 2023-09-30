import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css';
import slider_1 from '../../../../assets/slider-1.jpg';
import slider_2 from '../../../../assets/slider-2.jpg';
import slider_3 from '../../../../assets/slider-3.jpg';
import slider_4 from '../../../../assets/slider-4.jpg';
import slider_5 from '../../../../assets/slider-5.jpg';
import slider_6 from '../../../../assets/slider-6.jpg';


const Slider = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper mt-4 rounded-xl z-0"
            >
                <SwiperSlide>
                    <img src={slider_1} alt="image-1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider_2} alt="image-2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider_3} alt="image-3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider_4} alt="image-4" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider_5} alt="image-5" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider_6} alt="image-6" />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;