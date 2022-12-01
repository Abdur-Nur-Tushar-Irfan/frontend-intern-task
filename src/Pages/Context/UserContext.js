import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.init'

export const AuthContext=createContext();
const auth=getAuth(app)

const UserContext = ({children}) => {
    const [user,setUser]=useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    //for create user
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)

    }
    //for login
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //for updateUser
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    
    const authInfo={
        user,
        createUser,
        signIn,
        updateUserProfile,
        loading

    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}

       </AuthContext.Provider>
    );
};

export default UserContext;