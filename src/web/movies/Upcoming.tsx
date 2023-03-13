import React, { Fragment, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

type Props = {}

const getter = (url: string) => axios.get(url, {
    headers: {
        'X-RapidAPI-Key': '9e89d4ea21msh48f2cd0ac7d903ep132579jsna3c3bc99b2a5',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
}
    
    ).then((response) => response.data)

const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming'

const Upcoming = (props: Props) => {
    const { data, error } = useSWR(url, getter)
    console.log(data)

    return (
        <Fragment>
            <main className='px-2'>
                <div>
                    <p className='font-semibold text-xl my-3'>Upcoming Movies</p>
                </div>

                <Swiper
                spaceBetween={20}
                slidesPerView={2}
                >
                    {
                    data !== undefined &&
                    (data.results.map((result: any, index: number) => {
                        return (
                            <SwiperSlide key={index}>
                                <div>
                                    <div>
                                        {
                                            result.primaryImage !== null ? (<>
                                                <Image className='rounded-md' width={result.primaryImage.height} height={result.primaryImage.height} src={result.primaryImage.url} alt={'image'}/>
                                            </>) : (<div className='bg-slate-300 h-[120px] w-full grid place-items-center'>
                                                <p className='font-medium'>Default</p>
                                            </div>)
                                        }
                                    </div>
                                    <p className='font-semibold text-center'>{result.titleText.text}</p>
                                </div>
                                
                            </SwiperSlide>
                        )
                    }))
                }
                ...
                </Swiper>
            </main>
        </Fragment>
    )
}

export default Upcoming