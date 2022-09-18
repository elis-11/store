import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { getProductsApi } from "../../helpers/ApiCalls";
import "./Admin.scss";

export const Products = () => {
  const { user, products, setProducts, errors, setErrors } = useDataContext();

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

  return (
    <div className="Products">
      <h2>Cakes</h2>
      {user && (
        <div className="content">
          {products.map((product) => (
            <div key={product._id} className="product">
              <div>
                <Link to={`/products/${product._id}`} state={product}>
                  <img src={product.image}  />
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
