
const FoodCard = ({ item }) => {
    const { name, recipe, image, price } = item

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /> </figure>
            <h3 className="bg-slate-950/80 text-white absolute right-5 top-5 px-4 rounded-lg">${price}</h3>
            <div className="card-body flex flex-col items-center gap-4">
                <h2 className="card-title justify-center">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn font-medium border-b-4 hover:border-b-4 border-b-[#BB8506] hover:border-b-[#BB8506] bg-[#E8E8E8] hover:bg-[#111827] duration-300 text-[#BB8506]">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;