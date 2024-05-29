import {  useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useMenu= ()=>{
    const axios = useAxiosPublic()    

    const {data: menu=[], isPending: loading, refetch} = useQuery({
        queryKey:['menu'],
        queryFn:async()=>{
            const {data} = await axios.get('/menu')
            return data
        }
    })
    return [menu, loading, refetch]

}

export default useMenu