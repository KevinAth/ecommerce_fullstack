import React, { useContext } from "react";
import { ProdContext } from "../../context/ProductsContext";
export function HomePage() {
  const { prods } = useContext(ProdContext);
  return (
    <>
      <div>
        <div>
          banner
        </div>
        <div>
          ofertas
        </div>
        <div>
          productos sugeridos
        </div>
        <div>
          about us 
        </div>
      </div>
    </>
  );
}
