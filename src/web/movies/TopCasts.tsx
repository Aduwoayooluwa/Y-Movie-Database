import React, { Fragment, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { TailSpin } from 'react-loader-spinner'

// Import Swiper styles
import 'swiper/css';

type Props = {
    id: any
}

const getter = (url: string) => axios.get(url, {
    headers: {
        'X-RapidAPI-Key': '9e89d4ea21msh48f2cd0ac7d903ep132579jsna3c3bc99b2a5',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
}
).then((response) => response.data)    



const Casts = (props: Props) => {
    const url = `https://moviesdatabase.p.rapidapi.com/titles/${props.id}/main_actors`

    const { data, error, isLoading } = useSWR(url, getter)
    console.log(data)

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

    if (data?.results?.length === 0) {
        return (<main className='mt-10 text-center shadow-md border border-yellow-600 w-full h-full p-4'>
            <p>No data for this movies&apos; Actors</p>
        </main>)
    }
    
    return (
        <Fragment>
            <Swiper
                spaceBetween={20}
                slidesPerView={2}
                >
                    {
                    data !== undefined &&
                    (data.results.map((result: any, index: number) => {
                        return (
                            <SwiperSlide key={index} className='shadow-md border border-yellow-600 w-full h-full p-4'>
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
                                    <p className='font-semibold text-center'>{result?.titleText?.text}</p>
                                </div>
                                
                            </SwiperSlide>
                        )
                    }))
                }
                ...
                </Swiper>
        </Fragment>
    )
}

export default Casts