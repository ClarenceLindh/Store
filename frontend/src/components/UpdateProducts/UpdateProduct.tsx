import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { updateProductReducer, ProductObject } from "../productsSlice";

const UpdateProduct = (product: ProductObject)  => {
  const dispatch = useAppDispatch();

  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleUpdateSubmit = () => {
    if (productName && productPrice) {
      dispatch(
        updateProductReducer({
          id: product.product.id!,
          name: productName!,
          price: productPrice!,
        })
        );
        setUpdateStatus(!updateStatus)
        setErrorMessage("")
      }
    else {
      setErrorMessage("Fill in name and price")
    } 
  };

  const toggleUpdate = () => {
    setUpdateStatus(!updateStatus);
    setProductName(product.product.name!);
    setProductPrice(product.product.price!);
  };

  const handleNameChange = (e: string) => {
    setProductName(e);
  };

  const handlePriceChange = (e: number) => {
    setProductPrice(e);
  };

  return (
    <div>
      <button className="Edit-Button" onClick={toggleUpdate}>
        Edit
      </button>
      {updateStatus && (
        <div>
          New values:
          <form>
            <input
              className="Input Name"
              type="text"
              value={productName}
              required={true}
              onChange={(e) => handleNameChange(e.target.value)}
            />
            <input
              className="Input Price"
              type="number"
              value={productPrice}
              required={true}
              onChange={(e) => handlePriceChange(e.target.valueAsNumber)}
            />
          </form>
          <button className="Button" onClick={handleUpdateSubmit}>
            Submit changes
          </button>
          {errorMessage.length !== 0 && (
            <div>
              {errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
