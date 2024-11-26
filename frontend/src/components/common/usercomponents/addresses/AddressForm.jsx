import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateAddress } from "../../../../api/api_user";

export function AddressForm({ isOpen, username }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await CreateAddress(data, username).then(() => isOpen(false));
  });

  return (
    <>
      <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex items-center justify-center ">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96  relative">
          <form onSubmit={onSubmit}>
            <div className="mb-3 font-bold ">
              <h1 className="text-lg">Creación de dirección</h1>
            </div>
            <div>
              <label className="font-semibold text-base">Nombre</label>
              <hr />
              <input
                type="text"
                className="w-full border px-4 py-2 rounded"
                {...register("nombre", { required: true })}
              />
            </div>
            <div>
              <label className="font-semibold text-base">Pais</label>
              <hr />
              <select
                name="paisoption"
                id=""
                className="w-full border px-4 py-2 rounded"
                {...register("pais", { required: true })}
              >
                <option value="colombia">Colombia</option>
                <option value="brasil">Brasil</option>
                <option value="ecuador">Ecuador</option>
                <option value="venezuela">Venezuela</option>
                <option value="peri">Peru</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-base">Ciudad</label>
              <hr />
              <input
                type="text"
                className="w-full border px-4 py-2 rounded"
                {...register("ciudad", { required: true })}
              />
            </div>
            <div>
              <label className="font-semibold text-base">Dirección</label>
              <hr />
              <input
                type="text"
                className="w-full border px-4 py-2 rounded"
                {...register("direccion", { required: true })}
              />
            </div>
            <div>
              <label className="font-semibold text-base">Codigo postal</label>
              <hr />
              <input
                type="text"
                maxLength={6}
                className="w-full border px-4 py-2 rounded"
                {...register("codigo_postal", { required: true })}
              />
            </div>
            <div className="grid grid-cols-3 m-5 gap-2">
              <button
                className="col-span-1 bg-red-500 rounded-xl text-white hover:bg-red-600"
                onClick={() => isOpen(false)}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="col-span-2 bg-green-500 p-3 rounded-xl text-white hover:bg-green-600 "
                type="submit"
              >
                Crear dirección
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
