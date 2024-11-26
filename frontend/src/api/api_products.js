import axios from "axios";

const conexion = axios.create({
  baseURL: "http://localhost:8000/products/",
});

export const GetProducts = () => conexion.get("/products/");

export const GetProductsPage = (page) => conexion.get(`/productspage/?page=${page}`);

export const GetImgProduct = (id) => conexion.get(`getimages/${id}/`);

export const GetCategories = () => conexion.get("/categories/");

export const GetProduct = (id) => conexion.get(`/product/${id}/`);

export const GetRating = (id) => conexion.get(`/getrating/${id}/`);

export const FilterProds = (cat) => conexion.get(`/filterproduct/${cat}/`);

export const FilterProdsByPrice = (price) =>
  conexion.get("filterproduct/", { params: price });

export const SearchProducts = (search) => conexion.get(`/search/${search}/`);

export const CreateReview = (data) => conexion.post(`/createreview/`, data);
