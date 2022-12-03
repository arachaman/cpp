import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import fb from '../../config/fb'

const Auth = ({children}) => {
    const auth = getAuth(fb)
    const [user, loading] = useAuthState(auth)
    let location = useLocation()

    if(loading){
        return <p>Checking...</p>
    }
    else if(!user && !loading){
        return <Navigate to="/login" state={{from: location}} replace />
    }
    return children
}
export default Auth