interface ProductsPageProps {
    params?: { products: string[] };
}

const ProductsPage = ({params}:ProductsPageProps) => {
    return (
        <div className='fix-height text-3xl font-bold p-5'>
            ProductsPage
            <ul className="mt-7">
                {params?.products?.map((product, index) => (
                    <li key={index} className="font-normal text-xl text-gray-600">
                        {product}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductsPage
//catch all segments (used in authentication & authorization)
// [...products] --> هيديله نفس الصفحة دى url فى products لو كتبت اى شي بعد 
//http://localhost:3000/cart/products/car

//optional catch all segments
// [[...products]] -->  هيديله نفس الصفحة دى  url فى /cart لو كتبت  
//http://localhost:3000/cart
//params?  ->  ? meaning optional