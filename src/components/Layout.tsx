
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import NotificationBell from './NotificationBell';
import { useAuth } from '@/hooks/useAuth';

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Navbar />
        {user && (
          <div className="flex items-center space-x-4">
            <NotificationBell />
          </div>
        )}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
