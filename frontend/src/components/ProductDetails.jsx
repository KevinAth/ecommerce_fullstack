import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { CreateReview, GetProduct } from "../api/api_products";
import { Rating } from "./common/Rating";
import { ProductCarousel } from "./common/ProductCarousel";
import { ProdContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import  placeholder from "../assets/placeholder.png"

export function ProductDetails() {
  const { addCart, isAutenticated } = useContext(ProdContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [review_prom, setReview_prom] = useState(0);
  const [count, setCount] = useState(1);
  const [mensajevisible, setMensajevisible] = useState(false);
  const [valueRating, setValueRating] = useState(1);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");

  const commentRef = useRef(null);

  useEffect(() => {
    function get_user() {
      const token = localStorage.getItem("token");
      if (token) {
        const token = localStorage.getItem("token");
        const payload = token.split(".")[1];
        const decode = JSON.parse(atob(payload));
        const user = decode.username;
        return setUser(user);
      }
    }
    get_user();
  }, []);

  function formatPrice(price) {
    const numberPrice = Number(price);
    return numberPrice.toLocaleString("es-ES", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    });
  }

  useEffect(() => {
    async function loadProduct(id) {
      const res = await GetProduct(id);
      setProduct(res.data.product);
      setReviews(res.data.reviews);
      setReview_prom(res.data.review_prom);
      setImages(res.data.imgs[0]);
      setActiva(res.data.imgs[0].img_1);
    }
    loadProduct(id);
  }, []);

  function HandleChangeRat(e) {
    const val = e.target.value;
    setValueRating(val);
  }

  const HandleChangeComm = (e) => {
    const val = e.target.value;
    setComment(val);
  };

  function OnSubmitFormComment(e) {
    const comment = commentRef.current.value;
    let id_convert = +id;
    const datos = {
      product: id_convert,
      nombre_user: user,
      rating: valueRating,
      comment: comment,
    };
    CreateReview(datos);
  }

  function AddToCart(product, count) {
    addCart(product, count);
    setMensajevisible(true);
    setTimeout(() => {
      setMensajevisible(false);
    }, 3000);
  }

  function Incremento() {
    if (count < product.stock) {
      const sum = count + 1;
      setCount(sum);
    }
  }
  function Decremento() {
    if (count != 1) {
      const res = count - 1;
      setCount(res);
    }
  }

  const [activa, setActiva] = useState("");
  return (
    <>
      {mensajevisible && (
        <div className="text-center w-full bg-green-500 text-white font-bold ">
          <p className="p-1">Producto agregado al carrito.</p>
        </div>
      )}
      <div className="mt-10 2xl:mx-44 xl:mx-20 lg:mx-10 md:mx-10 sm:mx-5">
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-2">
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                  src={
                    activa
                      ? "http://localhost:8000" + activa
                      : placeholder
                  }
                  alt={"images-Products"}
                />
              </div>
              <div className="grid grid-cols-5 gap-3">
                {Object.values(images).map((img, index) => (
                  <div key={index}>
                    <img
                      className="h-20 max-w-full border cursor-pointer rounded-lg object-cover object-center hover:border-black"
                      onClick={() => setActiva(img)}
                      src={
                        img
                          ? "http://localhost:8000" + img
                          : placeholder
                      }
                      alt="images-Products"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-3 p-4 bg-white">
            <h1 className="font-semibold text-4xl text-gray-800 mb-2">
              {product.nombre}
            </h1>
            <p className="text-2xl font-light text-gray-600 mb-4">
              {formatPrice(product.precio)}
            </p>
            <Rating estrellas={review_prom} />
            <div className="grid grid-cols-10 ">
              <div className="flex items-center justify-center px-2 col-span-2">
                <div className="bg-gray-200 rounded-md flex mt-4 items-center focus:border-black">
                  <button
                    onClick={Decremento}
                    className="bg-gray-300 text-black font-bold text-center px-3 py-1 rounded-l-md hover:bg-gray-400"
                  >
                    -
                  </button>
                  <input
                    readOnly
                    type="text"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="leading-7 focus:outline-none w-full text-center"
                  />
                  <button
                    onClick={Incremento}
                    className="bg-gray-300 text-black  text-center font-semibold px-3 py-1 rounded-r-md hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>QUIERO ESTUDIAR PORFAA
              </div>
              <div className="col-span-8">
                <button
                  onClick={() => AddToCart(product, count)}
                  className="mt-4 px-4 py-2 bg-black text-white font-semibold rounded-md shadow hover:bg-green-500 focus:outline-none  w-full"
                >
                  + Agregar al Carrito
                </button>
              </div>
            </div>
            <div>
              <button className="mt-4 px-4 py-2 bg-white text-black border  border-gray-200 font-semibold rounded-md shadow  hover:border-black focus:outline-none  w-full">
                Comprar Ahora
              </button>
            </div>
            <div className="mt-6">
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Descripción:
              </p>
              <p className="text-gray-600">{product.descripcion}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mt-5 text-gray-600">Reseñas</h3>
          <div>
            {isAutenticated ? (
              <form onSubmit={OnSubmitFormComment} className="p-6 bg-white">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <p className="font-semibold text-gray-700">Calificación:</p>
                    <input
                      type="number"
                      value={valueRating}
                      onChange={HandleChangeRat}
                      max={5}
                      min={1}
                      className="w-20 border caret-transparent selection:bg-transparent border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    />
                    <p className="text-sm text-gray-500">1 al 5</p>
                  </div>
                  <div className="flex items-center w-full space-x-4">
                    <p className="font-semibold text-gray-700">Comentario:</p>
                    <input
                      type="text"
                      placeholder="Escribe aquí..."
                      ref={commentRef}
                      className="flex-grow border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg py-2 transition-colors duration-300 ease-in-out"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className=" p-6 bg-gray-100 rounded-md shadow-md">
                <h1 className="text-sm font-semibold text-gray-900 mb-1">
                  Para dejar un comentario tienes que Iniciar Sesión.
                </h1>
                <p className="text-gray-700 mb-2">
                  Inicia sesión{" "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    aquí
                  </Link>{" "}
                  o Crea una cuenta nueva{" "}
                  <Link
                    to="/register"
                    className="text-blue-500 hover:underline"
                  >
                    aquí
                  </Link>
                </p>
              </div>
            )}
          </div>
          {reviews.length > 1 ? (
            <div className="overflow-scroll m-5 overflow-x-hidden h-96">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-gray-900">
                      {review.nombre_user}
                    </p>
                    <p className="text-sm text-gray-500">{review.create_at}</p>
                  </div>

                  <div className="mb-2">
                    <Rating estrellas={review.rating} />
                  </div>

                  <p className="text-gray-700 pt-1 px-3">{review.comentario}</p>

                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                No hay ningún comentario, ¡sé el primero en comentar este
                producto!
              </h3>
            </div>
          )}
        </div>
        <div>
          <ProductCarousel items={8} />
        </div>
      </div>
    </>
  );
}
