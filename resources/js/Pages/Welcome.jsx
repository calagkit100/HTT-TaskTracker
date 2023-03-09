import LandingPage from '@/Components/LandingPage';
import { Link, Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';


export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div>
                <div className='h-24 max-w-5xl mx-auto px-4 flex justify-between items-center text-teal-500'>
                    <h1 className='text-2xl'><a href="#">TASK TRACKER</a></h1>
                    <ul className='flex gap-4'>
                        {
                            props.auth.user ? (
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-teal-500 "
                                >
                                    My Todos
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-teal-600 "
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="ml-4 font-semibold text-teal-600 "
                                    >
                                        Register
                                    </Link>
                                </>
                            )
                        }
                    </ul>
                </div>
                <LandingPage />
            </div>
        </>
    );
}


// {
//     props.auth.user ? (
//         <Link
//             href={route('dashboard')}
//             className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
//         >
//             Todos Dashboard
//         </Link>
//     ) : (
//     <>
//         <Link
//             href={route('login')}
//             className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
//         >
//             Log in
//         </Link>

//         <Link
//             href={route('register')}
//             className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
//         >
//             Register
//         </Link>
//     </>
// )
// }