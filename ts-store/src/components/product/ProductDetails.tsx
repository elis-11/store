import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { getProductApi } from "../../helpers/ApiCalls";
import { IProduct } from "../../types/product.types";
import { ImagePicker } from "./ImagePicker";

export const ProductDetails = () => {
  const { user, products, setProducts } = useDataContext();
  const [editMode, setEditMode] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const [image, setImage] = useState<string>();

  const { id } = useParams();

  const refProductName = useRef<HTMLInputElement>(null);
  const refProductDescription = useRef<HTMLInputElement>(null);
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
        <div className="item">
          <div className="name">{product?.name}</div>
          <div className="description">{product?.description}</div>
          <div className="price">{product?.price} 💲</div>
          <div className="create">
            <span className="avatar" >
            <img src={product?.author?.avatar} />
            </span>
            <span className="author">
              {product?.author?.name} 
              </span>
              <span className="date">
              {product?.createdAt?.slice(0, 10)}
            </span>
            <div className="edit">🖊</div>
          </div>
        </div>
      </div>
    </div>
  );
};
