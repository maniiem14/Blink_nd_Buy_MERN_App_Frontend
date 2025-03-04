// import React, { useContext } from "react";
// import ShowOrderProduct from "../../ShowOrderProduct/ShowOrderProduct";
// import AppContext from "../../../context/AppContext";

// const AllOrders = () => {
//   const { userOrder } = useContext(AppContext);
//   return (
//     <div className="table-responsive">
//       <div className="container my-5">
//         <h1 className="text-center my-3">
//           Total Orders: {userOrder?.length || 0}
//         </h1>
//         <table className="table table-bordered border-primary ">
         
//           <tbody className="">
//             {userOrder && userOrder.length > 0 ? (
//               userOrder.map((product) => (
//                 <div className="d-flex" key={product._id}>
//                   <td className="">
//                     <ShowOrderProduct items={product?.orderItems} />
//                   </td>
//                   <ul className="list-unstyled">
//                     <ul style={{ fontWeight: "bold" }}>
//                       <li>OrderId: {product?.orderId}</li>
//                       <li>PaymentId: {product?.paymentId}</li>
//                       <li>PaymentStatus: {product?.payStatus}</li>
//                       <li>Name: {product?.userShipping?.fullName}</li>
//                       <li>Phone: {product?.userShipping?.phoneNumber}</li>
//                       <li>Country: {product?.userShipping?.country}</li>
//                       <li>State: {product?.userShipping?.state}</li>
//                       <li>PinCode: {product?.userShipping?.pincode}</li>
//                       <li>Near By: {product?.userShipping?.address}</li>
//                     </ul>
//                   </ul>
//                 </div>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={2} className="text-center">
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllOrders;















// 2nd Code


import React, { useContext } from "react";
import ShowOrderProduct from "../../ShowOrderProduct/ShowOrderProduct";
import AppContext from "../../../context/AppContext";
import { faCircleCheck, faCircleXmark, faLocationDot, faPhoneFlip, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AllOrders = () => {
  const { userOrder } = useContext(AppContext);

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Your Orders ({userOrder?.length || 0})</h2>

      {userOrder && userOrder.length > 0 ? (
        <div className="col">
          {userOrder.map((order) => (
            <div key={order._id} className="col-md-6 col-lg-12 mb-5">
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-header  text-dark  fw-bold">
                <h4 className="fw-bold mb-3">🛍️ Ordered Products</h4>
                  
                </div>

                <div className="card-body">
                  <h4>Order ID: {order?.orderId}</h4>
                  {/* Order Items */}
                  <div className="mb-3">
                    <ShowOrderProduct items={order?.orderItems} />
                  </div>

                  {/* Order Details */}
                  <div className="mb-2">
                    <span className="fw-bold">Payment ID:</span> {order?.paymentId}
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">Payment Status:</span>
                    {order?.payStatus === "paid" ? (
                      <span className="badge bg-success">
                        <FontAwesomeIcon icon={faCircleCheck} /> Paid
                      </span>
                    ) : (
                      <span className="badge bg-warning text-dark">
                        <FontAwesomeIcon icon={faCircleXmark} />Pending
                      </span>
                    )}
                  </div>

                  {/* Shipping Address */}
                  <hr />
                  <h6 className="fw-bold mb-2">Shipping Details</h6>
                  <div className="mb-2">
                    <FontAwesomeIcon icon={faUser} className="me-2 text-primary" />
                    {order?.userShipping?.fullName}
                  </div>
                  <div className="mb-2">
                    <FontAwesomeIcon icon={faPhoneFlip} className="me-2 text-success" />
                    {order?.userShipping?.phoneNumber}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} className="me-2 text-danger" />
                    {order?.userShipping?.address}, {order?.userShipping?.state}, {order?.userShipping?.country} - {order?.userShipping?.pincode}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="lead fw-bold">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default AllOrders;




























// 3rd code -----------------------------------



// import React, { useContext } from "react";
// import ShowOrderProduct from "../../ShowOrderProduct/ShowOrderProduct";
// import AppContext from "../../../context/AppContext";
// import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaPhone, FaUser, FaReceipt } from "react-icons/fa";

// const AllOrders = () => {
//   const { userOrder } = useContext(AppContext);

//   return (
//     <div className="container my-5">
//       <h2 className="text-center fw-bold mb-4">Your Orders ({userOrder?.length || 0})</h2>

//       {userOrder && userOrder.length > 0 ? (
//         <div className="row g-4">
//           {userOrder.map((order) => (
//             <div key={order._id} className="col-md-6">
//               <div className="card shadow-sm border-0 rounded-4">
//                 <div className="card-header bg-light border-0 d-flex justify-content-between align-items-center">
//                   <span className="fw-bold text-muted">
//                     <FaReceipt className="me-2 text-primary" /> Order ID: {order?.orderId}
//                   </span>
//                   <span className={`badge ${order?.payStatus === "Paid" ? "bg-success" : "bg-warning text-dark"}`}>
//                     {order?.payStatus === "Paid" ? (
//                       <>
//                         <FaCheckCircle className="me-1" /> Paid
//                       </>
//                     ) : (
//                       <>
//                         <FaTimesCircle className="me-1" /> Pending
//                       </>
//                     )}
//                   </span>
//                 </div>

//                 <div className="card-body p-4">
//                   {/* Order Items */}
//                   <div className="mb-3">
//                     <ShowOrderProduct items={order?.orderItems} />
//                   </div>

//                   {/* Payment Details */}
//                   <div className="border-top pt-3">
//                     <div className="mb-2">
//                       <span className="fw-bold">Payment ID:</span> {order?.paymentId}
//                     </div>
//                   </div>

//                   {/* Shipping Details */}
//                   <div className="border-top pt-3">
//                     <h6 className="fw-bold text-primary mb-3">Shipping Details</h6>
//                     <p className="mb-2">
//                       <FaUser className="me-2 text-primary" /> {order?.userShipping?.fullName}
//                     </p>
//                     <p className="mb-2">
//                       <FaPhone className="me-2 text-success" /> {order?.userShipping?.phoneNumber}
//                     </p>
//                     <p className="mb-0">
//                       <FaMapMarkerAlt className="me-2 text-danger" />
//                       {order?.userShipping?.address}, {order?.userShipping?.state}, {order?.userShipping?.country} - {order?.userShipping?.pincode}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center">
//           <p className="lead fw-bold">No orders found.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllOrders;
