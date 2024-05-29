import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../Hooks/UseMenu';
import Swal from 'sweetalert2';
import useAxios from '../../../Hooks/useAxios';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu()
    const axios = useAxios()
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                const { data } = await axios.delete(`/menu/${item._id}`)
                console.log(data)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            }
        });
    }
    return (
        <div>
            <SectionTitle
                subHeading='Hurry Up'
                heading='Manage All Items'>
            </SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>No.</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menu.map((item, index) =>

                                    <tr key={item._id}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.name}

                                        </td>
                                        <td className='text-right'>${item.price}</td>
                                        <th>
                                            <Link to={`/dashboard/updateItem/${item._id}`}>
                                                <button className="btn bg-orange-600 text-white group"><FaEdit className="text-lg text-white group-hover:text-orange-600 duration-300"></FaEdit></button>
                                            </Link>
                                        </th>
                                        <td>
                                            <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                                                <button onClick={() => handleDeleteItem(item)} className="btn"><FaTrash className="text-red-600 text-lg"></FaTrash></button>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;