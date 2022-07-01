import { useContext } from 'react';
import { Route, useNavigate, useLocation, Navigate} from 'react-router-dom';

import { AuthContext } from '../context/authContext';


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};


export default ProtectedRoute