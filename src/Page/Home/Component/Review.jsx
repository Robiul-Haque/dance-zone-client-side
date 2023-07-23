import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Review = () => {
    return (
        <div className='mt-10 mb-48 mx-96' data-aos="zoom-in">
            <h2 className='text-4xl font-semibold text-center mb-10'>Customer Review</h2>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='text-center'>
                        <img src={'https://i.ibb.co/GHcs0HY/download.jpg'} alt="" className='mx-auto w-20 h-20 rounded-full' />
                        <div className='mt-4'>
                            <h4 className='font-semibold'>Sarah</h4>
                            <div className='flex justify-center gap-2 my-3'>
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star-half-empty.png" alt="star-half-empty" />
                                <img width="18" height="18" src="https://img.icons8.com/fluency-systems-regular/48/1A1A1A/star--v1.png" alt="star--v1" />
                            </div>
                            <p className='w-96 mx-auto'>Excellent dance class! The instructor made learning fun with cool moves and catchy music. I improved my coordination and confidence. Can not wait for the next session!</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-center'>
                        <img src={'https://i.ibb.co/R7brtcb/download-1.jpg'} alt="" className='mx-auto w-20 h-20 rounded-full' />
                        <div className='mt-3'>
                            <h4 className='font-semibold'>John</h4>
                            <div className='flex justify-center gap-2 my-3'>
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/fluency-systems-regular/48/1A1A1A/star--v1.png" alt="star--v1" />
                            </div>
                            <p className='w-96 mx-auto'>I loved the dance class! The teacher was patient and helped us master each step. I feel more flexible and graceful. It is a great way to stay active and happy.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-center'>
                        <img src={'https://i.ibb.co/C1VzM1p/lisa-eadicicco-profile-photo.webp'} alt="" className='mx-auto w-20 h-20 rounded-full' />
                        <div className='mt-3'>
                            <h4 className='font-semibold'>Sarah</h4>
                            <div className='flex justify-center gap-2 my-3'>
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star-half-empty.png" alt="star-half-empty" />
                            </div>
                            <p className='w-96 mx-auto'>The dance class was amazing! We learned various styles and performed as a team. I enjoyed the creative choreography and made new friends. Definitely recommend it!</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-center'>
                        <img src={'https://i.ibb.co/99hpxgM/images-1.jpg'} alt="" className='mx-auto w-20 h-20 rounded-full' />
                        <div className='mt-3'>
                            <h4 className='font-semibold'>David</h4>
                            <div className='flex justify-center gap-2 my-3'>
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                            </div>
                            <p className='w-96 mx-auto'>The dance class was fantastic! The teacher encouraged us to express ourselves through dance. It is a stress-reliever and boosts self-esteem. Joining was the best decision ever!</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-center'>
                        <img src={'https://i.ibb.co/SxRLVz6/Emily-You-Tube.webp'} alt="" className='mx-auto w-20 h-20 rounded-full' />
                        <div className='mt-3'>
                            <h4 className='font-semibold'>Emily</h4>
                            <div className='flex justify-center gap-2 my-3'>
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                            </div>
                            <p className='w-96 mx-auto'>I had a blast in the dance class! We had energetic routines and even learned some popular dance trends. The atmosphere was friendly, and I had a great time dancing with classmates.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-center'>
                        <img src={'https://i.ibb.co/w6tNpmn/istockphoto-1200677760-612x612.jpg'} alt="" className='mx-auto w-20 h-20 rounded-full' />
                        <div className='mt-3'>
                            <h4 className='font-semibold'>Mark</h4>
                            <div className='flex justify-center gap-2 my-3'>
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/1A1A1A/star--v1.png" alt="star--v1" />
                                <img width="18" height="18" src="https://img.icons8.com/fluency-systems-regular/48/1A1A1A/star--v1.png" alt="star--v1" />
                            </div>
                            <p className='w-96 mx-auto'>This dance class was so much fun! The instructor taught us awesome routines that challenged us in a good way. I feel more coordinated and motivated to keep dancing!</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div >
    );
};

export default Review;