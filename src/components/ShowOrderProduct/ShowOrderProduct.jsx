import React, { useEffect, useState } from "react";

const ShowOrderProduct = ({ items }) => {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    if (items) {
      items.forEach((item) => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
      });
    }
    setPrice(totalPrice);
    setQuantity(totalQuantity);
  }, [items]);

  return (
    <div className="container">

      {/* Order List */}
      <div className="list-group">
        {items?.map((product) => (
          <div
            key={product._id}
            className="list-group-item d-flex align-items-center justify-content-between p-3 border-0 border-bottom"
          >
            <div className="d-flex align-items-center">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="rounded border"
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />
              <div className="mx-5">
                <h6 className="fw-bold">{product.title}</h6>
                <p className="mb-1 text-muted">
                  Price: <span className="fw-bold">₹{product.price}</span>
                </p>
                <p className="mb-0 text-muted">
                  Qty: <span className="fw-bold">{product.quantity}</span>
                </p>
              </div>
            </div>
            <span className="fw-bold text-primary fs-5">₹{product.price * product.quantity}</span>
          </div>
        ))}
      </div>

      {/* Total Price & Quantity */}
      <div className=" p-3 mt-4">
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold">Total</h5>
          <div>
            <span className="badge bg-warning fs-6 me-2">₹{price}</span>
            <span className="badge bg-info fs-6">{quantity} Items</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderProduct;
