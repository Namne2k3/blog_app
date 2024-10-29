import React, { useContext, useEffect, useState } from 'react'
import { Navbar, Footer } from '../components'
import { ImCross } from 'react-icons/im'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../url'
import { UserContext } from '../context/userContext'

const EditPost = () => {
    const [cat, setCat] = useState("")
    const [cats, setCats] = useState([])
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState('')
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const deleteCategory = (i) => {
        let updatedCats = [...cats]
        // console.log("Check index >>> ", i)
        updatedCats.splice(i, 1)
        setCats(updatedCats)
    }
    const addCategory = () => {
        let updatedCats = [...cats]
        updatedCats.push(cat)
        setCat('')
        setCats(updatedCats)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const post = {
            title, desc, username: user.username, userId: user.id, categories: cats
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('img', filename)
            data.append('file', file)
            post.photo = filename

            try {
                await axios.post(`${URL}/api/upload/`, data)
                // console.log(imgUpload.data);
            } catch (err) {
                console.log(err)
            }
        }

        try {
            const res = await axios.put(`${URL}/api/posts/${id}`, post, { withCredentials: true })
            // console.log(res.data);
            navigate('/')
            navigate(`/posts/post/${res.data._id}`)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // console.log("Check edit id >>> ", id);
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${URL}/api/posts/${id}`)
                setTitle(res.data.title)
                setCats(res.data.categories)
                setDesc(res.data.desc)
                setFile(res.data.photo)

            } catch (err) {
                console.log(err);
            }
        }

        fetchPost();
    }, [id])

    return (
        <div className="">
            <Navbar />
            <div className="px-6 md:px-[200px] mt-8">
                <h1 className="font-bold md:text-2xl text-xl mt-8">Edit post</h1>
                <form action="" className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter a post title' className='px-4 py-2 outline-none' />
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" className='px-4' />
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-4 md:space-x-8">
                            <input value={cat} onChange={(e) => setCat(e.target.value)} type="text" name="" id="" className='px-4 py-2 outline-none' placeholder='Enter post category' />
                            <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer">Add</div>
                        </div>

                        {/* Categories */}
                        <div className="flex mt-4 px-4">
                            {cats?.map((cat, index) =>
                                <div key={index} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                                    <p>{cat}</p>
                                    <p onClick={() => deleteCategory(index)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="px-4 py-2 w-full">
                        <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className=' w-full px-2 py-2 outline-none bg-gray-200 rounded-lg ' placeholder='Enter post description' name="" id="" cols="30" rows="8"></textarea>
                    </div>
                    <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] ml-4 text-white font-semibold px-4 py-2 md:text-xl text-lg'>Save</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default EditPost