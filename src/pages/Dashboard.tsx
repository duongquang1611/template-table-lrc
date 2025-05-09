import { useAuthStore } from '@/stores/auth';

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Chào mừng đến với trang quản trị</p>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
