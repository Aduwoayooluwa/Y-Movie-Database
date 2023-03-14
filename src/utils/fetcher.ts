import axios from 'axios'

export const getter = (url: string) => axios.get(url, {
    headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RapidAPI_Key,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
}
).then((response) => response.data)