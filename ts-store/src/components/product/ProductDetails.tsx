import { useEffect, useRef, useState } from "react";
import { MdCancel, MdSaveAlt } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { getProductApi, updateProductApi } from "../../helpers/ApiCalls";
import { IProduct, IProductUpdate } from "../../types/product.types";
import { ImagePicker } from "./ImagePicker";

export const ProductDetails = () => {
  const { user, products, setProducts } = useDataContext();
  const [editMode, setEditMode] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const [image, setImage] = useState<string>();

  const { id } = useParams();

  const refProductName = useRef<HTMLInputElement>(null);
  const refProductDescription = useRef<HTMLInputElement>(null);
  // const refProductDescription = useRef<HTMLTextAreaElement>(null);
  const refProductPrice = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProductData = async () => {
      const productApi: IProduct = await getProductApi(id);
      console.log(productApi);
      setProduct(productApi);
      setImage(productApi.image);
    };
    fetchProductData();
  }, []);

  //! update product
  const onProductUpdate = async () => {
    // if neither name, description or price updated => return
    if (
      !user ||
      !product ||
      !refProductName.current ||
      !refProductDescription.current ||
      !refProductPrice.current
    )
      return;

    // update object for sending to API
    const productUpdate: IProductUpdate = {
      name: refProductName.current.value,
      description: refProductDescription.current.value,
      price: refProductPrice.current.value,
    };

    // image update => if user picked a new image => place it inside update
    if (image) productUpdate.image = image;

    // send update data to API (backend)
    const productUpdated = await updateProductApi(
      user.token,
      product._id,
      productUpdate
    );
    console.log(productUpdated);

    // update product in list of products using map
    const productsUpdated = products.map((_product) => {
      return _product._id === product._id ? productUpdated : _product;
    });
    setProducts(productsUpdated);
    setProduct(productUpdated);
    setEditMode(false);
  };
  if (!product) return <div>Products loading...</div>;

  return (
    <div className="Details">
      <div className="product-details">
        <div>
          {image && (
            <ImagePicker
              className="product-image"
              image={image}
              setImage={setImage}
              style={{ width: "15rem" }}
            />
          )}
        </div>

        {editMode ? (
          // show edit files
          <div className="product-edit">
            <input
              defaultValue={product.name}
              type="text"
              ref={refProductName}
            />
            <input
              defaultValue={product.description}
              type="text"
              ref={refProductDescription}
            />
            {/* <textarea defaultValue={product.description} type="text" ref={refProductDescription}/> */}
            <input
              defaultValue={product.price}
              type="text"
              ref={refProductPrice}
            />
            <div className="edit-icons">
              <MdSaveAlt className="save" onClick={onProductUpdate} />
              <MdCancel className="cancel" onClick={() => setEditMode(false)} />
            </div>
          </div>
        ) : (
          <div className="item">
            <div className="name">{product?.name}</div>
            <div className="description">{product?.description}</div>
            <div className="price">{product?.price} 💲</div>
            <div className="create">
              <span className="avatar">
                <img src={product?.author?.avatar} />
              </span>
              <span className="author">{product?.author?.name}</span>
              <span className="date">{product?.createdAt?.slice(0, 10)}</span>
            </div>
          </div>
        )}
        <div className="edit" onClick={() => setEditMode(!editMode)} style={{cursor: 'pointer'}}>
          🖊
        </div>
      </div>
    </div>
  );
};
