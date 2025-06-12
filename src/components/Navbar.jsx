import React from 'react';
import githubSvg from '../../public/icons/square-github-brands.svg';

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white w-full h-16'>
            <div className='mycontainer flex justify-between px-5 h-16 py-4 items-center'>
                <div className='logo hover:scale-[102.5%] cursor-pointer'>
                    <h1 className='text-2xl font-bold'><span className='text-green-700'>&lt;</span><span>Pass</span><span className='text-green-500'>OP</span><span className='text-green-700'>/&gt;</span></h1>
                </div>
                <div>
                    <ul className='flex gap-6 font-semibold items-center'>
                        <li><a className='hover:underline cursor-pointer font-mono hidden md:block' href='/'>Home</a></li>
                        <li><a className='hover:underline cursor-pointer font-mono hidden md:block' href='/'>About</a></li>
                        <li><a className='hover:underline cursor-pointer font-mono hidden md:block' href='/'>Terms & Conditions</a></li>
                        <li>
                            <button className='flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-4xl bg-gray-300'><img src={githubSvg} alt="github-svg" className='w-5' ></img> <span className='text-gray-700 hover:underline text-sm'>GitHub</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
