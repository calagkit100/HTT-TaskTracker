import React from 'react'
import Typed from 'react-typed'
import { Link } from '@inertiajs/react'

const LandingPage = () => {
    return (
        <div className='text-white'>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <div>
                    <h3 className='font-bold text-5xl uppercase'>Boost Your Productivity</h3>
                    <h1 className='p-2'>
                        <Typed
                            className='md:text-7xl sm:text-5xl text-7xl font-bold md:pl-4 pl-2 text-teal-500'
                            strings={['TASK', 'DONE', 'EASY']}
                            typeSpeed={120}
                            backSpeed={140}
                            loop />
                    </h1>
                    <h4 className='text-lg p-4'>"Simplify your life with our powerful to-do app."</h4>
                    <div>
                        <Link href={route('login')}>
                            <button className='bg-teal-500 w-48 rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage