import { useEffect, useState } from "react";
import { AddressCard } from "./AddressCard";
import { AddressForm } from "./AddressForm";
import { DeleteAddress, GetAddresses } from "../../../../api/api_user";

export function AddressesPage({ username }) {
  const [direcciones, setDirecciones] = useState([]);
  const [isopenform, setIsopenform] = useState(false);

  function deleteaddress(id) {
    DeleteAddress(id);
    let address = direcciones.filter((direccion) => direccion.id != id);
    setDirecciones(address);
  }

  useEffect(() => {
    function loadAddresses(username) {
      GetAddresses(username).then((value) => setDirecciones(value.data));
    }
    loadAddresses(username);
  }, [isopenform]);

  return (
    <>
      <div className=" p-20">
        <div>
          <button
            onClick={() => setIsopenform(true)}
            className="col-span-2 bg-green-500 p-3  m-5 rounded-xl text-white ease-in-out hover:bg-green-600 hover:shadow-xl "
          >
            Agregar Direccion
          </button>
          {isopenform && (
            <div>
              <AddressForm isOpen={setIsopenform} username={username} />
            </div>
          )}
        </div>
        {direcciones.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  gap-10">
            {direcciones.map((direccion, index) => (
              <div key={index}>
                <AddressCard direccion={direccion} index={index} />
                <div className="bg-red-500 text-center rounded-lg hover:bg-red-600">
                  <button className="p-2 text-white" onClick={() => deleteaddress(direccion.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="m-5 font-semibold">No hay direcciones disponibles.</h1>
        )}
      </div>
    </>
  );
}
