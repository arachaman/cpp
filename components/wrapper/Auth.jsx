import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import FirebaseConf from '../../config/FirebaseConf'

const Auth = ({children}) => {
    const auth = getAuth(FirebaseConf)
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