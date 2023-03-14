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

const Genres = (props: Props) => {
    const router = useRouter()

    const url = `https://moviesdatabase.p.rapidapi.com/titles/utils/genres`
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
                <p className='font-semibold text-xl my-3'>Top Actors</p>
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
            <main className='w-full bg-green-200 py-10 mb-6'>
                <div>
                    <p className='font-semibold text-xl m-3'>Top Genres</p>
                </div>

                <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 place-items-center  '>
                    {
                        Object.entries(data?.results).slice(1, 9).map((result: any, index: number) => {
                            return (
                                <div key={index} className='border w-[150px] p-2 grid place-items-center border-yellow-600'>
                                    <p>{result}</p>
                                </div>
                            )
                        })
                    }
                </section>
            </main>
        </Fragment>
    )
}

export default Genres