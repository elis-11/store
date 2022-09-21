import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { deleteProductApi, getProductsApi } from "../../helpers/ApiCalls";
import { IProduct } from "../../types/product.types";
import { FaTrashAlt } from "react-icons/fa";
import "./Admin.scss";
import { ProductList } from "./ProductList";

export const Products = () => {
  const { user, products, setProducts, errors, setErrors } = useDataContext();
  const [search, setSearch] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
      // navigate("/products")
    };
    loadData();
  }, []);

  //! search
  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
  );

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
      <ProductList products={filteredProducts} />
    </div>
  );
};
