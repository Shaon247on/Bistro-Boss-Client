
const MenuItem = ({item}) => {
    const {name, recipe, image, price} = item
    return (
        <div className="flex items-start gap-4">
            <img style={{
                borderRadius:'0 200px 200px 200px'
            }} src={image} alt="" className="avatar w-[100px] "/>
            <div>
                <h3 className="uppercase">{name}---------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;