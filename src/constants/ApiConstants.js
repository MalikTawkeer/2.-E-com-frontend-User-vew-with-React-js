export const apiBaseUrl = import.meta.env.VITE_API_URL;

// Customer endpoints
export const login = "api/v1/user/login";
export const signup = "api/v1/user/register";
export const forgot_pass = "api/v1/user/forgot-password";
export const reset_pass = "api/v1/user/reset-password";

export const homeFeed = "api/v1/user/homefeed";

// Product endpoints
export const getProductsByCategoryId = "api/v1/products/category/";
export const getProductsByDiscountId = "api/v1/products/discount/";
export const getProductDetailsByProdId = "api/v1/getProductInfoById/";

// Cart endpoints
export const getCartItems = "api/v1/cart/items";
export const addToCart = "api/v1/cart/add";
export const addItemsToCart = "api/v1/cart/add-all";
export const updateCart = "api/v1/cart/update/";
export const removeFromCart = "api/v1/cart/remove/";
