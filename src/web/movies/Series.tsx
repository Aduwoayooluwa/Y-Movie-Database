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

const url ='https://moviesdatabase.p.rapidapi.com/titles/series'

const Series = (props: Props) => {
    const { data, error } = useSWR(url, getter)
    console.log(data)

    return (
        <Fragment>
            
        </Fragment>
    )
}

export default Series