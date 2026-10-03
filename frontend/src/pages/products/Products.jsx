import { ProductsCard } from "../../components/ProductsCard";
import { useContext, useEffect, useState } from "react";
import { ProdContext } from "../../context/ProductsContext";
import { FilterByPrice } from "../../components/common/FilterByPrice";
import { PaginationPage } from "../../components/common/PaginationPage";
import { GetProductsPage } from "../../api/api_products";

export function Products() {
  const { setProducts } = useContext(ProdContext);

  const [page, setPage] = useState(1); // Página actual
  const [productsPage, setProductsPage] = useState([]); // Productos actuales
  const [totalPages, setTotalPages] = useState(1); // Número total de páginas
  
  const [loading, setLoading] = useState(false); // Indicador de carga

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await GetProductsPage(page); // Llamada a la API
        setProductsPage(res.data.products); // Actualiza productos locales
        setProducts(res.data.products); // Actualiza productos en contexto global
        setPage(res.data.current_page); // Sincroniza la página actual
        setTotalPages(res.data.total_pages); // Sincroniza total de páginas
      } catch (error) {
        console.error("Error loading products:", error); // Manejo de errores
      } finally {
        setLoading(false); // Finaliza la carga
      }
    }
    loadProducts();
  }, [page]); // Actualiza productos al cambiar la página

  return (
    <>
      <div className="grid grid-cols-5 mx-24 my-5">
        {/* Filtros */}
        <div className="col-span-1">
          <FilterByPrice setProducts={setProducts} />
        </div>

        {/* Productos y paginación */}
        <div className="col-span-4">
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Productos</h2>

              {/* Carga de productos */}
              {loading ? (
                <div className="text-center text-gray-500">
                  Cargando productos...
                </div>
              ) : productsPage.length === 0 ? (
                <div className="text-center text-gray-500">
                  No hay productos disponibles.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {productsPage.map((prod, index) => (
                    <div key={index}>
                      <ProductsCard prod={prod} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Paginación */}
          <PaginationPage
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            
          />
        </div>
      </div>
    </>
  );
}
