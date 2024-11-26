import basura from "../../../../assets/basura.png";

export function AddressCard({ direccion, index, deleteaddress }) {
  return (
    <div
      key={index}
      className="bg-white border-2 col-span-1 shadow-md rounded-xl p-6 mb-6 transition-shadow duration-300 ease-in-out hover:shadow-xl"
    >
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          {direccion.nombre}
        </h1>
      </div>
      <hr className="border-t-2 border-gray-200 my-2" />
      <div className="text-gray-700">
        <p className="mb-2">
          <span className="font-semibold text-gray-900">Ciudad: </span>
          {direccion.ciudad}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Dirección: </span>
          {direccion.direccion}
        </p>
      </div>
    </div>
  );
}
