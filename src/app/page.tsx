"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardPage from './dashboard/page';
import DashboardLayout from './dashboard/layout';
import LoginPage from './auth/login/page';


export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // Show login page or a loading spinner while we check auth
    return <LoginPage />;
  }

  // If logged in, show the dashboard
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
