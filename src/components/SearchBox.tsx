import React from 'react'

type Props = {
    handleChange: any
    handleFocus: any
    query: any
}

const SearchBox = (props: Props) => {
    return (
        <input type="text"
        onChange={props.handleChange}
        onFocus={props.handleFocus}
        placeholder='Search....'
        value={props.query}
        className='p-3 outline-none rounded-full w-full'
    />
    )
}

export default SearchBox