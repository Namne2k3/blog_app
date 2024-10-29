import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { URL } from '../url';
const Menu = () => {

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${URL}/api/auth/logout`, { withCredentials: true })
            console.log(res);
            setUser(null);
            navigate('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='z-10 bg-black w-[130px] flex flex-col items-start absolute top-12 right-6 md:right-[51px] lg:right-[200px] rounded-lg p-4 gap-[8px]'>
            {!user ?
                (
                    <>
                        <h3 className='text-white text-md hover:text-gray-500 cursor-pointer'>
                            <Link to='/login'>Login</Link>
                        </h3>
                        <h3 className='text-white text-md hover:text-gray-500 cursor-pointer'>
                            <Link to='/register'>Register</Link>
                        </h3>
                    </>

                )
                :
                (
                    <>
                        <h3 className='text-white text-md hover:text-gray-500 cursor-pointer'>
                            <Link to={`/profile/${user.id}`}>Profile</Link>
                        </h3>
                        <h3 className='text-white text-md hover:text-gray-500 cursor-pointer'>
                            <Link to='/write'>Write</Link>
                        </h3>
                        <h3 className='text-white text-md hover:text-gray-500 cursor-pointer'>
                            <Link to='/'>My Blogs</Link>
                        </h3>
                        <h3 onClick={handleLogout} className='text-white text-md hover:text-gray-500 cursor-pointer'>
                            Logout
                        </h3>
                    </>
                )
            }

        </div>
    )
}

export default Menu