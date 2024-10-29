import React, { useContext } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import { URL } from '../url'
const Comment = ({ cmt: { _id, comment, author, postId, userId, updatedAt } }, post) => {

    const { user } = useContext(UserContext);

    const handleDelete = async (id) => {
        try {
            await axios.delete(URL + "/api/comments/" + id, { withCredentials: true })
            window.location.reload(true)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async () => {

    }

    return (
        <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
                <h3 className='font-bold text-gray-600'>@{author}</h3>
                <div className="flex justify-center items-center space-x-4">
                    <p>{new Date(updatedAt).toDateString()}</p>
                    <p>{new Date(updatedAt).toLocaleTimeString()}</p>
                    <div className="flex justify-center items-center space-x-2">
                        {
                            user?.id === userId
                            &&
                            <>
                                <p onClick={handleEdit} className='cursor-pointer'><BiEdit size={24} /></p>
                                <p onClick={() => handleDelete(_id)} className='cursor-pointer'><MdDelete size={24} /></p>
                            </>
                        }
                    </div>
                </div>
            </div>
            <p className="px-4 mt-2">{comment}</p>
        </div>
    )
}

export default Comment