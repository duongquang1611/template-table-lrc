import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useAuthStore } from '@/stores/auth';

function AuthWrapper() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    // Kiểm tra xác thực dựa trên token từ Zustand
    const checkAuth = async () => {
      const auth = !!accessToken;
      setIsAuth(auth);
      setLoading(false);
    };

    checkAuth();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default AuthWrapper;
