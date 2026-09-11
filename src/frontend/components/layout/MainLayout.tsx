import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
}