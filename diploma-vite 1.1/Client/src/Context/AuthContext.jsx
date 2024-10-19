import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(()=> {
        const token = localStorage.getItem('token');
        if(token){
            try {
                const decodeToken = jwtDecode(token);
                // console.log("Decoded token: ", decodeToken);
                setUserId(decodeToken.userId)
                setIsAuthenticated(true)
            } catch (error) {
                console.error('Ошибка декодирования токена ', error)
                setIsAuthenticated(false)
            }
        }
    }, [])

    return(
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, userId, setUserId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}