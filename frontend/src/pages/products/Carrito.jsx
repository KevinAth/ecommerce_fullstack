import { useContext, useEffect, useState } from "react";
import { ProductCart } from "../../components/common/ProductCart";
import { ProdContext } from "../../context/ProductsContext";
import { Link } from "react-router-dom";

export function Carrito() {
  const [dell, setDell] = useState(false);
  const [clean, setClean] = useState(false);
  const { cart, setCart, isAutenticated } = useContext(ProdContext);
  const [user, setUser] = useState("");

  // Formatear precio
  const formatPrice = (price) =>
    Number(price).toLocaleString("es-ES", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    });

  // Calcular total del carrito
  const calcularTotal = () =>
    cart.reduce(
      (total, item) => total + item.product.precio * item.quantity,
      0
    );

  // Obtener usuario del token
  useEffect(() => {
    const getUserFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload.username);
      }
    };
    getUserFromToken();
  }, []);

  // Eliminar producto del carrito
  const removeProductCart = (product) => {
    const updatedCart = cart.filter(
      (item) => item.product.id !== product.product.id
    );
    setCart(updatedCart);
    setDell(true);
    setTimeout(() => setDell(false), 3000);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Vaciar carrito
  const cleanCart = () => {
    setCart([]);
    setClean(true);
    setTimeout(() => setClean(false), 3000);
    localStorage.removeItem("cart");
  };

  return (
    <>
      {/* Alertas */}
      {clean && (
        <div className="text-center w-full bg-blue-500 text-white font-bold">
          <p className="p-1">
            Todos los productos han sido eliminados del carrito.
          </p>
        </div>
      )}
      {dell && (
        <div className="text-center w-full bg-red-500 text-white font-bold">
          <p className="p-1">Producto eliminado.</p>
        </div>
      )}

      {/* Contenido principal */}
      <div className="m-20">
        {cart.length === 0 ? (
          <div className="text-center bg-gray-100 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-4">
              Descubre productos y agrega al carrito para comprarlos.
            </p>
            <Link
              to="/products"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Ir a Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-4">
            {/* Lista de productos */}
            <div className="col-span-5">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Carrito</h2>
                <div>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 border-b border-gray-200 mb-4 pb-4"
                    >
                      <ProductCart
                        item={item}
                        removeProductCart={removeProductCart}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen del carrito */}
            <div className="col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Total: {formatPrice(calcularTotal())}
                </h4>
                <div className="mb-4">
                  <button
                    onClick={cleanCart}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Vaciar Carrito
                  </button>
                </div>
                {isAutenticated ? (
                  <div className="py-4">
                    <Link
                      to={`/paymentgateway/${user}`}
                      className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                    >
                      Proceder al pago
                    </Link>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-100 rounded-md shadow-md">
                    <h1 className="text-xl font-semibold text-gray-900 mb-4">
                      Tienes que registrarte primero antes de concluir la compra
                    </h1>
                    <p className="text-gray-700 mb-2">
                      Inicia sesión{" "}
                      <Link
                        to="/login"
                        className="text-blue-500 hover:underline"
                      >
                        aquí
                      </Link>
                    </p>
                    <p className="text-gray-700 mb-2">o</p>
                    <p className="text-gray-700">
                      Crea una cuenta nueva{" "}
                      <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                      >
                        aquí
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
