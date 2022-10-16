import { useState } from "react";
import { BiEuro } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { deleteProductApi, updateProductApi } from "../../helpers/ApiCalls";
import { IProduct } from "../../types/product.types";

type Props = {
  products: IProduct[];
};

export const ProductList = ({ products }: Props) => {
  const { user, setProducts, errors, setErrors } = useDataContext();

  //! delete
  const handleDelete = async (productId: string) => {
    if (!user) return;

    // 1.step => delete product at API
    const response = await deleteProductApi(user.token, productId);

    // 2.step => delete product in state
    const productsCopy = products.filter(
      (product) => product._id !== productId
    );
    console.log(productsCopy);

    setProducts(productsCopy);
  };

  return (
    <div>
      {user && (
        <div className="content">
          {([...products] || []).reverse().map((product) => (
            <div key={product._id} className="product">
              <div>
                <Link to={`/products/${product._id}`} state={product}>
                  <img src={product.image} alt={product.name} />
                </Link>
              </div>
              <div className="data">
                <div className="name">{product.name}</div>
                <div>{product.description}</div>
                <div className="details">
                  {/* <span>{product.price} &euro 💲 $ 🛍 € ☕ ✨ 📩</span> */}
                  <span className="icon">
                    {product.price} <BiEuro />{" "}
                  </span>
                  <Link to={`/products/${product._id}`} state={product}>
                    Details
                  </Link>
                  <FaTrashAlt
                    role="button"
                    className="delete"
                    onClick={() => handleDelete(product._id)}
                  />
                </div>
              </div>{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
