// import { useRef, useState } from "react";
// import { useDataContext } from "../../context/DataProvider";
// import { updateProductApi } from "../../helpers/ApiCalls";
// import { IProduct } from "../../types/product.types";

// export const EditProduct = () => {
//   const { user, products, setProducts, errors, setErrors } = useDataContext();

//   const [editMode, setEditMode] = useState(false);
//   const [product, setProduct] = useState<IProduct>();
//   const [image, setImage] = useState<string>();

//   const refProductName = useRef<HTMLInputElement>(null);
//   const refProductDescription = useRef<HTMLInputElement>(null);
//   const refProductPrice = useRef<HTMLInputElement>(null);

//   //! edit
//   const onProductUpdate = async () => {
//     // if neither name, description or price updated => return
//     if (
//       !user ||
//       !product ||
//       !refProductName.current ||
//       !refProductDescription.current ||
//       !refProductPrice.current
//     )
//       return;

//     // update obj for sending to API
//     const productUpdate: IProductUpdate = {
//       name: refProductName.current.value,
//       description: refProductDescription.current.value,
//       price: refProductPrice.current.value,
//     };

//     // image update
//     if (image) productUpdate.image = image;

//     // send update data to API (backend)
//     const productUpdated = await updateProductApi(
//       user.token,
//       product._id,
//       productUpdate
//     );
//     console.log(productUpdated);

//     // update Product in list of products using map!
//     const productsUpdated = products.map((_product) => {
//       return _product._id === product._id ? productUpdated : _product;
//     });
//     setProducts(productsUpdated); // put copy into state => overwrite products
//     setProduct(productUpdated); // update Product in current page
//     setEditMode(false);
//   };

//   return (
//     <div>
//     {/* edit-image */}
//     {image && (
//       <ImagePicker
//         image={image}
//         setImage={setImage}
//         className="product-image"
//       />
//     )}
//   </div>
//   {editMode ? (
//     <div className="product-edit">
//       <input
//         defaultValue={product.name}
//         type="text"
//         ref={refProductName}
//       />
//       <input
//         defaultValue={product.description}
//         type="text"
//         ref={refProductDescription}
//       />
//       <input
//         defaultValue={product.price}
//         type="text"
//         ref={refProductPrice}
//       />
//       <div className="edit-icons">
//         <span
//           className="save"
//           style={{ cursor: "pointer" }}
//           onClick={onProductUpdate}
//         >
//           ✅
//         </span>
//         <span
//           className="cancel"
//           style={{ cursor: "pointer" }}
//           onClick={() => setEditMode(false)}
//         >
//           ❌
//         </span>
//       </div>
//     </div>
//   ) : (
//     )}
//     <div className="icons">
//       <div
//         className="edit"
//         onClick={() => setEditMode(!editMode)}
//         style={{ cursor: "pointer" }}
//       >
//         🖊
//       </div>
//       {/* <FaTrashAlt
//         className="delete"
//         role="button"
//         onClick={() => handleDelete(product._id)}
//       /> */}
//       <div
//         className="delete"
//         onClick={() => handleDelete(product._id)}
//       >
//         🗑
//       </div>
//     </div>
//   </div>

//   )
// };
