import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProduct } from "../api/api_products";
import { Rating } from "./common/Rating";

export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [review_prom, setReview_prom] = useState(0);

  useEffect(() => {
    async function loadProduct(id) {
      const res = await GetProduct(id);
      setProduct(res.data.product);
      setReviews(res.data.reviews);
      setReview_prom(res.data.review_prom);
    }
    loadProduct(id);
  }, []);

  const [activa, setActiva] = useState();

  return (
    <>
      <div className="mt-10 ms-52">
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <div>
              <div>
                <img
                  src={"http://localhost:8000/" + product.img_product}
                  alt={"http://localhost:8000/" + product.img_product}
                />
              </div>
              <div>
                {Image.map((img, index) => (
                  <div key={index}>
                    <img
                      onClick={() => setActiva(img)}
                      src={img}
                      alt="Producto - imagen"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <h1>{product.nombre}</h1>
            <p>${product.precio}</p>
            <Rating estrellas={review_prom} />
            <p>{product.descripcion}</p>
          </div>
        </div>
        <div>
          <h3>Reseñas</h3>
          {reviews.map((review, index) => (
            <div key={index}>
              <p>Nombre del reseñador</p>
              <p>{review.create_at}</p>
              <Rating estrellas={review.rating} />
              <p>{review.comentario}</p>
            </div>
          ))}
        </div>
        <div>productos sugeridos</div>
      </div>
    </>
  );
}
