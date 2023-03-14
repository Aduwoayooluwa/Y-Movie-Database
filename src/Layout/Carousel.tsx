import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay'

import Image from 'next/image';
type Props = {}

const Carousel = (props: Props) => {

    return (
        <main>
            <div className="hidden md:flex">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                >       
                <SwiperSlide className='w-full hidden md:flex'><img loading='lazy' src={'carousel.jpg'} alt='Carousel-1'/></SwiperSlide>

                </Swiper>
            </div>

            <div className="flex md:hidden">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                >       
                <SwiperSlide className='w-full hidden md:flex'><img loading='lazy' src={'p_carousel.jpg'} alt='Carousel-1'/></SwiperSlide>
                <SwiperSlide className='w-full flex md:hidden'><img loading='lazy' src={'p_carousel_2.avif'} alt='Carousel-2'/></SwiperSlide>

                </Swiper>
            </div>
           
        </main>
    )
}

export default Carousel