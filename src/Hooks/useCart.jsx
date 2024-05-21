import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useCart = () => {
    const {user} = useAuth()
    const axios = useAxios()
   // tan stack query
   const {data: carts=[], refetch} = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async()=>{
        const {data}= await axios.get(`/carts?email=${user.email}`)
        return data
    }
   })
   return [carts, refetch]
};

export default useCart;