import React from 'react'
import { IF } from '../url'
const HomePosts = ({ post: { title, desc, username, updatedAt, photo } }) => {
    return (
        <div className='w-full flex mt-8 space-x-4'>
            <div className="w-[35%] h-[200px] flex justify-center items-center">
                <img src={IF + photo} alt="" className='w-[200px] h-[150px] object-contain' />
            </div>
            <div className="flex flex-col w-[65%]">
                <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                    {title}
                </h1>

                <div className="justify-between flex mb-2 text-sm font-semibold text-gray-500 space-x-4 md:mb-4">
                    <p className=''>@_{username}</p>
                    <div className="flex space-x-2">
                        <p>{new Date(updatedAt).toDateString()}</p>
                        <p>{new Date(updatedAt).toLocaleTimeString()}</p>
                    </div>
                </div>

                <p className='text-sm md:text-lg'>
                    {desc.slice(0, 200)}
                    <span className='text-gray-500 block'> Read more...</span>
                </p>
            </div>
        </div>
    )
}

export default HomePosts