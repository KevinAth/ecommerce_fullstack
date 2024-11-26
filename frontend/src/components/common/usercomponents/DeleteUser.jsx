import { DeleteAccount } from "../../../api/api_user";

export function DeleteUser({ userdatos }) {
  async function deleteacc(user) {
    await DeleteAccount(user);
    window.location.replace("/");
    localStorage.removeItem("token");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-800">
          ¿Quiere Borrar la cuenta?
        </h3>
        <p className="text-gray-600 mb-6">
          Si eliminas tu cuenta, esta dejará de existir y todos los datos
          guardados serán borrados.
        </p>
        <button
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={() => deleteacc(userdatos.username)}
        >
          Borrar Cuenta
        </button>
      </div>
    </div>
  );
}
