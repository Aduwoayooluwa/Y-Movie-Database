import Search from '@/web/search/Search'
import React from 'react'

type Props = {}

const navItems = [
    {

    }
]
const Navbar = (props: Props) => {
    return (
        <div  className='bg-yellow-300 w-full py-3 px-3 md:px-6 lg:px-10'>
            <div className="mb-3">
                <p className='text-green-600 text-center font-bold text-2xl'>YMBD</p>
            </div>

            <div>
                <Search />
            </div>
        </div>
    )
}

export default Navbar