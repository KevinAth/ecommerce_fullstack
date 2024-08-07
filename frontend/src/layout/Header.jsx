import React, { useState, useContext, useEffect } from "react";
import { ProdContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { cats } = useContext(ProdContext);

  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white px-8 py-4">
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="col-span-1">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold">Vault Tech Market</h1>
          </Link>
        </div>
        <form className="col-span-2 flex items-center">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-3 py-2 border border-gray-600 rounded-l-md focus:outline-none text-black focus:ring-2 focus:ring-green-500"
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
              <Link to={"/products"}>Products</Link>
            </li>

            <li>
              <a
                href="#"
                className="bg-green-500 text-white px-4 py-2 rounded-md inline-block hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-expanded={isOpen}
                onClick={toggleDropdown}
              >
                Categorías
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Servicios
              </a>
            </li>
          </ul>
        </nav>
        <div
          className={`absolute top-32 left-2 w-48 bg-white text-gray-900 border border-gray-300 rounded-md shadow-lg ${
            isOpen ? "block" : "hidden"
          }`}
          role="banner"
        >
          {cats.map((cate, index) => (
            <div key={index}>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                {cate.categoria}
              </a>
            </div>
          ))}
        </div>
        <nav className="col-span-2 flex justify-end items-center">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Ingresar
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Registrarse
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Mis compras
              </a>
            </li>
          </ul>
          <a
            href="#"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mx-2"
          >
            Carrito
          </a>
        </nav>
      </div>
    </header>
  );
}
