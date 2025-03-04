import React, { useContext, useEffect, useState } from "react";
import ShowOrderProduct from "../ShowOrderProduct/ShowOrderProduct";
import AppContext from "../../context/AppContext";

const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});

  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  return (
    <div className="container my-5">
      {/* Order Confirmation Message */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">🎉 Your Order is Confirmed!</h2>
        <p className="text-muted fs-5">It will be delivered soon 🚚</p>
      </div>

      <div className="row g-4">
      <div className="col-lg-6">

      <div className=" shadow border-0 p-3">
        <ShowOrderProduct items={latestOrder?.orderItems} />
      </div>
      </div>


        <div className="col-lg-6">
          <div className="card shadow border-0 p-3 mb-3">
            <h4 className="fw-bold mb-3">📦 Order Details</h4>
            <hr />
            <ul className="list-unstyled">
              <li><strong>Order ID:</strong> {latestOrder?.orderId}</li>
              <li><strong>Payment ID:</strong> {latestOrder?.paymentId}</li>
              <li><strong>Payment Status:</strong> {latestOrder?.payStatus}</li>
            </ul>
          </div>

          <div className="card shadow border-0 p-3">
            <h4 className="fw-bold mb-3">📍 Shipping Address</h4>
            <hr />
            <ul className="list-unstyled">
              <li><strong>Name:</strong> {latestOrder?.userShipping?.fullName}</li>
              <li><strong>Phone:</strong> {latestOrder?.userShipping?.phoneNumber}</li>
              <li><strong>Country:</strong> {latestOrder?.userShipping?.country}</li>
              <li><strong>State:</strong> {latestOrder?.userShipping?.state}</li>
              <li><strong>Pin Code:</strong> {latestOrder?.userShipping?.pincode}</li>
              <li><strong>Address:</strong> {latestOrder?.userShipping?.address}</li>
            </ul>
          </div>
        </div>      
      </div>
    </div>
  );
};

export default OrderConfirmation;

