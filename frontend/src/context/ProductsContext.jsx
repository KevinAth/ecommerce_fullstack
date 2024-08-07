import { createContext, useState, useEffect } from "react";
import { GetProducts, GetCategories } from "../api/api_products";
export const ProdContext = createContext();

export function ProdContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    async function loadproducts() {
      let res = await GetProducts();
      setProducts(res.data);
    }
    loadproducts();
  }, []);
  useEffect(() => {
    async function loadCategories() {
      let res = await GetCategories();
      setCats(res.data);
    }
    loadCategories();
  }, []);

  return (
    <ProdContext.Provider value={{ products, cats, setProducts }}>
      {props.children}
    </ProdContext.Provider>
  );
}
