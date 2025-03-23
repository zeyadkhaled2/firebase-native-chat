import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { auth, db, userRef } from "../firebaseConfig";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);



    useEffect(() => {

        //on Auth state change
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                updateUserData(user.uid)
                console.log("got user : ", user);
                setUser(user);
            }
            else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;

    }, []);

    useEffect(() => {
        if (user) {
            console.log("Updated user state:", user);
        }
    }, [user]);

    const updateUserData = async (userId) => {
        const docRef = doc(db,"users",userId)
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
            console.log("user has been updated: ", data.username)
        }else
        console.log(" failed user has been updated")

    }


    const login = async (email, password) => {
        //login logic
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true };

        } catch (error) {
            let message = error.message

            console.log("message", message)
            if (message.includes("(auth/invalid-email)")) message = "Invalid Email"
            if (message.includes("(auth/invalid-credential)")) message = "Wrong Credentials"

            console.log("message", message)
            // console.error("Registration error:", error);
            return { success: false, message };
        }


    };
    const logout = async () => {
        //login logic
        try {
            await signOut(auth)
            return { success: true }
        } catch (error) {
            return { success: false, message: error.message, error: error }
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
            return { success: true, data: response?.user };

        } catch (error) {
            let message = error.message

            console.log("message", message)
            if (message.includes("(auth/invalid-email)")) message = "Invalid Email"
            if (message.includes("(auth/weak-password)")) message = "Weak Password"
            if (message.includes("(auth/email-already-in-use)")) message = "This Email already in use"
            console.log("message", message)
            // console.error("Registration error:", error);
            return { success: false, message };
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