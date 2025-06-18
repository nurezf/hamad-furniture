import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user data when token changes
  const fetchUserData = async () => {
    // if (!token) return;
    // try {
    //   const response = await axios.get(backendUrl + "/api/user/profile", {
    //     headers: { token },
    //   });
    //   if (response.data.success) {
    //     setUserData(response.data.user);
    //   } else {
    //     toast.error(response.data.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   if (error.response?.status === 401) {
    //     // Token expired or invalid
    //     localStorage.removeItem("token");
    //     setToken("");
    //     navigate("/login");
    //   }
    // }
  };

  // Update user profile
  const updateUserProfile = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone || "");
      formDataToSend.append("address", formData.address || "");
      formDataToSend.append("bio", formData.bio || "");
      if (formData.password)
        formDataToSend.append("password", formData.password);
      if (formData.newPassword)
        formDataToSend.append("newPassword", formData.newPassword);
      if (formData.profilePhoto)
        formDataToSend.append("profilePhoto", formData.profilePhoto);

      const response = await axios.put(
        backendUrl + "/api/user/profile",
        formDataToSend,
        config
      );

      if (response.data.success) {
        // setUserData(response.data.user);
        toast.success("Profile updated successfully");
        return response.data;
      } else {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Profile update failed");
      throw error;
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select color");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products.reverse());
        console.log(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.get(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Initialize on component mount
  useEffect(() => {
    getProductsData();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Handle token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUserCart(token);
      fetchUserData();
    } else {
      localStorage.removeItem("token");
      // setUserData(null);
    }
  }, [token]);

  const value = {
    products,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    userData,
    updateUserProfile,
    fetchUserData,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
