import Link from 'next/link'
import React from 'react'
import Menu from './Menu'

export const Header = () => {
    return (
        <nav>
            <div className='navbar justify-between bg-base-300'>
                <Link href={'/'} className='btn btn-ghost text-lg'>Ecommerce</Link>
                <Menu />
            </div>
        </nav>
    )
}
