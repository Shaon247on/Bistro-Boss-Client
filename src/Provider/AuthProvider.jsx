import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null)
    const [loading, setLoading] = useState(true)

    const signUp = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email, password)
    }
    

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile= (name, photoURL)=>{
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            console.log('current user:', currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const authInfo={
        user,
        loading,
        logIn,
        signUp,
        logOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;