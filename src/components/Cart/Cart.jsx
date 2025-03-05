import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import EmptyCart from "/assets/EmptyCart.webp";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Cart = () => {
  const { cart, decreaseQty, increaseQty, removeFromCart, clearCart } =
    useContext(AppContext);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let quantity = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        quantity += cart.items[i].quantity;
        price += cart.items[i].price * cart.items[i].quantity;
      }
    }
    setPrice(price);
    setQuantity(quantity);
  }, [cart]);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setShowModal(false);
    setSelectedProduct(null);
  };

  // console.log("my cart", cart);
  return (
    <>
      {cart?.items?.length == 0 ? (
        <>
          <div className=" empty-cart ">
            <div className="empty-cart-content">
              <img
                src={EmptyCart}
                alt="Empty Cart"
                width="200px"
                height="200px"
              />
              <p>Your cart is empty !</p>
              <span>Add items to your cart</span>
              <div>
                <button
                  className="btn btn-outline-warning my-3"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping...
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" my-5 d-flex flex-column justify-content-center align-items-center gap-3 ">
            <button
              className="btn btn-outline-success mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Total Qty :- {quantity}
            </button>
            <button
              className="btn btn-outline-warning mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Total Price :- {price}
            </button>
          </div>
        </>
      )}

      {cart?.items?.map((product) => (
        <div key={product._id} className=" cart container ">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt="product image"
                style={{
                  marginRight: "20px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="cart_des">
              <h2>{product.title}</h2>
              <h4>{product.price}</h4>
              <h4>Quantity :- {product.quantity}</h4>
            </div>

            <div className="d-flex cart_action">
              <span
                role="button"
                className="material-symbols-outlined"
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                do_not_disturb_on
              </span>
              <span
                role="button"
                className="material-symbols-outlined"
                onClick={() => increaseQty(product?.productId, 1)}
              >
                add_circle
              </span>
              <span
                role="button"
                className="material-symbols-outlined"
                onClick={() => {
                  setSelectedProduct(product?.productId);
                  setShowModal(true);
                }}
              >
                delete
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Are you sure?</h3>
            <p>Do you want to remove this item from the cart?</p>
            <div className="modal-actions">
              <button
                className="btn btn-outline-danger"
                onClick={() => handleRemove(selectedProduct)}
              >
                Yes, Remove
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {cart?.items?.length > 0 && (
        <div className="d-flex container justify-content-center my-3">
          <button
            className="btn btn-outline-warning mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
          <button
            className="btn btn-outline-danger mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              clearCart();
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
