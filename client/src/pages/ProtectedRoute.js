import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../contexts/appContext'


const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AppContext); 
      if (!user) {
          return <Navigate to ='/' />
      }
   return children
  
}     

export default ProtectedRoute;
