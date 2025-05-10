import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '@/constants/routes';
import { LocalStorageKey } from '@/constants/enum';
import AuthWrapper from '@/wrappers/AuthWrapper';
import { lazyLoad } from '@/utils/lazyLoad';
import { useAuthStore } from '@/stores/auth';

// Error Boundary component
const ErrorBoundary = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi!</h1>
        <p className="text-gray-700 mb-4">Đã có lỗi xảy ra khi tải trang. Vui lòng thử lại sau.</p>
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

// Lazy load components with retry mechanism
const Home = lazyLoad(() => import('@/pages/Home'));
const Login = lazyLoad(() => import('@/pages/auth/Login'));
const Features = lazyLoad(() => import('@/pages/Features'));
const Profile = lazyLoad(() => import('@/pages/Profile'));
const TemplateTable = lazyLoad(() => import('@/pages/demo/TemplateTable'));
const PeaCalc = lazyLoad(() => import('@/pages/demo/PeaCalc'));
const NotFound = lazyLoad(() => import('@/pages/NotFound'));

// App Wrapper with force logout handling
const AppWrapper = () => {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const isForceLogout = localStorage.getItem(LocalStorageKey.IS_FORCE_LOGOUT);

    if (isForceLogout) {
      localStorage.removeItem(LocalStorageKey.IS_FORCE_LOGOUT);
      logout();
      window.location.href = ROUTES.LOGIN;
    }
  }, [logout]);

  return null;
};

// Create router
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route element={<AppWrapper />} />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.FEATURES.ROOT} element={<Features />} />
      <Route path={ROUTES.FEATURES.TEMPLATE_TABLE} element={<TemplateTable />} />
      <Route path={ROUTES.FEATURES.PEA_CALC} element={<PeaCalc />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route element={<AuthWrapper />}>
        {/* <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.FEATURES.ROOT} element={<Features />} />
         */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
