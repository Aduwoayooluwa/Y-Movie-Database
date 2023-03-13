import React, { Fragment, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { TailSpin } from  'react-loader-spinner'
// Import Swiper styles
import 'swiper/css';
import { useRouter } from 'next/router';

const getter = (url) => axios.get(url, {
    headers: {
        'X-RapidAPI-Key': '9e89d4ea21msh48f2cd0ac7d903ep132579jsna3c3bc99b2a5',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
}
).then((response) => response.data)    


const url = 'https://moviesdatabase.p.rapidapi.com/titles?page=4'

const Index = () => {
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
                <p className='font-semibold text-xl my-3'>Ancient Movies recommendations</p>
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
            <main className='px-2'>
                <div>
                    <p className='font-semibold text-xl my-3'>Ancient Movies recommendations</p>
                </div>

                <Swiper
                spaceBetween={20}
                slidesPerView={2}
                >
                    {
                    data !== undefined &&
                    (data.results.map((result, index) => {
                        return (
                            <SwiperSlide key={index} onClick={() => {
                                router.push(`/movies/${result.id}`)
                        }}>
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

export default Index