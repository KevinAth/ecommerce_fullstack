import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthUser } from "../../api/api_user";
import { useState } from "react";

export function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const onSubmit = async (data) => {
    await AuthUser(data)
      .then((value) => {
        localStorage.setItem("token", value.data.token);
        window.location.reload();
        window.location.replace("/");
      })
      .catch((error) => {
        if (error.response) {
          setMensaje(error.response.data.mensaje);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="text"
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
            <Link
              to="#"
              className="text-sm text-green-600 hover:text-green-800 block mt-2 text-right"
            >
              ¿Olvidaste la contraseña?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        {mensaje && (
          <div className="mt-4 text-red-600 text-center">
            <p>{mensaje}</p>
          </div>
        )}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
