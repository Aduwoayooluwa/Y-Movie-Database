import React, { Fragment, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { TailSpin } from 'react-loader-spinner'
// Import Swiper styles
import 'swiper/css';
import { useRouter } from 'next/router';
import { getter } from '@/utils/fetcher';

type Props = {}


const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming'

const Upcoming = (props: Props) => {
    const { data, error, isLoading } = useSWR(url, getter)
    console.log(data)

    const router = useRouter()

    if (error) {
        return (
            <>
            <p>Error Loading ...</p>
            </>
        )
    }

    if (isLoading) {
        return (
            <div className='w-full h-full'>
                <p className='font-semibold text-xl my-3'>Upcoming Movies</p>
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
            <main className='px-2 bg-red-200'>
                <div>
                    <p className='font-semibold text-xl my-3'>Upcoming Movies</p>
                </div>

                <div className='flex lg:hidden'>
                <Swiper
                spaceBetween={20}
                slidesPerView={2}
                >
                    {
                    data !== undefined &&
                    (data.results.map((result: any, index: number) => {
                        return (
                            <SwiperSlide key={index} onClick={() => {
                                    router.push(`/movies/${result.id}`)
                            }}>
                                <div>
                                    <div>
                                        {
                                            result.primaryImage !== null ? (<>
                                                <Image className='rounded-md w-[300px] h-[300px] lg:w-[200px] lg:h-[300px]' width={150} height={200} src={result.primaryImage.url} alt={'image'}/>
                                            </>) : (<div className='bg-slate-300 h-[300px] w-full grid place-items-center'>
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

                </div>
                {/* desktop */}
                <div className='hidden lg:flex'>
                <Swiper
                spaceBetween={20}
                slidesPerView={4}
                >
                    {
                    data !== undefined &&
                    (data.results.map((result: any, index: number) => {
                        return (
                            <SwiperSlide key={index} onClick={() => {
                                    router.push(`/movies/${result.id}`)
                            }}>
                                <div>
                                    <div>
                                        {
                                            result.primaryImage !== null ? (<>
                                                <Image className='rounded-md w-[300px] h-[300px]' width={100} height={300} src={result.primaryImage.url} alt={'image'}/>
                                            </>) : (<div className='bg-slate-300 h-[300px] w-full grid place-items-center'>
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

                </div>
            </main>
        </Fragment>
    )
}

export default Upcoming