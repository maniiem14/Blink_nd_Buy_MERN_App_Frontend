// import React from "react";
// import "./App.css";
// import ProductDetails from "./components/product/ProductDetails/ProductDetails";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ShowProduct from "./components/product/ShowProduct/ShowProduct";
// import Navbar from "./components/Navbar/Navbar";
// import Register from "./components/user/Register/Register";
// import { ToastContainer } from "react-toastify";
// import Login from "./components/user/Login/Login";
// import SearchItem from "./components/SearchItem/SearchItem";
// import Profile from "./components/user/Profile/Profile";
// import Cart from "./components/user/Cart/Cart";
// import Address from "./components/Address/Address";
// import Checkout from "./components/Checkout/CheckOut";
// import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
// import SavedAddresses from "./components/AddressList/SavedAddresses";
// import Footer from "./components/Footer/Footer";

// function App() {
//   return (
//     <>
//       <Router>
//         <Navbar />
//         <ToastContainer />
//         <Routes>
//           <Route path="/" element={<ShowProduct />} />
//           <Route path="/product/search/:term" element={<SearchItem />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/orderconfirmation" element={<OrderConfirmation />} />
//           <Route path="/shipping" element={<Address />} />
//           <Route path="/address-list" element={<SavedAddresses />} />
//         </Routes>
//         <Footer/>
//       </Router>
//     </>
//   );
// }

// export default App;
















// OPTIMIZED VERSION

// import React, { Suspense, lazy } from "react";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
// import { ToastContainer } from "react-toastify";

// // Lazy load components
// const ShowProduct = lazy(() => import("./components/product/ShowProduct/ShowProduct"));
// const ProductDetails = lazy(() => import("./components/product/ProductDetails/ProductDetails"));
// const SearchItem = lazy(() => import("./components/SearchItem/SearchItem"));
// const Register = lazy(() => import("./components/user/Register/Register"));
// const Login = lazy(() => import("./components/user/Login/Login"));
// const Profile = lazy(() => import("./components/user/Profile/Profile"));
// const Cart = lazy(() => import("./components/user/Cart/Cart"));
// const Address = lazy(() => import("./components/Address/Address"));
// const Checkout = lazy(() => import("./components/Checkout/CheckOut"));
// const OrderConfirmation = lazy(() => import("./components/OrderConfirmation/OrderConfirmation"));
// const SavedAddresses = lazy(() => import("./components/AddressList/SavedAddresses"));

// function App() {
//   return (
//     <>
//       <Router>
//         <Navbar />
//         <ToastContainer />
//         <Suspense fallback={<div className="loading">Loading...</div>}>
//           <Routes>
//             <Route path="/" element={<ShowProduct />} />
//             <Route path="/product/search/:term" element={<SearchItem />} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/orderconfirmation" element={<OrderConfirmation />} />
//             <Route path="/shipping" element={<Address />} />
//             <Route path="/address-list" element={<SavedAddresses />} />
//           </Routes>
//         </Suspense>
//         <Footer />
//       </Router>
//     </>
//   );
// }

// export default App;





























import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const ShowProduct = lazy(() => import("./components/product/ShowProduct/ShowProduct"));
const ProductDetails = lazy(() => import("./components/product/ProductDetails/ProductDetails"));
const SearchItem = lazy(() => import("./components/SearchItem/SearchItem"));
const Register = lazy(() => import("./components/user/Register/Register"));
const Login = lazy(() => import("./components/user/Login/Login"));
const Profile = lazy(() => import("./components/user/Profile/Profile"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Checkout = lazy(() => import("./components/Checkout/CheckOut"));
const OrderConfirmation = lazy(() => import("./components/OrderConfirmation/OrderConfirmation"));
const Address = lazy(() => import("./components/Address/Address"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <ToastContainer />
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/product/search/:term" element={<SearchItem />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderconfirmation" element={<OrderConfirmation />} />
          <Route path="/shipping" element={<Address />} />
          
        </Routes>
      <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
