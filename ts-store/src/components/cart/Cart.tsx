import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { IContextData } from "../../types/user.types";
import { IProduct, ICartItem } from "../../types/product.types";
import "./Cart.scss";
import { BiEuro } from "react-icons/bi";

export const Cart = () => {
  const context: IContextData = useDataContext();
  const orderTotal = context.totalPrice.toFixed(2);

  //!
  const numberOfItems = context.items.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.amount;
  }, 0);

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
        <div className="empty" style={{ marginTop: "5rem" }}>
          <img src="/images/bag12.png" alt="empty" />
          <h3>Whoops... Your bag is empty</h3>
          <h4>Looks like you haven't added anything to your bag yet.</h4>
        </div>
      )}
      {context.items.length > 0 && (
        <div className="Cart">
          <div className="content">
            {context.items.map((cartItem) => {
              return (
                <div className="product" key={cartItem._id}>
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <div className="name">{cartItem.name}</div>
                    <button
                      type="button"
                      onClick={() => context.removeItem(cartItem._id)}
                      className="remove"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={cartItem.amount}
                      readOnly
                      disabled
                    />
                    <button
                      type="button"
                      onClick={() => context.addItem(cartItem)}
                      className="add"
                    >
                      +
                    </button>
                  </div>

                  <div className="price">
                    {`${cartItem.price.toFixed(2)}`}
                    <BiEuro style={{ fontSize: "1.5em" }} />
                  </div>
                  <div className="price">
                    {`${(cartItem.price * cartItem.amount).toFixed(2)}`}
                    <BiEuro style={{ fontSize: "1.5em" }} />
                  </div>
                </div>
              );
            })}
          </div>

          <section className="summary">
            <h2>Order Summary</h2>
            <div className="content">
              <div className="order">
                <span>Amount</span>
                <span>
                  {numberOfItems} {""}
                  {numberOfItems === 1 ? "cake" : "cakes"}
                </span>
              </div>

              <div className="order">
                <span>Order</span>
                <span className="icon">
                  {`${context.totalPrice.toFixed(2)}`}
                  <BiEuro />
                </span>
              </div>

              <div className="order">
                <span>Delivery</span>
                <span className="icon">
                  10
                  <BiEuro />
                </span>
              </div>

              <div className="order total">
                <span>Total</span>
                <span className="icon">
                  {`${10 + parseFloat(orderTotal)}`}
                  <BiEuro />
                </span>
                {/* <span>{`$${context.totalPrice.toFixed(2)}`}</span> */}
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
