import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { getProductsApi } from "../../helpers/ApiCalls";
import "./Admin.scss";

export const Products = () => {
  const { user, products, setProducts, errors, setErrors } = useDataContext();
  const [search, setSearch] = useState("");
  const inputRef= useRef<HTMLInputElement>(null);

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

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Products">
      <h2>Cakes</h2>

      <h3>
        {products.length} {products.length === 1 ? "Cake" : "Cakes"}
      </h3>

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
          {filteredProducts.map((product) => (
            <div key={product._id} className="product">
              <div>
                <Link to={`/products/${product._id}`} state={product}>
                  <img src={product.image} />
                </Link>
              </div>
              <div className="data">
                <div className="name">{product.name}</div>
                <div>{product.description}</div>
                <div className="details">
                  <div className="buy">
                    <span>{product.price} $</span>
                    <Link to={`/products/${product._id}`} state={product}>
                      Buy now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
