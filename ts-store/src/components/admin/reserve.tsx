import { useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { createProductApi } from "../../helpers/ApiCalls";
import { IProductCreate } from "../../types/product.types";

export const AddProduct = () => {
  const { user, products, setProducts, errors, setErrors } = useDataContext();
  const [newProduct, setNewProduct] = useState({});
  const [imagePreview, setImagePreview] = useState(
    "https://res.cloudinary.com/dngl4djva/image/upload/v1663521094/rs0p5bkdr4glfv2jztbk.png"
  );

  const { id } = useParams();
  const refName = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);
  const refPrice = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onProductCreate: React.FocusEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    console.log("Creating new product...");

    if (
      !user ||
      !newProduct ||
      !refName.current ||
      !refDescription.current ||
      !refPrice.current
    )
      return setErrors("Something went wrong! Please try again...");

    const productNew: IProductCreate = {
      name: refName.current.value,
      description: refDescription.current.value,
      price: refPrice.current.value,
      image: imagePreview,
    };
    console.log(productNew);
    const newProductApi = await createProductApi(user.token, productNew);
    console.log(newProductApi);
    setProducts([...products, newProductApi]);
    navigate("products");
    refName.current.value = "";
    refDescription.current.value = "";
    refPrice.current.value = "";
  };

  //! product image
  const handleChangeProductImage: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    console.log(e.target.files);
    if (!e.target.files) return;
    let fileSelected = e.target.files[0];

    if (!fileSelected) return;

    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileSelected);
    fileReader.onloadend = (ev) => {
      setImagePreview(fileReader.result as string);
    };
  };

  return (
    <div className="Add">
      <div className="create">
        <form onSubmit={onProductCreate}>
          <label htmlFor="image-preview">
            <img src={imagePreview} alt="" />
          </label>
          <div>
            <input autoFocus type="text" ref={refName} placeholder="Tiile" />
          </div>
          <div>
            <input type="text" ref={refDescription} placeholder="Description" />
          </div>
          <div>
            <input type="text" ref={refPrice} placeholder="Price" />
          </div>
          <button type="submit">Create</button>
          <NavLink className="back" to="/products">
            Back
          </NavLink>
          {/* select image-button click handler */}
          <input
            style={{ display: "none" }}
            id="image-preview"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChangeProductImage}
          />
        </form>
      </div>
    </div>
  );
};