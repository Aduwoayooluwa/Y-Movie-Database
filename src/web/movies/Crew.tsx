import React, { Fragment, useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

type Props = {
    id: any
}

const getter = (url: string) => axios.get(url, {
    headers: {
        'X-RapidAPI-Key':  process.env.NEXT_PUBLIC_X_RapidAPI_Key,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
}
).then((response) => response.data)   

const Crew = (props: Props) => {
    const url = `https://moviesdatabase.p.rapidapi.com/titles/${props.id}/crew`

    const { data, error, isLoading } = useSWR(url, getter)
    console.log(data)

    if (error) {
        <Fragment>
            Error Loading Page
        </Fragment>
    }

if (isLoading) {
    return (<>
        <p>Loading...</p>
    </>)
}

    if (data?.results === null) {
        return (<main className='mt-10 text-center shadow-md border border-yellow-600 w-full h-full p-4'>
            <p>No available data for this movies&apos; crews</p>
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
                                                <Image className='rounded-md' width={result?.primaryImage?.height} height={result?.primaryImage?.height} src={result?.primaryImage?.url} alt={'image'}/>
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

export default Crew