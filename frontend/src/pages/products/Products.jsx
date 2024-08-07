import { ProductsCard } from "../../components/ProductsCard";
import { useContext } from "react";
import { ProdContext } from "../../context/ProductsContext";
import { FilterByPrice } from "../../components/common/FilterByPrice";

export function Products() {
  const { products, setProducts } = useContext(ProdContext);

  return (
    <>
      <div className="grid grid-cols-5 mx-24 my-5">
        <div className=" col-span-1">
          <div>
            <FilterByPrice setProducts={setProducts} />
          </div>
        </div>
        <div className=" col-span-4">
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Productos</h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((prod, index) => (
                  <div key={index}>
                    <ProductsCard prod={prod} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
