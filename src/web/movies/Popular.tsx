import React, { Fragment, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { TailSpin } from  'react-loader-spinner'
// Import Swiper styles
import 'swiper/css';
import { useRouter } from 'next/router';

export const getter = (url: string) => axios.get(url, {
    
    headers: {
        'X-RapidAPI-Key': '9e89d4ea21msh48f2cd0ac7d903ep132579jsna3c3bc99b2a5',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
}
).then((response) => response.data)

type Props = {}

const Popular = (props: Props) => {
    const url = `https://moviesdatabase.p.rapidapi.com/titles/top_rated_series_250`
    const { data, error, isLoading } = useSWR(url, getter)
    console.log(data)

    const router =  useRouter()
    if (error) {
        <Fragment>
            Error Loading Page
        </Fragment>
    }

    if (isLoading) {
        return (
            <div className='w-full h-full'>
                <p className='font-semibold text-xl my-3'>Popular Movies</p>
                <div className='grid place-items-center'>
                    <TailSpin
                        height="30"
                        width="30"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        />
                </div>
            </div>
        )
    }

    return (
        <Fragment>

        </Fragment>
    )
}

export default Popular