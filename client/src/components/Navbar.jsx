import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FaBlog } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { Menu } from '../components/'
import { UserContext } from '../context/userContext'
const Navbar = () => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');

    const [menu, setMenu] = useState(false);

    return (
        <div className='sticky top-0 bg-white border-b-2 flex items-center justify-between px-6 lg:px-[200px] md:px-[50px] py-4'>
            <h1 className='text-lg md:text-xl font-extrabold'>
                <Link to='/' className='flex justify-between items-center gap-[8px]'>
                    <FaBlog size='26' />
                    <p className='font-sm'>
                        Namne's Blog
                    </p>
                </Link>
            </h1>

            <div className="flex items-center justify-center space-x-0">
                <p className='cursor-pointer' onClick={() => navigate(prompt ? `?search=${prompt}` : `/`)}>
                    <BsSearch />
                </p>
                <input onChange={(e) => setPrompt(e.target.value)} type="text" placeholder='Search a post' className='outline-none px-3 py-1' />
            </div>

            <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
                {
                    user
                        ?
                        <h3 className='hover:text-gray-500'>
                            <Link to='/write'>Write Post</Link>
                        </h3>
                        :
                        <h3>
                            <Link to='/login'>Login</Link>
                        </h3>
                }
                {
                    user
                        ?
                        <div onClick={() => setMenu(!menu)}>
                            <p className="cursor-pointer relative">
                                <FiMenu size={26} />
                            </p>
                            {menu && <Menu />}
                        </div>
                        :
                        <h3>
                            <Link to="/register">Register</Link>
                        </h3>}
            </div>
            <div onClick={() => setMenu(!menu)} className="md:hidden text-lg cursor-pointer">
                <p className='cursor-pointer relative'>
                    <FiMenu size={26} />
                </p>
                {menu && <Menu />}
            </div>
        </div>
    )
}

export default Navbar