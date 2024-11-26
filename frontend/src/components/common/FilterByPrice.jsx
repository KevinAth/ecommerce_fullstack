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
    <div className="p-6 max-w-xs mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Categorías</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to={"/products/Laptops"}
                className="block px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg transition-colors duration-300 hover:bg-green-200"
              >
                Laptops
              </Link>
            </li>
            <li>
              <Link
                to={"/products/Torres"}
                className="block px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg transition-colors duration-300 hover:bg-green-200"
              >
                Torres
              </Link>
            </li>
            <li>
              <Link
                to={"/products/Monitores"}
                className="block px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg transition-colors duration-300 hover:bg-green-200"
              >
                Monitores
              </Link>
            </li>
            <li>
              <Link
                to={"/products/Perifericos"}
                className="block px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg transition-colors duration-300 hover:bg-green-200"
              >
                Periféricos
              </Link>
            </li>
            <li>
              <Link
                to={"/products/Portatiles"}
                className="block px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg transition-colors duration-300 hover:bg-green-200"
              >
                Portátiles
              </Link>
            </li>
            <li>
              <Link
                to={"/products/Hardware"}
                className="block px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg transition-colors duration-300 hover:bg-green-200"
              >
                Hardware
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Filtrar por Precio
        </h1>
        <form className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              value="todos"
              checked={opcionseleccionada === "todos"}
              onChange={handleOptionChange}
              className="form-radio h-4 w-4 text-green-600"
            />
            <label className="ml-2 text-gray-700">Todos</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="0-100000"
              checked={opcionseleccionada === "0-100000"}
              onChange={handleOptionChange}
              className="form-radio h-4 w-4 text-green-600"
            />
            <label className="ml-2 text-gray-700">0 - 100.000</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="100000-500000"
              checked={opcionseleccionada === "100000-500000"}
              onChange={handleOptionChange}
              className="form-radio h-4 w-4 text-green-600"
            />
            <label className="ml-2 text-gray-700">100.000 - 500.000</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="500000-1000000"
              checked={opcionseleccionada === "500000-1000000"}
              onChange={handleOptionChange}
              className="form-radio h-4 w-4 text-green-600"
            />
            <label className="ml-2 text-gray-700">500.000 - 1.000.000</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="1000000-2000000"
              checked={opcionseleccionada === "1000000-2000000"}
              onChange={handleOptionChange}
              className="form-radio h-4 w-4 text-green-600"
            />
            <label className="ml-2 text-gray-700">1.000.000 - 2.000.000</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="mas_de_2000000"
              checked={opcionseleccionada === "mas_de_2000000"}
              onChange={handleOptionChange}
              className="form-radio h-4 w-4 text-green-600"
            />
            <label className="ml-2 text-gray-700">Más de 2.000.000</label>
          </div>
        </form>
      </div>
    </div>
  );
}
