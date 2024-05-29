import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axios = useAxios()
    const { data: users=[], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get('/users')
            return data
        }
    })

    const handleDeleteUser = (user)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const deleteItem = async()=>{
                    const { data } = await axios.delete(`/users/${user._id}`)
                    console.log(data)
                    refetch()
                }       
                deleteItem()         
                Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const handleMakeAdmin = user =>{
        axios.patch(`/users/admin/${user._id}`)
        .then(res=>{
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} us an admin now.`,
                    showConfirmButton: false,
                    timer: 1500
                  });   
                  refetch()               
            }
        })
    }
    return (
        <div className="flex flex-col justify-center gap-4">
            <div>
                <h1 className="text-3xl">All Users</h1>
                <h1 className="text-3xl">Total Users: {users.length}</h1>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Roll</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            { user.role=== 'admin'? "admin": <button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-600 text-white group"><FaUsers className="text-lg text-white group-hover:text-orange-600 duration-300"></FaUsers></button>}
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteUser(user)} className="btn"><FaTrash className="text-red-600 text-lg"></FaTrash></button>
                                        </td>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;