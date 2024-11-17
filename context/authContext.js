import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);



    useEffect(() => {

        //on Auth state change
        setTimeout(() => {
            setIsAuthenticated(true);
        }, 3000);

    }, []);


    const login = async (email, password) => {
        //login logic
        try {

        } catch (error) {

        }


    };
    const logout = async () => {
        //login logic
        try {

        } catch (error) {

        }


    };
    const register = async (email, password, profileUrl) => {
        //login logic
        try {

        } catch (error) {

        }


    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => { 
    const value = useContext(AuthContext) 
    if (!value) { 
        throw new Error('useAuth must be used within a AuthContextProvider') 
    }
    return value;
}