import { useEffect, useState, useContext } from "react";
import { GetImgProduct } from "../../api/api_products";
import { ProdContext } from "../../context/ProductsContext";

export function ProductCart({ item, removeProductCart }) {
  const { updateCart } = useContext(ProdContext);
  const [img, setImg] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadimg(id) {
      const res = await GetImgProduct(id);
      const urlImg = "http://localhost:8000/" + res.data[0];
      setImg(urlImg);
    }
    loadimg(item.product.id);
    async function Quantity() {
      const quan = item.quantity;
      setCount(quan);
    }
    Quantity();
  }, [item]);

  function formatPrice(price) {
    const numberPrice = Number(price);
    return numberPrice.toLocaleString("es-ES", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    });
  }

  function Incremento() {
    if (count < item.product.stock) {
      const sum = count + 1;
      setCount(sum);
    }
  }

  function Decremento() {
    if (count !== 1) {
      const res = count - 1;
      setCount(res);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200">
      <div className="col-span-1">
        <img
          src={img}
          alt={item.product.nombre}
          className="w-full h-auto object-cover rounded-md shadow-sm"
        />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {item.product.nombre}
          </h3>
          <p className="text-gray-600 mt-1">
            Precio: {formatPrice(item.product.precio)}
          </p>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <button
              onClick={Decremento}
              className="bg-gray-300 text-black font-bold px-3 py-1 rounded-l-md hover:bg-gray-400 transition-colors duration-200"
            >
              -
            </button>
            <input
              readOnly
              type="text"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-10 text-center border-t border-b border-gray-300 bg-white py-1 focus:outline-none"
            />
            <button
              onClick={Incremento}
              className="bg-gray-300 text-black font-bold px-3 py-1 rounded-r-md hover:bg-gray-400 transition-colors duration-200"
            >
              +
            </button>
            <button
              onClick={() => updateCart(item, count)}
              className="ml-4 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Aplicar
            </button>
          </div>
        </div>
        <button
          onClick={() => removeProductCart(item)}
          className="mt-4 text-red-600 hover:underline hover:text-red-800 transition-colors duration-200 self-start"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
