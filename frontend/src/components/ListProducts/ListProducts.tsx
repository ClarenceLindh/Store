import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchProducts, ProductObject } from "../productsSlice";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import UpdateProduct from "../UpdateProducts/UpdateProduct";


const ListProducts = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, []);

  const ProductCardInfo = (product: ProductObject) => {
    return (
      <div>
        <h3>{product.product.name}</h3>
        <h4>{product.product.price} kr</h4>
      </div>
    );
  };

  return (
    <div>
      <ul className="Products">
        {products.map((product: any, index) => (
          <li className="Product" key={index}>
            <ProductCardInfo product={product} />
            <DeleteProduct product={product} />
            <UpdateProduct product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListProducts;
