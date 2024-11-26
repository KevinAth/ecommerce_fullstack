import { ProductsCard } from "../../components/ProductsCard";
import { useContext, useState, useEffect } from "react";
import { ProdContext } from "../../context/ProductsContext";
import { FilterByPrice } from "../../components/common/FilterByPrice";
import { useParams } from "react-router-dom";
import { SearchProducts } from "../../api/api_products";

export function ProductsSearch() {
  const { search } = useParams();
  const [products, setProducts] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function loadProducts(search) {
      try {
        const res = await SearchProducts(search);
        setProducts(res.data);
      } catch (error) {
        if (error.response) {
          setMensaje(error.response.data.mensaje);
        }
      }
    }
    loadProducts(search);
  }, [search]);

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
              {mensaje && <h1>{mensaje}</h1>}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-2">
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
