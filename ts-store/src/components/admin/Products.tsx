import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { deleteProductApi, getProductsApi } from "../../helpers/ApiCalls";
import { IProduct } from "../../types/product.types";
import { FaTrashAlt } from "react-icons/fa";
import "./Admin.scss";

export const Products = () => {
  const { user, products, setProducts, errors, setErrors } = useDataContext();
  const [search, setSearch] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // fetch data from backend on LOAD
  // and afterwards store them in context
  useEffect(() => {
    // only fetch data if user is there (logged in)
    const loadData = async () => {
      // get protected adata from backend using token
      const result = await getProductsApi();
      console.log(result);

      // if error from backend (e.g. no valid token) => show the error in UI
      if (result.error) {
        return setErrors(result.error);
      }
      // store received users in our central data state
      setErrors("");
      setProducts(result);
    };
    loadData();
  }, []);

  //! search
  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
  );

  //! edit

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

  //!message "Added to cart"
  const handleAddProductToCart = (product: string) => {
    // show message "Added to cart" (fading away)
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 3000); // hide message again after 3 seconds
  };


  return (
    <div className="Products">
      <header>
        <span className="total">
          {products.length} {products.length === 1 ? "Cake" : "Cakes"}
        </span>
        <div className="Add">
          <NavLink to="/addproduct">Create Product</NavLink>
        </div>
      </header>

      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            autoFocus
            ref={inputRef}
            id="search"
            type="text"
            role="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />{" "}
        </form>
      </div>

      {user && (
        <div className="content">
          {([...filteredProducts] || []).reverse().map((product) => (
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
                  <div className="buy">
                    <span>{product.price} &euro;</span>
                    <Link to={`/products/${product._id}`} state={product}>
                      BUY NOW
                    </Link>
                    {/* <button onClick={() => handleAddProductToCart(product)}>
                      BUY NOW
                    </button>
                    <div className={`msg ${showMsg ? "msg-show" : ""}`}>
                      Added to cart
                    </div> */}
                    {/* <Link to={`/products/${product._id}`} state={product}>
                BUY NOW
              </Link> */}
                  </div>
                </div>
              </div>{" "}
              <div className="icons">
                {/* <FaTrashAlt
                  className="delete"
                  role="button"
                  onClick={() => handleDelete(product._id)}
                /> */}
                <div
                  className="delete"
                  onClick={() => handleDelete(product._id)}
                >
                  &#128465;
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
