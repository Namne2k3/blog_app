import React, { useState, useEffect, useContext } from 'react'
import { Footer, HomePosts, Navbar, Loader } from '../components'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import { URL } from '../url'
import { useLocation, Link } from 'react-router-dom'
import { BiLoaderAlt } from 'react-icons/bi'

const Home = () => {

    const { search } = useLocation();
    // console.log(search);
    const [posts, setPosts] = useState([])
    const [noResult, setNoResult] = useState(false);
    const [loader, setLoader] = useState(false);

    const { user } = useContext(UserContext)

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const res = await axios.get(`${URL}/api/posts${search && search}`)
                setPosts(res.data);

                if (res.data.length === 0) {
                    setNoResult(true)
                } else {
                    setNoResult(false);
                    console.log(res.data);
                }
                setLoader(false);
            } catch (err) {
                console.log(err)
                setLoader(true)
            }
        }
        fetchData();
    }, [search])

    return (
        <div className='flex flex-col justify-between h-[100vh]'>
            <Navbar />
            <div className='px-8 lg:px-[200px]'>
                {
                    !loader
                        ?
                        !noResult
                            ?
                            posts.map((post) => {
                                return (
                                    <Link key={post._id} to={user ? `/posts/post/${post._id}` : `login`}>
                                        <HomePosts post={post} />
                                    </Link>
                                )
                            })
                            :
                            <h3 className='text-center font-bold mt-16'>No post found!</h3>
                        :
                        <Loader />
                }
            </div>
            <Footer />
        </div>
    )
}

export default Home