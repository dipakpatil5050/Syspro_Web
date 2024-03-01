import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { logout } from "../../redux/reducers/authReducer";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return navigate("/");
  }

  return children;
}

export default ProtectedRoute;
