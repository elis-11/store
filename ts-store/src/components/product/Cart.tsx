import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { IContextData } from "../../types/user.types";

export const Cart = () => {

  const context:IContextData = useDataContext();

  return (
    <>
      {/* <div className="Cart">
      <h2>Cart noch nicht gemacht...🤫</h2>
      <div className="cart-Content">
        habe created und rauskommentiert!
        Da, es bei mir, gar nicht functioniert, leider... ⚡ ☕
      </div>
    </div> */}
      {context.items.length === 0 && (
        <div className="empty" style={{marginTop: "5rem"}}>
          <img src="/images/bag12.png" alt="empty" />
          <h3>Whoops... Your bag is empty</h3>
          <h4>Looks like you haven't added anything to your bag yet.</h4>
        </div>
      )}
      {context.items.length > 0 && (
        <div className="wrapper">
          <div className="cart">
            {context.items.map((product) => {
              return (
                <div className="product" key={product._id}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <div className="name">{product?.name}</div>
                    <button
                      type="button"
                      onClick={() => context.removeItem(product)}
                      className="remove"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={product.amount}
                      readonly
                      disabled
                    />
                    <button
                      type="button"
                      onClick={() => context.addItem(product)}
                      className="add"
                    >
                      +
                    </button>
                  </div>
                  <div className="price">
                    {`$${product.price * product.amount}`}
                  </div>
                </div>
              );
            })}
          </div>

          <section className="summary">
            <h3>Order Summary</h3>
            <div>
              <div>
                <div>Order</div>

                <span>{`$${context.totalPrice}`}</span>
              </div>

              <div>
                <span>Delivery</span>
                <span>$10</span>
              </div>

              <div>
                <span>Total</span>
                <span>{`$${context.totalPrice + 10}`}</span>
              </div>
            </div>

            <Link to="/checkout">
              <button className="checkout">Place Order</button>
            </Link>

          </section>
        </div>
      )}
    </>
  );
};
