import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/constants/routes';

const mockUser = {
  name: 'User Name',
  email: 'user@example.com',
  avatar: '', // Nếu có ảnh thật thì thay link ở đây
};

export default function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      // TODO: Lấy user từ API hoặc store, tạm thời mock
      setUser(mockUser);
    } else {
      setUser(null);
    }
  }, [accessToken]);

  return (
    <header className="bg-background-primary shadow-lg w-full">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Link to={ROUTES.HOME} className="text-xl font-bold text-primary-700">
            Home
          </Link>
          <Link
            to={ROUTES.FEATURES.ROOT}
            className="text-text-secondary hover:text-primary-600 transition-colors font-medium"
          >
            Features
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to={ROUTES.PROFILE}
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-medium">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="text-text-secondary font-medium">{user.name}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate(ROUTES.LOGIN);
                }}
                className="ml-2 px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors text-sm"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
