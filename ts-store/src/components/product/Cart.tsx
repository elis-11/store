import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { IContextData } from "../../types/user.types";
import { IProduct, ICartItem } from "../../types/product.types";

export const Cart = () => {
  const context: IContextData = useDataContext();

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
        <div className="wrapper">
          <div className="cart">
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
                    {`$${cartItem.price * cartItem.amount}`}
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
