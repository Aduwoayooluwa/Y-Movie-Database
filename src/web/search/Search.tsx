import React, { Fragment, useCallback, useRef, useState} from 'react'
import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router';
import { getter } from '@/utils/fetcher';
import { TailSpin } from  'react-loader-spinner'
import axios from 'axios'
import Link from 'next/link';
import Image from 'next/image';
import SearchBox from '@/components/SearchBox';

type Props = {}

const Search = (props: Props) => {
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults]  = useState([])

  const searchEndpoint = (query: string) => `https://moviesdatabase.p.rapidapi.com/titles/search/keyword/${query}`

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event?.target.value

    setQuery(query)

    if (query.length) {
      axios.get(searchEndpoint(query), {
        headers: {
            'X-RapidAPI-Key': '9e89d4ea21msh48f2cd0ac7d903ep132579jsna3c3bc99b2a5',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    }
    ).then((response) => {
      response.data
      setResults(response.data)
    })
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event: any) => {
    if (searchRef.current && !searchRef.current?.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])
  return (
    <Fragment>
      <div ref={searchRef}>
        <SearchBox handleChange={onChange} handleFocus={onFocus} query={query}/>

          <section className=''>
          {
            active && results.length > 0 && (
              <ul>
                  {
                    results.map((title: any, index: number) => {
                      return (
                        <div key={index}>
                            <li>
                                <Link href={"/search"} as="">
                                    <p>{title.titleText.text}</p>
                                </Link>
                            </li>
                        </div>
                      )
                    })
                  }
              </ul>
            )
          }
          </section>
      </div>
    </Fragment>
  )
}

export default Search