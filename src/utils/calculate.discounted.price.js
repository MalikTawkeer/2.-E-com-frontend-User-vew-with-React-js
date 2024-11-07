const calculateDiscountedPrice = (orginalPrice, discount = {}) => {
  let newPrice = "";

  // Handle units case
  if (discount?.discount_type === "units") {
    newPrice = orginalPrice - discount?.value;

    return newPrice;
  }

  // Handle percentage case
  if (discount?.discount_type === "percentage") {
    newPrice = orginalPrice - (orginalPrice * discount?.value) / 100;

    return newPrice;
  }
};

export default calculateDiscountedPrice;
