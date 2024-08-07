import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FilterProdsByPrice } from "../../api/api_products";

export function FilterByPrice(props) {
  const { category } = useParams();
  const [opcionseleccionada, setOpcionseleccionada] = useState("todos");

  const getPriceRange = (opcion) => {
    if (category) {
      switch (opcion) {
        case "0-100000":
          return { min: 0, max: 100000, category: category };
        case "100000-500000":
          return { min: 100000, max: 500000, category: category };
        case "500000-1000000":
          return { min: 500000, max: 1000000, category: category };
        case "1000000-2000000":
          return { min: 1000000, max: 2000000, category: category };
        case "mas_de_2000000":
          return { min: 2000000, max: 99999999, category: category };
        default:
          return { min: 0, max: 999999999, category: category };
      }
    }
    switch (opcion) {
      case "0-100000":
        return { min: 0, max: 100000 };
      case "100000-500000":
        return { min: 100000, max: 500000 };
      case "500000-1000000":
        return { min: 500000, max: 1000000 };
      case "1000000-2000000":
        return { min: 1000000, max: 2000000 };
      case "mas_de_2000000":
        return { min: 2000000, max: 99999999 };
      default:
        return { min: 0, max: 999999999 };
    }
  };

  async function filterProdByPrice(data) {
    const res = await FilterProdsByPrice(data);
    props.setProducts(res.data);
  }

  const handleOptionChange = (event) => {
    const opcion = event.target.value;
    const price = getPriceRange(opcion);
    setOpcionseleccionada(opcion);
    filterProdByPrice(price);
  };

  return (
    <>
      <div>
        <h1>Categorias</h1>
        <nav>
          <ul>
            <li>
              <Link to={"/products/Laptops"}>Laptops</Link>
            </li>
            <li>
              <Link to={"/products/Torres"}>Torres</Link>
            </li>
            <li>
              <Link to={"/products/Monitores"}>Monitores</Link>
            </li>
            <li>
              <Link to={"/products/Perifericos"}>Perifericos</Link>
            </li>
            <li>
              <Link to={"/products/Portatiles"}>Portatiles</Link>
            </li>
            <li>
              <Link to={"/products/Hardware"}>Hardware</Link>
            </li>
          </ul>
        </nav>
        <h1>Filtrar por precio</h1>
      </div>
      <form>
        <div>
          <input
            type="radio"
            value="todos"
            checked={opcionseleccionada === "todos"}
            onChange={handleOptionChange}
          />
          <label>Todos</label>
        </div>
        <div>
          <input
            type="radio"
            value="0-100000"
            checked={opcionseleccionada === "0-100000"}
            onChange={handleOptionChange}
          />
          <label>0 - 100.000</label>
        </div>
        <div>
          <input
            type="radio"
            value="100000-500000"
            checked={opcionseleccionada === "100000-500000"}
            onChange={handleOptionChange}
          />
          <label>100.000 - 500.000</label>
        </div>
        <div>
          <input
            type="radio"
            value="500000-1000000"
            checked={opcionseleccionada === "500000-1000000"}
            onChange={handleOptionChange}
          />
          <label>500.000 - 1.000.000</label>
        </div>
        <div>
          <input
            type="radio"
            value="1000000-2000000"
            checked={opcionseleccionada === "1000000-2000000"}
            onChange={handleOptionChange}
          />
          <label>1.000.000 - 2.000.000</label>
        </div>
        <div>
          <input
            type="radio"
            value="mas_de_2000000"
            checked={opcionseleccionada === "mas_de_2000000"}
            onChange={handleOptionChange}
          />
          <label>Mas de 2.000.000</label>
        </div>
      </form>
    </>
  );
}
