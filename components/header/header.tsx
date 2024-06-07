import Link from 'next/link'
import React from 'react'

export const Header = () => {
    return (
        <nav>
            <div className='navbar justify-between bg-base-300'>
                <Link href={'/'} className='btn btn-ghost text-lg'>Ecommerce</Link>
                <ul className='flex'>
                    <li>
                        <Link href='/cart' className='btn btn-ghost rounded-btn'>
                            Cart
                        </Link>
                    </li>
                    <li>
                        <Link href='/signin' className='btn btn-ghost rounded-btn'>
                            Sign in
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
