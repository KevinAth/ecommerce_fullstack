import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProdContext } from "../../context/ProductsContext";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { isAutenticated } = useContext(ProdContext);
  console.log(isAutenticated);
  return isAutenticated ? children : navigate(-1);
};

export default ProtectedRoute;
