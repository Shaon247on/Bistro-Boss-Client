import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import useCart from "../../../Hooks/useCart";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const [cart, refetch] = useCart()
    const axios = useAxios()
    
    const totalPrice = cart.reduce((acc, item) => {
        const total = acc + item.price
        return total
    }, 0)

    const handleDeleteItem = async (e) => {
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
                    const { data } = await axios.delete(`/carts/${e}`)
                    console.log(data)
                    refetch()
                }       
                deleteItem()         
                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success"
                });
            }
        });

    }
    console.log(totalPrice)
    return (
        <div>
            <div className="flex items-center gap-8 justify-around">
                <h1 className="text-4xl font-bold">Items: {cart.length}</h1>
                <h1 className="text-4xl font-bold">Total Price: ${totalPrice}</h1>
                <button className="btn btn-primary">Pay</button>
            </div>
            <div className="text-center">
                <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                    <h2 className="mb-4 text-2xl font-semibold leading-tight">Invoices</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col className="w-24" />
                            </colgroup>
                            <thead className="dark:bg-gray-300">
                                <tr className="text-left">
                                    <th className="p-3 text-center">No.</th>
                                    <th className="p-3 text-center">Image</th>
                                    <th className="p-3 text-center">Name</th>
                                    <th className="p-3 text-center">Price</th>
                                    <th className="p-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item, index,) =>
                                        <tr key={item._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                            <td className="p-3">
                                                <p>{index + 1}</p>
                                            </td>
                                            <td className="p-3">
                                                <img src={item.image} alt="" className="w-20 mx-auto" />
                                            </td>
                                            <td className="p-3">
                                                <p>{item.name}</p>
                                            </td>
                                            <td className="p-3">
                                                <p className="dark:text-gray-600">${item.price}</p>
                                            </td>
                                            <td className="p-3">
                                                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                                                    <button onClick={() => handleDeleteItem(item._id)} className="btn"><FaTrash className="text-red-600 text-lg"></FaTrash></button>
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
        </div>
    );
};

export default Cart;