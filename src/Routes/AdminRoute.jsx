import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({children}) => {
   const {user, loading} = useAuth()
   const [isAdmin, isAdminLoading] = useAdmin()
   const location = useLocation()
   if(loading || isAdminLoading){
      return <progress className="progress-secondary w-56"></progress>
   }
   if(user && isAdmin){
      return children
   }
   return <Navigate state={location.pathname} to='/' replace></Navigate>
   
};

export default AdminRoute;