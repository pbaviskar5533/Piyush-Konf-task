
"use client";

import React, { useState, useEffect } from 'react';
import AppSidebar, { MobileHeader } from '@/components/navigation/AppSidebar';
import { cn } from '@/lib/utils';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <AppSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-col">
        <MobileHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className={cn(
          "flex-1 p-4 pt-6 md:p-8 transition-[margin-left] duration-300 ease-in-out",
          {"md:ml-64": !isMobile} // Apply margin only on desktop if sidebar is conceptually there
          // isSidebarOpen && isMobile means sidebar is overlaid, no margin needed
          // !isSidebarOpen && isMobile means sidebar is hidden, no margin needed
          // if sidebar was collapsible on desktop, logic would be more complex here
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
