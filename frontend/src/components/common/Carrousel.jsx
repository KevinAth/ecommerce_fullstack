import atras from "../../assets/atras.png";
import adelante from "../../assets/adelante.png";
import "../../styles/image.css";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";

import { useState } from "react";

export function Carrousel() {
  const images = [banner1, banner2];
  const [image, setImage] = useState(0);

  function prevImage() {
    setImage(image === 0 ? images.length - 1 : image - 1);
  }

  function nextImage() {
    setImage(image === images.length - 1 ? 0 : image + 1);
  }

  return (
    <div className="relative w-full lg:w-full md:w-full mx-auto overflow-hidden rounded-lg">
      {/* Container for image with fade effect */}
      <div className="relative w-full h-[500px] transition-opacity duration-500 ease-in-out">
        <img
          src={images[image]}
          alt={`Banner ${image + 1}`}
          className="w-full h-full object-cover"
          style={{ aspectRatio: "16/9" }}
        />
      </div>
      <button
        onClick={prevImage}
        aria-label="Previous"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-100 text-gray-700 p-2 rounded-full shadow-md hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <img src={atras} alt="Previous" className="w-6" />
      </button>
      <button
        onClick={nextImage}
        aria-label="Next"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-100 text-gray-700 p-2 rounded-full shadow-md hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <img src={adelante} alt="Next" className="w-6" />
      </button>
    </div>
  );
}
