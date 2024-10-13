import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";

const Swipper = ({ product_images }) => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth <= 768) {
        setDeviceType("mobile");
      } else {
        setDeviceType("laptop");
      }
    };

    // Check on mount
    checkDevice();

    // Add event listener to check on window resize
    window.addEventListener("resize", checkDevice);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const formattedImages = product_images.map((image) => ({
    original: image?.url,
    thumbnail: image?.url,
  }));

  return (
    <ImageGallery
      showBullets={true}
      showIndex={true}
      showNav={false}
      slideOnThumbnailOver={true}
      thumbnailPosition={deviceType === "laptop" ? "left" : "bottom"}
      items={formattedImages}
    />
  );
};

export default Swipper;
