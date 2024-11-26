import { useState, useEffect } from "react";
import { Header } from "../../layout/Header";
import { AddressCard } from "../../components/common/usercomponents/addresses/AddressCard";
import { useParams } from "react-router-dom";
import { GetAddresses } from "../../api/api_user";
export function PaymentGateway() {
  const [opcion, setOpcion] = useState();
  const [direcciones, setDirecciones] = useState([]);
  const [vencimiento, setVencimiento] = useState("");
  const [products, setProducts] = useState([]);

  const handleOption = (event) => {
    const opcionEC = event.target.value;
    setOpcion(opcionEC);
  };
  const { username } = useParams();

  function deleteaddress(id) {
    DeleteAddress(id);
    let address = direcciones.filter((direccion) => direccion.id != id);
    setDirecciones(address);
  }

  useEffect(() => {
    const prods = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(prods);
    setProducts(prods);
  }, []);

  useEffect(() => {
    function loadAddresses(username) {
      GetAddresses(username).then((value) => setDirecciones(value.data));
    }
    loadAddresses(username);
  }, []);

  const handleDate = (event) => {
    let value = event.target.value;

    value = value.replace(/[^0-9]/g, "");

    if (value >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setVencimiento(value);
  };

  return (
    <>
      <Header />
      <div className="grid p-5 px-2 sm:px-5 lg:px-10 grid-cols-1 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-4">
          {direcciones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {direcciones.map((direccion, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <AddressCard
                    direccion={direccion}
                    index={index}
                    deleteaddress={deleteaddress}
                  />
                  <div className="bg-green-500 text-center rounded-lg hover:bg-green-600 mt-4">
                    <button className="p-2 text-white w-full">
                      Seleccionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-10 text-gray-500">
              Aún no cuentas con direcciones vigentes. <br />
              Puedes agregar una en la ruta: <br />
              <strong>
                Configuración de cuenta &gt; Tus direcciones &gt; Agregar
                dirección
              </strong>
            </div>
          )}
        </div>
        <div className="lg:col-span-2 bg-slate-200 rounded-xl">
          <div className="p-5">
            <h1 className="text-lg font-semibold mb-4">
              Escoge el método de pago
            </h1>
            <div className="space-y-4">
              <div>
                <h1 className="text-lg font-semibold">Tu pedido</h1>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center justify-between border-b py-4">
                    <div className="font-semibold">
                      <h1>Producto</h1>
                    </div>
                    <div className="font-semibold">
                      <h1 className="text-base">Cantidad</h1>
                    </div>
                    <div className="font-semibold">
                      <h1>Subtotal</h1>
                    </div>
                  </div>
                  {products.length > 0 ? (
                    products.map((prods, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b py-4"
                      >
                        <div className="text-lg font-semibold text-gray-800 w-1/2">
                          <h1>{prods.product.nombre}</h1>
                        </div>
                        <div className="text-gray-600 w-1/4 text-center">
                          <h1 className="text-base">{prods.quantity}</h1>
                        </div>
                        <div className="text-right w-1/4 text-green-600 font-semibold">
                          <h1>${prods.product.precio * prods.quantity}</h1>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 mt-4">
                      No hay productos en el carrito.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="radio"
                  id="transferencia_directa"
                  checked={opcion === "transferencia_directa"}
                  value="transferencia_directa"
                  onChange={handleOption}
                  className="mr-2"
                />
                <label
                  htmlFor="transferencia_directa"
                  className="cursor-pointer"
                >
                  Transferencia bancaria directa (Nequi/Bancolombia)
                </label>
              </div>
              {opcion === "transferencia_directa" && (
                <div className="mt-4 text-gray-700 bg-gray-50 p-4 rounded-lg">
                  <h2 className="font-semibold">Gracias por tu compra!</h2>
                  <p className="text-sm mt-2">
                    Para completar el pedido, realiza un depósito en nuestra
                    cuenta de Bancolombia, la cual te mostraremos al finalizar
                    la compra.
                    <br />
                    <br />
                    Envía el comprobante junto con tu número de orden a nuestro
                    WhatsApp Business 31637XXXX.
                  </p>
                </div>
              )}

              <div>
                <input
                  type="radio"
                  id="debito_o_credito"
                  checked={opcion === "debito_o_credito"}
                  value="debito_o_credito"
                  onChange={handleOption}
                  className="mr-2"
                />
                <label htmlFor="debito_o_credito" className="cursor-pointer">
                  Débito o crédito
                </label>
              </div>
              {opcion === "debito_o_credito" && (
                <div className="mt-4">
                  <h2 className="font-semibold">
                    Rellena los datos de tu tarjeta
                  </h2>
                  <form className="space-y-4 mt-4">
                    <div>
                      <label
                        htmlFor="numeroTarjeta"
                        className="block font-semibold"
                      >
                        Número de tarjeta
                      </label>
                      <input
                        type="text"
                        id="numeroTarjeta"
                        className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="titular" className="block font-semibold">
                        Nombre del titular de la tarjeta
                      </label>
                      <input
                        type="text"
                        id="titular"
                        className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                        placeholder="Ejemplo: María Aguirre"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="vencimiento"
                          className="block font-semibold"
                        >
                          Vencimiento
                        </label>
                        <input
                          type="text"
                          id="vencimiento"
                          maxLength={5}
                          value={vencimiento}
                          onChange={handleDate}
                          placeholder="MM/AA"
                          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="cvc" className="block font-semibold">
                          Código de seguridad
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          maxLength={4}
                          placeholder="123"
                          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}

              <div>
                <input
                  type="radio"
                  id="PSE"
                  checked={opcion === "PSE"}
                  value="PSE"
                  onClick={handleOption}
                  className="mr-2"
                />
                <label htmlFor="PSE" className="cursor-pointer">
                  PSE
                </label>
              </div>
              {opcion === "PSE" && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                  <h1 className="text-lg font-semibold text-gray-800 mb-2">
                    Seleccione el punto de pago donde quieres pagar
                  </h1>
                  <form className="space-y-4">
                    <div>
                      <label className="block font-medium text-gray-700">
                        Tipo
                      </label>
                      <select className="mt-1 w-full border border-gray-300 rounded-lg p-2">
                        <option value="">Individual</option>
                        <option value="">Institucional</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700">
                        Documento del titular
                      </label>
                      <div className="flex space-x-4 mt-1">
                        <select className="w-1/3 border border-gray-300 rounded-lg p-2">
                          <option value="">CC</option>
                          <option value="">CE</option>
                          <option value="">NIT</option>
                        </select>
                        <input
                          type="text"
                          className="w-2/3 border border-gray-300 rounded-lg p-2"
                          placeholder="Número de documento"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700">
                        Institución financiera
                      </label>
                      <select className="mt-1 w-full border border-gray-300 rounded-lg p-2">
                        <option selected="selected" hidden="hidden">
                          Seleccione la institución
                        </option>
                        <option value="Bancolombia">Bancolombia</option>
                        <option value="Banco de Bogotá">Banco de Bogotá</option>
                        <option value="Banco Popular">Banco Popular</option>
                        <option value="Banco de Occidente">
                          Banco de Occidente
                        </option>
                        <option value="Davivienda">Davivienda</option>
                        <option value="Banco Agrario">Banco Agrario</option>
                        <option value="BBVA Colombia">BBVA Colombia</option>
                        <option value="Banco AV Villas">Banco AV Villas</option>
                        <option value="Scotiabank Colpatria">
                          Scotiabank Colpatria
                        </option>
                        <option value="Banco Pichincha">Banco Pichincha</option>
                        <option value="Coopcentral">Coopcentral</option>
                      </select>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <div className="flex m-3 justify-center items-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
