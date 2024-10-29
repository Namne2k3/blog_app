import React from 'react'

const Footer = () => {
    return (
        <div className='bottom-0'>
            <div className='mt-8 w-full bg-black px-8 md:px-[200px] md:flex-row flex-col lg:px-[300px] items-start space-y-4 md:space-y-0    flex md:justify-between text-sm md:text-md py-8 '>
                <div className="flex flex-col text-white">
                    <p>Features Blog</p>
                    <p>Most Viewed</p>
                    <p>Readers Choice</p>
                </div>

                <div className="flex flex-col text-white">
                    <p>Forum</p>
                    <p>Support</p>
                    <p>Recent Post</p>
                </div>

                <div className="flex flex-col text-white">
                    <p>Privacy Policy</p>
                    <p>About us</p>
                    <p>Terms & Services</p>
                </div>
            </div>
            <p className='py-2 pb-2 text-center text-white bg-black'>All rights reserved @Blog App 2023</p>
        </div>
    )
}

export default Footer