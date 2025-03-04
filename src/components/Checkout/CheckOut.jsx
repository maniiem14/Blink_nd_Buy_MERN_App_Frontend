import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import TableProduct from "../TableProducts/TableProduct";

const Checkout = () => {
  const { cart, selectedAddress, url, user, clearCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  // const { selectedAddress } = useContext(AppContext);

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/shipping");
  };

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

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: quantity,
        cartItems: cart?.items,
        userShipping: selectedAddress,
        userId: user._id,
      });

      const { orderId, amount: orderAmount } = orderResponse.data;
      const key = import.meta.env.VITE_RAZORPAY_KEY;

      if (!key) {
        console.error("Payment key is missing");
        return;
      }

      const options = {
        key,
        amount: orderAmount * 100,
        currency: "INR",
        name: "Blink & Buy",
        description: "BlinkndBuy-payment ",

        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: selectedAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );

          console.log("razorpay res ", api.data);

          if (api.data.success) {
            clearCart();
            navigate("/orderconfirmation");
          }
        },
        prefill: {
          name: "Blink nd Buy",
          email: "blinkndbuy@gmail.com",
          contact: "5801584675",
        },
        notes: {
          address: "Manpur Gaya Bihar",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container my-3">
        <div className="container">
          <span
            className="btn btn-outline-dark"
            onClick={goBack}
            style={{ width: "50px" }}
          >{`←`}</span>
          <h1 className="text-center mb-4">Order Summary</h1>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered ">
            <thead className="">
              <tr>
                <th scope="col" className="text-dark text-center">
                  Product Details
                </th>

                <th scope="col" className=" text-dark text-center">
                  Shipping Address
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr>
                <td className=" text-light">
                  <TableProduct cart={cart} />
                </td>
                <td className=" text-dark">
                  <ul style={{ fontWeight: "bold" }}>
                    <li>Name : {selectedAddress?.fullName}</li>
                    <li>Phone : {selectedAddress?.phoneNumber}</li>
                    <li>Country : {selectedAddress?.country}</li>
                    <li>State : {selectedAddress?.state}</li>
                    <li>PinCode : {selectedAddress?.pincode}</li>
                    <li>Near By : {selectedAddress?.address}</li>
                  </ul>
                  <span className="btn btn-outline-dark mt-2" onClick={goBack}>
                    Change Address
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="container text-center my-5" >
        <button
          className="btn btn-outline-dark btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Procced To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
