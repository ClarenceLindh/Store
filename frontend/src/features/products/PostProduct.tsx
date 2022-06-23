import { SyntheticEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addProductReducer } from "./productsSlice";

export const PostProduct = () => {
  const dispatch = useAppDispatch();
  
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  // Fix any type
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(addProductReducer({
      name: productName,
      price: productPrice
    }))
    console.log(productName, productPrice);
  }

  const handleNameChange = (e: string) => {
    console.log(e);
    setProductName(e);
  }

  const handlePriceChange = (e: string) => {
    console.log(e);
    setProductPrice(e);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="Input"
        type="text"
        placeholder="Product name..."
        required={true}
        onChange={(e) => handleNameChange(e.target.value)}
      />
      <input
        className="Input"
        type="number"
        placeholder="Price..."
        required={true}
        onChange={(e) => handlePriceChange(e.target.value)}
      />
      <button className="Button" onSubmit={handleSubmit}>Add</button>
    </form>
  );
};

export default PostProduct;