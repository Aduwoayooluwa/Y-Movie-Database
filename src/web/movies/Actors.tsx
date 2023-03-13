import React, { Fragment } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { TailSpin } from 'react-loader-spinner'
import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router';

type Props = {}

const getter = (url: string) => axios.get(url, {
    headers: {
        'X-RapidAPI-Key': '9e89d4ea21msh48f2cd0ac7d903ep132579jsna3c3bc99b2a5',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
}
    
    ).then((response) => response.data)

const Actors = (props: Props) => {
    const router = useRouter()

    const url = `https://moviesdatabase.p.rapidapi.com/actors`
    const { data, error, isLoading } = useSWR(url, getter)
    console.log(data)

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
            <main className='mx-3 w-full'>
            <div>
                    <p className='font-semibold text-xl my-3'>Top Actors</p>
                </div>

                <Swiper
                spaceBetween={20}
                slidesPerView={2}
                
                >
                    {
                    data !== undefined &&
                    (data.results.map((result: any, index: number) => {
                        return (
                            <SwiperSlide className='w-full' key={index} onClick={() => {
                                    router.push(`/actors/${result.id}`)
                            }}>
                                <div>
                                    <div>
                                        {
                                            <p className='w-full text-center border shadow border-yellow-600 p-3 font-semibold' key={index}>{result?.primaryName}</p>
                                        }
                                    </div>
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

export default Actors