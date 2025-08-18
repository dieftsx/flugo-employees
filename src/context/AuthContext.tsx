import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, signInWithGoogle, logout } from '../api/firebaseService'

interface AuthContextType {
    currentUser: any | null
    loading: boolean
    loginWithGoogle: () => Promise<void>
    logout: () => Promise<void>
    
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}



export const AuthProvider: React.FC <{children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User  | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        }) 
        return unsubscribe
    },[])

    const loginWithGoogle = async () => {
        setLoading(true)
        try {
            await logout()

        } catch (error) {
            console.error("Logout failed", error)
            setLoading(false)
        }
    }

    const value = {
        currentUser,
        loading,
        loginWithGoogle,
        logout: handleLogout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )


}