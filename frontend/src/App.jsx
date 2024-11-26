import { HomePage } from "./pages/home/HomePage";
import { Header } from "./layout/Header";
import { ProdContext, ProdContextProvider } from "./context/ProductsContext";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { Products } from "./pages/products/Products";
import { ProductDetails } from "./components/ProductDetails";
import { ProductsCategories } from "./pages/products/ProductsCategories";
import { Carrito } from "./pages/products/Carrito";
import { LoginPage } from "./pages/login/Login";
import { Register } from "./pages/login/Register";
import { PanelUsuario } from "./pages/login/PanelUsuario";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { PaymentGateway } from "./pages/payment/PaymentGateway";
import { ProductsSearch } from "./pages/products/ProductsSearch";

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
    path: "/products/search/:search",
    element: (
      <>
        <Header />
        <ProductsSearch />
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
  {
    path: "/carrito",
    element: (
      <>
        <Header />
        <Carrito />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Header />
        <LoginPage />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Header />
        <Register />
      </>
    ),
  },
  {
    path: "/paneldeusuario/:username",
    element: (
      <>
        <ProtectedRoute>
          <PanelUsuario />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/paymentgateway/:username",
    element: (
      <>
        <ProtectedRoute>
          <PaymentGateway />
        </ProtectedRoute>
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
