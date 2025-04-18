'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src="/logo.png"
            alt="Golden Extreme Logo"
            fill
            className="object-contain animate-pulse"
          />
        </div>
        <div className="text-white mt-4 font-medium">Initializing dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {pathname !== '/admin/login' && (
        <div className="bg-yellow-500 h-1 w-full fixed top-0 z-50"></div>
      )}
      {children}
    </div>
  );
}
