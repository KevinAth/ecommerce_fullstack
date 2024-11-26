import { useForm } from "react-hook-form";
import { RegisterUser } from "../../api/api_user";
import { useState } from "react";

export function Register() {
  const { register, handleSubmit } = useForm();
  const [mensaje, setMensaje] = useState("");
  const onSubmit = handleSubmit((data) => {
    RegisterUser(data)
      .then(() => window.location.replace("/login"))
      .catch((error) => {
        if (error.response) {
          setMensaje(error.response.data.mensaje);
        }
      });
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Registrar Nueva Cuenta
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              {...register("name")}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              {...register("email")}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              {...register("password")}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="birth"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              {...register("birth")}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Registrar Usuario
            </button>
          </div>
        </form>
        {mensaje && (
          <div className="mt-4 text-red-600 text-center">
            <p>{mensaje}</p>
          </div>
        )}
      </div>
    </div>
  );
}
