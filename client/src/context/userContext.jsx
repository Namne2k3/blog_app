import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${URL}/api/auth/refetch`, { withCredentials: true })
                console.log(res.data);
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser();
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserProvider
}