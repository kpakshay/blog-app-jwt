import { useAuth } from '../Context/useAuth'
import { Navigate, replace } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
    const {user} = useAuth()
    if(!user){
        return <Navigate to="/login" replace />
    }
  return children
}
