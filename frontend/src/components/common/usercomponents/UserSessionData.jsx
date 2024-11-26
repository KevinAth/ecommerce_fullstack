import { useEffect, useState } from "react";
import { UpdateUser } from "../../../api/api_user";

export function UserSessionData({ userdatos }) {
  const [mode, setMode] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [formdata, setFormdata] = useState({
    username: userdatos.username,
    email: userdatos.email,
    password: null,
    password_verify: null,
  });

  function HandleEventChange(e) {
    const { name, value } = e.target;
    setFormdata((i) => ({
      ...i,
      [name]: value,
    }));
  }

  async function SubmitForm(e) {
    e.preventDefault();
    try {
      if (formdata.password === formdata.password_verify) {
        const data = {
          username: formdata.username,
          email: formdata.email,
          password: formdata.password,
        };
        await UpdateUser(data, userdatos.username).then((value) => {
          if (value.data.token) {
            localStorage.setItem("token", value.data.token);
            console.log(value.data);
            let params = window.location.pathname;
            let Pathname = params.replace(/\/[^\/]+$/, `/${formdata.username}`);
            window.history.pushState({}, "", Pathname);
            window.location.reload();
          } else {
            setMensaje(value.data.mensaje);
          }
        });
      } else {
        console.log("Las contraseñas no son iguales");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {mode ? (
          <div className="bg-white p-5 rounded-3xl w-full max-w-md">
            <div className="font-bold text-xl justify-center items-center mb-4">
              <h1>Datos de Ingreso y seguridad</h1>
            </div>
            <div>
              <div>
                <label className="block text-base font-semibold">Usuario</label>
                <p>{userdatos.username}</p>
              </div>
              <div>
                <label className="block font-semibold">
                  Correo Electronico
                </label>
                <p>{userdatos.email}</p>
              </div>
              <div>
                <label className="block font-semibold">Contraseña</label>
                <p>**********</p>
              </div>
              <div>
                <button
                  onClick={() => setMode(false)}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded"
                >
                  Actualizar datos
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-3xl w-full max-w-md">
            <div className="font-bold text-xl justify-center items-center mb-4">
              <h1>Actualizar datos de usuario</h1>
            </div>
            <div>
              <form onSubmit={SubmitForm}>
                <div>
                  <label className="block text-base font-semibold">
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={formdata.username}
                    onChange={(e) => HandleEventChange(e)}
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold">
                    Correo Electronico
                  </label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={formdata.email}
                    onChange={(e) => HandleEventChange(e)}
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => HandleEventChange(e)}
                    placeholder="Cambiar contraseña"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    name="password_verify"
                    onChange={(e) => HandleEventChange(e)}
                    placeholder="Confirmar contraseña"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>
                <div className="m-3">
                  <p className="font-medium text-red-500">{mensaje}</p>
                </div>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
