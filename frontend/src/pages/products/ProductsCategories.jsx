import { ProductsCard } from "../../components/ProductsCard";
import { useEffect, useState } from "react";
import { ProdContext } from "../../context/ProductsContext";
import { useParams } from "react-router-dom";
import { FilterByPrice } from "../../components/common/FilterByPrice";
import { FilterProds } from "../../api/api_products";

export function ProductsCategories() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts(category) {
      const res = await FilterProds(category);
      setProducts(res.data);
    }
    loadProducts(category);
  }, [category]);

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
