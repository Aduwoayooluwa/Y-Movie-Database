import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { InferGetServerSidePropsType } from 'next'

type Props = {}

type Data = {

}

export const getServerSideProps = async () => {
    const response = await axios('https://moviesdatabase.p.rapidapi.com/titles/%7Bid%7D')
    const data: Data = response.data

    return {
        props: {
            data,
        },
    }
}

const MovieBase = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    const { title_id } = router.query
    console.log(title_id)
    
    console.log(data)
    return (
        <div>MovieBase</div>
    )
}

export default MovieBase