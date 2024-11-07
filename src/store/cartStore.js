import { create } from "zustand";
import axios from "axios";

import useAuthStore from "./authStore.js";
import {
  addItemsToCart,
  addToCart,
  apiBaseUrl,
  getCartItems,
  removeFromCart,
  updateCart,
} from "../constants/ApiConstants";

// Access token outside the component
const authStore = useAuthStore.getState();
const token = authStore.token;

const useCartStore = create((set) => ({
  cartItems: (!token && JSON.parse(localStorage.getItem("cartItems"))) || null,
  error: "",
  loading: false,
  fetchLoader: true,

  getCartItems: async () => {
    set({ fetchLoader: true, error: "" });
    try {
      // check if you are logged in
      if (!token) {
        const localCartItems = await JSON.parse(
          localStorage.getItem("cartItems")
        );

        set({ fetchLoader: false, cartItems: localCartItems });
      }
      // call api
      if (token) {
        const res = await axios.get(apiBaseUrl + getCartItems, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        });

        set({ cartItems: res?.data?.myCart?.cart_items });
        set({ fetchLoader: false, error: "" });
      }
    } catch (error) {
      console.log(error, "ERrro while getting cart info");
      set({ fetchLoader: false, error: error });
    }
  },

  // Add all localStorage items cart
  addAllItemsToCart: async () => {
    set({ loading: true, error: "" });
    try {
      // Store in local-storage
      if (!token) {
        set({ loading: false, error: "" });
        console.log("Cant sync all items as ,No token is provided!!");
        return;
      }

      const localStorgCartItems = await JSON.parse(
        localStorage.getItem("cartItems")
      );

      const items = localStorgCartItems?.map((item) => {
        return {
          product_id: item?.product_id,
          quantity: item?.quantity,
          price: item?.price,
        };
      });

      if (token && items?.length === 0) {
        set({ loading: false, error: "" });
        console.log(items, token, "No cartitems to sync");
        return;
      }

      // If token call api
      const response = await axios.post(
        apiBaseUrl + addItemsToCart,
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        }
      );

      console.log("Sync--cart items", response);

      // clear local cart
      localStorage.setItem("cartItems", JSON.stringify([]));

      set({ loading: false, error: "" });

      return response;

      // prepare Object
      // if token store inot DB
      // else store into local
    } catch (error) {
      console.log(error, "Error while adding item into cart");
      set({ loading: false, error: error });
    }
  },

  addItemToCart: async (cartItem) => {
    set({ loading: true, error: "" });
    try {
      // Store in local-storage
      if (!token) {
        // Retrieve the existing cart from localStorage (or create an empty array if it doesn't exist)
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Check if the item already exists in the cart
        const existingItemIndex = cartItems.findIndex(
          (item) => item.productId === cartItem.product_id
        );

        if (existingItemIndex !== -1) {
          // If item exists, update the quantity
          cartItems[existingItemIndex].quantity += cartItem.quantity;
        } else {
          // If item does not exist, add the new item
          cartItems.push(cartItem);
        }

        // Store the updated cartItems array back into localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        set({ loading: false, error: "" });
        return "added locally";
      }

      // If token call api
      const response = await axios.post(
        apiBaseUrl + addToCart,
        {
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          price: cartItem.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        }
      );

      console.log(response);

      set({ loading: false, error: "" });

      return response;

      // prepare Object
      // if token store inot DB
      // else store into local
    } catch (error) {
      console.log(error, "Error while adding item into cart");
      set({ loading: false, error: error });
    }
  },

  removeItemFromCart: async (cartItemId) => {
    set({ loading: true, error: "" });
    try {
      // Delete from local storage
      if (!token) {
        // Retrive cart items
        const tempCartItems = await JSON.parse(
          localStorage.getItem("cartItems")
        );

        // Filter out the item with the specified ID
        const updatedCartItems = tempCartItems.filter(
          (item) => item?.product_id !== cartItemId
        );

        // Update localStorage with the new cart items
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        set({ loading: false, error: "" });

        return true;
      }

      const res = await axios.delete(
        `${apiBaseUrl + removeFromCart}${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        }
      );

      console.log(res);

      set({ loading: false, error: "" });
      return res;
    } catch (error) {
      set({ loading: false, error: error });
      console.log(error, "Error while removing item from cart..");
    }
  },

  updateCartItemQuantity: async (cartItemId, quantity) => {
    set({ loading: true, error: "" });
    try {
      // Handle localStorage quantity incre/decre
      if (!token) {
        // Retrive cart items
        const tempCartItems = await JSON.parse(
          localStorage.getItem("cartItems")
        );

        // Retrive item by cartItemId and update qunatity
        const updatedCartItems = tempCartItems?.map((item) => {
          // if this is produt to update
          if (item?.product_id === cartItemId)
            return { ...item, quantity: quantity };

          return item;
        });

        // Update localStorage with the new cart items
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        set({ loading: false, error: "" });

        return true;
      }

      // Handle when logged inn
      if (token) {
        const res = await axios.put(
          `${apiBaseUrl + updateCart}${cartItemId}`,
          {
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the Authorization header
            },
          }
        );

        set({ loading: false, error: "" });
        return res;
      }
    } catch (error) {
      set({ loading: false, error: error });
      console.log(error, "Error while Incre / Decremening item quantity..");
    }
  },
}));

export default useCartStore;
