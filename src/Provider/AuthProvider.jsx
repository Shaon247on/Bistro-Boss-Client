import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null)


const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null)
    const axios = useAxiosPublic()
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const signUp = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email, password)
    }

    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
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
            if(currentUser){
                //get token and store client
                const userInfo = {email: currentUser.email}
                axios.post('/jwt', userInfo)
                .then(res=>{
                    console.log(res.data.token);
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else{
                // TODO: remove token (if token stored in the client site: local storage, caching, in memory)
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[axios])

    const authInfo={
        user,
        loading,
        logIn,
        signUp,
        logOut,
        updateUserProfile,
        googleLogin
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;