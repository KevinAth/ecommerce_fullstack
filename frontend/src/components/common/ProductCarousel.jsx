import { useState, useEffect, useContext } from "react";
import { ProdContext } from "../../context/ProductsContext";
import { ProductsCard } from "../ProductsCard";

export const ProductCarousel = ({ items }) => {
  const { products } = useContext(ProdContext);
  const [visibleProductsCount, setVisibleProductsCount] = useState(5);
  
  useEffect(() => {
    const updateVisibleProductsCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleProductsCount(2);
      } else if (width < 768) {
        setVisibleProductsCount(3);
      } else if (width < 1024) {
        setVisibleProductsCount(3);
      } else if (width < 1280) {
        setVisibleProductsCount(5);
      } else {
        setVisibleProductsCount(5);
      }
    };

    updateVisibleProductsCount();
    window.addEventListener("resize", updateVisibleProductsCount);

    return () =>
      window.removeEventListener("resize", updateVisibleProductsCount);
  }, []);
  const extendedProducts = [
    ...products.slice(-visibleProductsCount),
    ...products,
    ...products.slice(0, visibleProductsCount),
  ];

  const [currentIndex, setCurrentIndex] = useState(visibleProductsCount);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(products.length);
      }, 500);
    } else if (
      currentIndex ===
      extendedProducts.length - visibleProductsCount
    ) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(visibleProductsCount);
      }, 500);
    } else {
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [
    currentIndex,
    products.length,
    extendedProducts.length,
    visibleProductsCount,
  ]);

  const getSlideTransform = () => ({
    transform: `translateX(-${(currentIndex * 100) / visibleProductsCount}%)`,
    transition: isTransitioning ? "transform 0.5s ease" : "none",
  });

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={getSlideTransform()}
      >
        {extendedProducts.map((product, index) => (
          <div
            key={index}
            className="flex-none w-1/5 p-2"
            style={{ minWidth: `${100 / visibleProductsCount}%` }}
          >
            <ProductsCard prod={product} />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        {">"}
      </button>
    </div>
  );
};
