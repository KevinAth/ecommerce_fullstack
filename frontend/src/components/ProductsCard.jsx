import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetImgProduct, GetRating } from "../api/api_products";
import { Rating } from "./common/Rating";

export function ProductsCard({ prod }) {
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");

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
      to={`/productdetails/${prod.id}`}
      key={prod.id}
      href={prod.href}
      className="group"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          alt={image}
          src={
            prod.id && `http://localhost:8000/${image}?${new Date().getTime()}`
          }
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{prod.nombre}</h3>
      <Rating estrellas={rating} />
      <p className="mt-1 text-lg font-medium text-gray-900">{prod.precio}</p>
    </Link>
  );
}
