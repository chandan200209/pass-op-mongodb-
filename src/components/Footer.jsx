import React from 'react';
import heartSvg from '../../public/icons/heart-solid.svg';

const Footer = () => {
    return (
        <footer className='bg-slate-800 text-white h-24 relative bottom-0 w-full'>
            <div className='flex flex-col items-center pt-5 gap-1'>
                <div className='flex'>
                    <h1 className='text-2xl font-bold'><span className='text-green-700'>&lt;</span><span>Pass</span><span className='text-green-700'>OP</span><span className='text-green-700'>/&gt;</span></h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <span>Made with</span> <img className='w-5 h-5' src={heartSvg}></img><span>by</span><span className='font-bold'> Chandan Ramteke</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
