import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged,} from "firebase/auth";
import app from '../../firebase/firebase.init'

export const AuthContext = createContext();
const auth = getAuth(app)

const UserContext = ({ children }) => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    //for email and password
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
  
    const authInfo = {
        user,
        createUser,
        loading,
        
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}

            </AuthContext.Provider>

        </div>
    );
};

export default UserContext;