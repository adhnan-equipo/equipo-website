'use client';

import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FirebaseConnectionStatus from '@/components/ui/FirebaseConnectionStatus';
import { MenuItem, SubMenuItem, SiteSettings, ContactInfo } from '@/types/database';

interface MainLayoutProps {
  children: React.ReactNode;
  mainMenu: MenuItem[];
  subMenus: Record<string, SubMenuItem[]>;
  siteSettings: SiteSettings;
  contactInfo: ContactInfo;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  mainMenu,
  subMenus,
  siteSettings,
  contactInfo,
}) => {
  // Handle Google Analytics initialization if ID is available
  useEffect(() => {
    if (siteSettings.google_analytics_id && typeof window !== 'undefined') {
      // Add Google Analytics script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${siteSettings.google_analytics_id}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', siteSettings.google_analytics_id);

      // Clean up on unmount
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [siteSettings.google_analytics_id]);

  return (
    <div className="min-h-screen flex flex-col font-['Poppins']">
      <Header 
        mainMenu={mainMenu} 
        subMenus={subMenus} 
        siteSettings={siteSettings} 
      />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer 
        contactInfo={contactInfo} 
        siteSettings={siteSettings} 
        mainMenu={mainMenu} 
      />
      
      {/* Show connection status in development only */}
      {process.env.NODE_ENV === 'development' && (
        <FirebaseConnectionStatus />
      )}
    </div>
  );
};

// Add dataLayer to Window interface
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default MainLayout;