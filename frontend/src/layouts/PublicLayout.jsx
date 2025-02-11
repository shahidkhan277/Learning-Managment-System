import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicLayout = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default PublicLayout