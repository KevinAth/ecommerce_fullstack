import React, { useState, useContext, useEffect } from "react";
import { ProdContext } from "../context/ProductsContext";
import { Link, useNavigate } from "react-router-dom";
import cartimg from "../assets/shopping-cart.png";
import usuario from "../assets/usuario.png";

export function Header() {
  const { cart, setIsAutenticated } = useContext(ProdContext);
  const [login, setLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
      setIsAutenticated(true);
    }
  });

  const onSubmitSearch = (e) => {
    navigate(`/products/search/${search}`);
  };

  useEffect(() => {
    function get_user() {
      const token = localStorage.getItem("token");
      if (token) {
        const token = localStorage.getItem("token");
        const payload = token.split(".")[1];
        const decode = JSON.parse(atob(payload));
        const user = decode.username;
        return setUser(user);
      }
    }
    get_user();
  }, []);

  function CerrarSesion() {
    navigate("/");
    localStorage.removeItem("token");
    window.location.reload();
    window.location.replace("/");
  }

  return (
    <header className="bg-gray-800 text-white px-8 py-4">
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="col-span-1">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold">Vault Tech Market</h1>
          </Link>
        </div>
        <form
          className="col-span-2 flex items-center"
          onSubmit={onSubmitSearch}
        >
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-3 py-2 border border-gray-600 rounded-l-md focus:outline-none text-black focus:ring-2 focus:ring-green-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded-r-md text-white font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Buscar
          </button>
        </form>

        <nav className="relative col-span-2  inline-block">
          <ul className="flex space-x-4 justify-start">
            <li>
              <Link
                to={"/products"}
                className="bg-green-500 text-white px-4 py-2 rounded-md inline-block hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Products
              </Link>
            </li>
            <div
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button className="bg-green-500 text-white px-4 py-2 rounded-md inline-block hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Categorias
              </button>
              <div
                className={`absolute top-auto left-auto min-w-max     bg-white text-gray-900 border border-gray-300 rounded-md shadow-lg ${
                  isOpen ? "block" : "hidden"
                }`}
                role="banner"
              >
                <Link className="block text-lg p-1 px-5" to="/products/laptops">
                  Laptops
                </Link>
                <Link className="block text-lg p-1 px-5" to="/products/torres">
                  Torres
                </Link>
                <Link
                  className="block text-lg p-1 px-5"
                  to="/products/monitores"
                >
                  Monitores
                </Link>
                <Link
                  className="block text-lg p-1 px-5"
                  to="/products/perifericos"
                >
                  Perifericos
                </Link>
                <Link
                  className="block text-lg p-1 px-5"
                  to="/products/portatiles"
                >
                  Portatiles
                </Link>
                <Link
                  className="block text-lg p-1 px-5"
                  to="/products/hardware"
                >
                  Hardware
                </Link>
              </div>
            </div>
          </ul>
        </nav>
        <nav className="col-span-2 flex justify-end items-center">
          <ul className="flex space-x-4">
            {login ? (
              <div
                className="relative mx-2"
                onMouseEnter={() => setIsOpenUser(true)}
                onMouseLeave={() => setIsOpenUser(false)}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-green-400 rounded-full cursor-pointer ">
                  <img src={usuario} alt="img.usuario" className="w-7 h-7" />
                </div>
                {isOpenUser && (
                  <div className="absolute w-auto bg-white text-black p-2 rounded shadow-lg top-auto">
                    <Link className="text-lg block px-1">Compras</Link>
                    <Link
                      to={`/paneldeusuario/${user}`}
                      className="text-lg block px-1"
                    >
                      Configuracion de cuenta
                    </Link>

                    <button
                      onClick={() => CerrarSesion()}
                      className="text-lg block px-1"
                    >
                      Cerrar Sesion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <li>
                  <Link to={"/login"}>Ingresar</Link>
                </li>
                <li>
                  <Link to={"/register"}>Registrar</Link>
                </li>
              </>
            )}
          </ul>
          <Link to={"/Carrito"}>
            <div className="relative mx-2 hover:opacity-75">
              <div className="w-10 h-10 flex items-center justify-center bg-green-400 rounded-full cursor-pointer ">
                <img src={cartimg} alt="Shopping Cart" className="w-6 h-6" />
              </div>
              <span className="absolute top-5 left-8 inline-flex  px-2 py-1 font-bold leading-none text-black bg-white rounded-full">
                {cart.length}
              </span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
