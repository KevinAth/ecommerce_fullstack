import React, { useContext } from "react";
import { ProdContext } from "../../context/ProductsContext";
import { Carrousel } from "../../components/common/Carrousel";
import { ProductCarousel } from "../../components/common/ProductCarousel";
import { AboutUs } from "../../components/AboutUs";

export function HomePage() {
  const { prods } = useContext(ProdContext);

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-8 lg:p-16 bg-gray-100 min-h-screen">
        <div className="w-max lg:w-2/3  rounded-lg overflow-hidden ">
          <Carrousel />
        </div>
        <div className="w-full lg:w-2/3 rounded-lg ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Productos recomentados
          </h2>
          <ProductCarousel items={5} />
        </div>
        <div className="w-full lg:w-2/3 p-6 bg-white  rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Acerca de nosotros
          </h2>
          <AboutUs />
        </div>
      </div>
    </>
  );
}
