import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { type RootState } from '../store';

type ProtectedRouteProps = {
  redirectTo?: string;
};

const ProtectedRoute = ({ redirectTo = '/login' }: ProtectedRouteProps) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    console.log('🔒 No token found, redirecting to login...');
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
