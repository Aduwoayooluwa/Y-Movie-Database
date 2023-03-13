import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR, { Fetcher } from 'swr'
import Image from 'next/image'
import Casts from '@/web/movies/TopCasts'
import Crew from '@/web/movies/Crew'

type Props = {}

const getter = (url: string) => axios.get(url, {
    headers: {
        'X-RapidAPI-Key': '9e89d4ea21msh48f2cd0ac7d903ep132579jsna3c3bc99b2a5',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
}
).then((response) => response.data)  



const MovieBase = () => {
    const router = useRouter()
    const { title_id } = router.query
    console.log(title_id)

    const url = `https://moviesdatabase.p.rapidapi.com/titles/${title_id}`

    const { data, error } = useSWR(url, getter)
    console.log(data)

    if (error) {
        <main>
            <p>Error Loading Page...</p>
        </main>
    }

    return (
        <Fragment>
            <main>
                {
                    data !== undefined && (
                        <>
                            <Image className='rounded-md' width={data.results?.primaryImage?.height} height={data.results?.primaryImage?.height} src={data.results?.primaryImage?.url} alt={'image'}/>
                            <div className='py-4 px-3'>
                                <p className='font-semibold text-xl'>{data.results.titleText.text}</p>
                                <div>
                                    <small className='mr-2'>Rating: {'4.5'}</small>
                                    <small>Release year: {data.results?.releaseYear?.year}</small>
                                </div>
                                
                                <Casts id={title_id}/>
                                <Crew id={title_id} />
                            </div>
                        </>
                    )
                }
    
            </main>
        </Fragment>
    )
}

export default MovieBase