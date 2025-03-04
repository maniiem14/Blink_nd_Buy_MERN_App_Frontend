import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "https://blink-nd-buy-mern-e-commerce-app.onrender.com/api";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setfilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [cartReload, setCartReload] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    JSON.parse(localStorage.getItem("selectedAddress")) || null
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: { "Content-Type": "Application/json" },
          withCredentials: true,
        });
        setProducts(api.data.products);
        if (filteredData.length === 0) {
          setfilteredData(api.data.products);
        }
        userProfile();
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    userCart();
    getAddress();
    user_Order();
  }, [token, cartReload]);

  useEffect(() => {
    const initializeAuth = async () => {
      const lstoken = localStorage.getItem("token");
      if (lstoken) {
        try {
          setToken(lstoken);
          const response = await axios.get(`${url}/user/profile`, {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${lstoken}`,
            },
            withCredentials: true,
          });
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Invalid or expired token", error);
          setIsAuthenticated(false);
          setToken(null);
          localStorage.removeItem("token");
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);

  //   register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    toast(api.data.message, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    return api.data;
  };

  // Login User
  const login = async (email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );

      if (api.data.token) {
        toast(api.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        setToken(api.data.token);
        setIsAuthenticated(true);
        localStorage.setItem("token", api.data.token);
      } else {
        setIsAuthenticated(false);
        toast.error(api.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }

      return api.data;
    } catch (error) {
      setIsAuthenticated(false);
      toast.error("Login failed. Please try again later.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // Logout User
  const logout = async () => {
    try {
      await axios.post(
        `${url}/user/logout`,
        {},
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast("Logout Successfully", {
        position: "top-center",
        autoClose: 1200,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  // user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },

      withCredentials: true,
    });
    setUser(api.data.user);
  };

  //   Add To Cart
  const addToCart = async (
    productId,
    title,
    description,
    price,
    quantity,
    imgSrc
  ) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, description, price, quantity, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },

        withCredentials: true,
      }
    );
    setCartReload(!cartReload);
  };

  //   User Cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },

      withCredentials: true,
    });
    setCart(api.data.cart);
  };

  //   Decrease Quantity

  const decreaseQty = async (productId, quantity) => {
    const api = await axios.post(
      `${url}/cart/decrease-quantity`,
      { productId, quantity },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },

        withCredentials: true,
      }
    );
    setCartReload(!cartReload);

    toast(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const increaseQty = async (productId, quantity) => {
    const api = await axios.post(
      `${url}/cart/increaseQty`,
      { productId, quantity },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },

        withCredentials: true,
      }
    );
    setCartReload(!cartReload);

    toast(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  //  remove Item from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },

      withCredentials: true,
    });
    setCartReload(!cartReload);

    toast(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  //  clear Cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },

      withCredentials: true,
    });
    setCartReload(!cartReload);

    toast(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  //  Add Shipping Address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },

        withCredentials: true,
      }
    );

    setCartReload(!cartReload);
    toast(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    return api.data;
  };

  // get User latest address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },

      withCredentials: true,
    });
    setUserAddress(api.data.userAddress);
  };

  // get all addresses
  const getAllAddresses = async () => {
    const api = await axios.get(`${url}/address/addresses`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },

      withCredentials: true,
    });

    console.log("getalladdress", api);
  };

  // get User order
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },

      withCredentials: true,
    });
    setUserOrder(api.data);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setfilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        increaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        setUserAddress,
        userOrder,
        getAddress,
        getAllAddresses,
        loading,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
