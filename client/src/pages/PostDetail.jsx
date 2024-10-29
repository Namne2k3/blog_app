import React, { useContext, useEffect, useState } from 'react'
import { Footer, Navbar, Comment, Loader } from '../components'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { URL, IF } from '../url'
import { UserContext } from '../context/userContext'
const PostDetail = () => {

    const { id } = useParams()
    const [post, setPost] = useState({})
    const [cmt, setCmt] = useState('');
    const [comments, setComments] = useState([])
    const { user } = useContext(UserContext);
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    // console.log("Check post Id >>> ", id);

    const fetchComment = async () => {
        try {
            const res = await axios.get(`${URL}/api/comments/post/${id}`)
            setComments(res.data);
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const res = await axios.get(`${URL}/api/posts/${id}`)
                setPost(res.data);
                // console.log(res.data);

                setLoader(false)
            } catch (err) {
                setLoader(true)
                console.log(err);
            }
        }
        fetchData();
        fetchComment();
    }, [id])

    const handleDelete = async () => {
        // console.log("Check comment post id >>> ", user.id,);
        // console.log("Check comment post >>> ", post);
        try {
            await axios.delete(`${URL}/api/posts/${id}`, { withCredentials: true })
            navigate('/')
            console.log("Post has been deleted!");
        } catch (err) {
            console.log(err);
        }
    }

    const handleEdit = async () => {
        try {
            navigate(`/edit/${post._id}`)
            console.log("Post has been deleted!");
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddCmt = async () => {
        try {
            const newComment = {
                comment: cmt,
                author: user.username,
                postId: id,
                userId: user.id
            }

            const res = await axios.post(`${URL}/api/comments/create`, newComment, { withCredentials: true })
            setCmt("")
            fetchComment();
            console.log(res.data);
            console.log("Comment has been posted!");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Navbar />
            {loader ?
                <div className="flex justify-center items-center min-h-[80vh]">
                    <Loader />
                </div>
                :
                <div className="px-8 lg:px-[200px] md:px-[50px] mt-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-black md:text-3xl">
                            {post.title}
                        </h1>
                        {user?.id === post.userId &&
                            <div className="flex items-center justify-center space-x-2">
                                <p onClick={handleEdit} className='cursor-pointer'><BiEdit size={24} /></p>
                                <p className='cursor-pointer' onClick={handleDelete}><MdDelete size={24} /></p>
                            </div>
                        }
                    </div>

                    <div className="flex items-center justify-between mt-2 md:mt-4">
                        <p className='italic text-slate-700'>{post.username}</p>
                        <div className="flex space-x-2 font-semibold">
                            <p>{new Date(post.updatedAt).toDateString()}</p>
                            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-6">
                        <img src={IF + post.photo} alt="" className='w-full mx-auto object-contain mt-8' />

                        <p className='mx-auto mt-8'>
                            {post.desc}
                        </p>

                        <div className="flex items-center mt-8 space-x-4 font-semibold">
                            <p>Categories:</p>
                            <div className="flex justify-center items-center space-x-2">
                                {post.categories?.map((cat) =>
                                    <div key={cat} className="bg-gray-300 rounded-lg px-3 py-1">{cat}</div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
                            {/* comments */}
                            {comments?.map((cmt, index) =>
                                <Comment key={index} cmt={cmt} post={post} />
                            )}
                        </div>
                    </div>
                    {/* Write comment  */}
                    <div className="flex flex-col mt-4 md:flex-row">
                        <input value={cmt} onChange={(e) => setCmt(e.target.value)} type="text" className='md:w-[80%] outline-none px-2 mt-4 md:mt-0' placeholder='Write a comment' />
                        <button onClick={handleAddCmt} className='w-[20%] bg-black text-sm text-white px-4 outline-none py-2 mt-4 md:mt-0 hover:bg-gray-500 hover:text-black '>Add Comment</button>
                    </div>
                </div>
            }
            <Footer />
        </div>
    )
}

export default PostDetail