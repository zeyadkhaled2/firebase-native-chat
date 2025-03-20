import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { auth, db, userRef } from "../firebaseConfig";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);



    useEffect(() => {

        //on Auth state change
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            }
            else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;

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
    const register = async (email, password, username, profileUrl) => {
        try {
            // Remove NetInfo check since package is not installed
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response?.user);
            
            console.log("user created successfully");

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user};
        
        } catch (error) {
            console.error("Registration error:", error);
            return {success: false, error: error.message};
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