import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetImgProduct, GetRating } from "../api/api_products";
import { Rating } from "./common/Rating";
import placeholder from "../assets/placeholder.png"
export function ProductsCard({ prod }) {
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");

  function formatPrice(price) {
    const numberPrice = Number(price);
    return numberPrice.toLocaleString("es-ES", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    });
  }

  useEffect(() => {
    async function loadImages(id) {
      const { data } = await GetImgProduct(id);
      setImage(data[0]);
    }
    if (prod.id) {
      loadImages(prod.id);
    }
  }, [prod.id]);

  useEffect(() => {
    GetRating(prod.id).then((value) => setRating(value.data));
  }, []);

  return (
    <Link
      to={`/productdetails/${prod.id}/`}
      key={prod.id}
      href={prod.href}
      className="group block shadow-lg hover:shadow-xl transition-shadow duration-300 w-60"
    >
      <div className="relative h-64 w-full overflow-hidden bg-gray-200">
        <img
          alt={image}
          src={
            image
              ? `http://localhost:8000/${image}?${new Date().getTime()}`
              : placeholder
          }
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          className="absolute inset-0 h-full w-full object-cover group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>
      <div className="p-4 bg-white rounded-b-lg">
        <h3 className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300 truncate">
          {prod.nombre}
        </h3>
        <Rating estrellas={rating} />
        <p className="mt-2 text-lg font-semibold text-gray-900">
          {formatPrice(prod.precio)}
        </p>
      </div>
    </Link>
  );
}
