import { HomePage } from "./pages/home/HomePage";
import { Header } from "./layout/Header";
import { ProdContext, ProdContextProvider } from "./context/ProductsContext";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { Products } from "./pages/products/Products";
import { ProductDetails } from "./components/ProductDetails";
import { ProductsCategories } from "./pages/products/ProductsCategories";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <HomePage />
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: "/products/:category",
    element: (
      <>
        <Header />
        <ProductsCategories />
      </>
    ),
  },
  {
    path: "/productdetails/:id",
    element: (
      <>
        <Header />
        <ProductDetails />
      </>
    ),
  },
]);

function App() {
  return (
    <ProdContextProvider>
      <RouterProvider router={router} />
    </ProdContextProvider>
  );
}

export default App;
