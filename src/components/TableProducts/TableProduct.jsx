import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const TableProduct = ({ cart }) => {
  const { decreaseQty, increaseQty, removeFromCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let quantity = 0;
    let price = 0;

    if (cart?.items?.length > 0) {
      cart.items.forEach((item) => {
        quantity += item.quantity;
        price += item.price * item.quantity;
      });
      setPrice(price);
      setQuantity(quantity);
    } else {
      const timer = setTimeout(() => {
        navigate("/");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [cart, navigate]);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {cart?.items?.length === 0 ? null : (
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col" className="text-dark">
                Product Img
              </th>
              <th scope="col" className="text-dark">
                Title
              </th>
              <th scope="col" className="text-dark">
                Price
              </th>
              <th scope="col" className="text-dark">
                Qty
              </th>
              <th scope="col" className="text-dark">
                Qty+
              </th>
              <th scope="col" className="text-dark">
                Qty-
              </th>
              <th scope="col" className="text-dark">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {cart?.items?.map((product) => (
              <tr key={product._id}>
                <th scope="row" className="text-dark">
                  <img
                    src={product.imgSrc}
                    style={{ width: "50px", height: "50px" }}
                  />
                </th>
                <td className="text-dark">{product.title}</td>
                <td className="text-dark">{product.price}</td>
                <td className="text-dark">{product.quantity}</td>
                <td className="text-dark cursor">
                  <span
                    role="button"
                    className="material-symbols-outlined"
                    onClick={() => increaseQty(product?.productId, 1)}
                  >
                    add_circle
                  </span>
                </td>
                <td className="text-dark">
                  <span
                    role="button"
                    className="material-symbols-outlined"
                    onClick={() => decreaseQty(product?.productId, 1)}
                  >
                    do_not_disturb_on
                  </span>
                </td>
                <td className="text-dark">
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
                </td>
              </tr>
            ))}

            {showModal && (
              <div className="modal-backdrop">
                <div className="modal-content">
                  <h3>Are you sure?</h3>
                  <p>Do you want to remove this item from the cart?</p>
                  <div className="modal-actions">
                    <button
                      className="btn btn-danger"
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
            <tr>
              <th scope="row" className="text-dark"></th>
              <td className="text-dark justify-content-center">
                <span
                  className="btn btn-primary"
                  style={{ fontWeight: "bold" }}
                >
                  Total
                </span>
              </td>
              <td className="text-dark">
                <span
                  className="btn btn-warning"
                  style={{ fontWeight: "bold" }}
                >
                  {price}
                </span>
              </td>
              <td className="text-dark">
                <span className="btn btn-info" style={{ fontWeight: "bold" }}>
                  {quantity}
                </span>
              </td>
              <td className="text-dark"></td>
              <td className="text-dark"></td>
              <td className="text-dark"></td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default TableProduct;
