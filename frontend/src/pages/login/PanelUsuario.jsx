import { useNavigate, useParams } from "react-router-dom";
import usuario from "../../assets/usuario.png";
import { UserInicio } from "../../components/common/usercomponents/UserInicio";
import { UserSessionData } from "../../components/common/usercomponents/UserSessionData";
import { useEffect, useState } from "react";
import { GetUserdata } from "../../api/api_user";
import { DeleteUser } from "../../components/common/usercomponents/DeleteUser";
import { AddressesPage } from "../../components/common/usercomponents/addresses/AddressesPage";

export function PanelUsuario() {
  const navigate = useNavigate();
  const [page, setPage] = useState("inicio");
  const [userdatos, setUserdatos] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    function getData() {
      const data = {
        token: localStorage.getItem("token"),
        username: username,
      };
      GetUserdata(data).then((value) => setUserdatos(value.data));
    }
    getData();
  }, [page]);

  function CerrarSesion() {
    localStorage.removeItem("token");
    window.location.reload();
    window.location.replace("/");
  }

  return (
    <div className="grid grid-rows-[auto,1fr] h-screen bg-gray-100">
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-gray-800  min-h-screen text-white p-5 flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <div className="right-0 mb-2 font-bold  antialiased">
              <button onClick={() => navigate(-1)}>← Atras</button>
            </div>
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <img
                src={usuario}
                alt="Usuario"
                className="w-16 h-16 rounded-full"
              />
            </div>
            <h2 className="text-lg font-semibold mb-8">Panel de Usuario</h2>
            <nav className="w-full">
              <ul className="space-y-4">
                <li
                  className="hover:bg-green-700 p-2 rounded-md text-center cursor-pointer transition-all"
                  onClick={() => setPage("inicio")}
                >
                  Inicio
                </li>
                <li
                  className="hover:bg-green-700 p-2 rounded-md text-center cursor-pointer transition-all"
                  onClick={() => setPage("Iniciodesesionyseguridad")}
                >
                  Inicio de Sesion y Seguridad
                </li>
                <li
                  className="hover:bg-green-700 p-2 rounded-md text-center cursor-pointer transition-all"
                  onClick={() => setPage("tuscompras")}
                >
                  Tus Compras
                </li>
                <li
                  className="hover:bg-green-700 p-2 rounded-md text-center cursor-pointer transition-all"
                  onClick={() => setPage("tusdirecciones")}
                >
                  Tus direcciones
                </li>
                <li
                  className="hover:bg-green-700 p-2 rounded-md text-center cursor-pointer transition-all"
                  onClick={() => setPage("eliminarcuenta")}
                >
                  Eliminación de Cuenta
                </li>
              </ul>
            </nav>
          </div>
          <button
            className="bg-red-500 hover:bg-red-600 p-3 rounded-md text-center mt-8 transition-all"
            onClick={() => CerrarSesion()}
          >
            Cerrar Sesión
          </button>
        </div>
        <div className="col-span-5  bg-white shadow-lg">
          {page === "inicio" && <UserInicio />}
          {page === "Iniciodesesionyseguridad" && (
            <UserSessionData userdatos={userdatos} />
          )}
          {page === "tuscompras" && <>seguridad</>}
          {page === "tusdirecciones" && (
            <AddressesPage username={userdatos.username} />
          )}
          {page === "servicioalcliente" && <>servicio al cliente</>}
          {page === "eliminarcuenta" && <DeleteUser userdatos={userdatos} />}
        </div>
      </div>
    </div>
  );
}
