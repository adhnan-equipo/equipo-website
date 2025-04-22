import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import OfferingsSection from '@/components/sections/OfferingsSection';
import ReasonsSection from '@/components/sections/ReasonsSection';
import InteroperabilitySection from '@/components/sections/InteroperabilitySection';
import TechStackSection from '@/components/sections/TechStackSection';
import EfficiencySection from '@/components/sections/EfficiencySection';
import VideoSection from '@/components/sections/VideoSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  getHeaderSlides,
  getHeaderSettings,
  getOfferingCategories,
  getOfferingItems,
  getReasonsToChoose,
  getInteroperabilityCenter,
  getInteroperabilityConnections,
  getInteroperabilitySettings,
  getTechCategories,
  getTechnologies,
  getEfficiencyHeading,
  getEfficiencyBlocks,
  getMainMenu,
  getSubMenu,
  getContactInfo,
  getSiteSettings,
} from '@/lib/db';

// Incremental Static Regeneration: revalidate every hour
export const revalidate = 3600;

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    console.log('📝 Generating site metadata...');
    // Fetch site settings for SEO
    const siteSettings = await getSiteSettings();
    
    return {
      title: siteSettings.company_name,
      description: siteSettings.meta_description,
      keywords: siteSettings.meta_keywords,
      icons: {
        icon: siteSettings.favicon_url || '/favicon.ico',
      },
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://equipe-healthcare.com',
        siteName: siteSettings.company_name,
        title: siteSettings.company_name,
        description: siteSettings.meta_description,
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: siteSettings.company_name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: siteSettings.company_name,
        description: siteSettings.meta_description,
        images: ['/twitter-image.jpg'],
      },
    };
  } catch (error) {
    console.error('❌ Error generating metadata:', error);
    // Return fallback metadata
    return {
      title: 'Equipe Healthcare - Advanced Healthcare Operations Platform',
      description: 'Equipe delivers advanced healthcare operations solutions with integrated systems for better patient care and operational efficiency.',
    };
  }
}

// Helper to prepare partner logos
const preparePartnerLogos = () => {
  return [
    { name: 'Partner 1', src: '/images/img_logo.svg' },
    { name: 'Partner 2', src: '/images/img_logo_light_blue_A700.svg' },
    { name: 'Partner 3', src: '/images/img_logo_deep_purple_A200.svg' },
    { name: 'Partner 4', src: '/images/img_logo_yellow_900.svg' },
  ];
};

export default async function Home() {
  console.log('🏠 Rendering homepage...');
  const startTime = performance.now();

  try {
    // Fetch all data concurrently for better performance
    console.log('📊 Fetching all homepage data concurrently...');
    const [
      headerSlides,
      headerSettings,
      offeringCategories,
      offeringItems,
      reasonsToChoose,
      interoperabilityCenter,
      interoperabilityConnections,
      interoperabilitySettings,
      techCategories,
      technologies,
      efficiencyHeading,
      efficiencyBlocks,
      mainMenu,
      contactInfo,
      siteSettings,
    ] = await Promise.all([
      getHeaderSlides(),
      getHeaderSettings(),
      getOfferingCategories(),
      getOfferingItems(),
      getReasonsToChoose(),
      getInteroperabilityCenter(),
      getInteroperabilityConnections(),
      getInteroperabilitySettings(),
      getTechCategories(),
      getTechnologies(),
      getEfficiencyHeading(),
      getEfficiencyBlocks(),
      getMainMenu(),
      getContactInfo(),
      getSiteSettings(),
    ]);

    console.log(`✅ Core data loaded in ${(performance.now() - startTime).toFixed(2)}ms`);
    
    // Fetch submenus for items with children
    const menuItemsWithChildren = mainMenu.filter(item => item.has_children);
    
    // Create a map to store submenus
    const subMenus: Record<string, any[]> = {};
    
    if (menuItemsWithChildren.length > 0) {
      console.log(`📁 Fetching submenus for ${menuItemsWithChildren.length} menu items...`);
      
      // Fetch all submenus concurrently
      await Promise.all(
        menuItemsWithChildren.map(async (item) => {
          const subMenu = await getSubMenu(item.id);
          subMenus[item.id] = subMenu;
        })
      );
      
      console.log(`✅ Submenus loaded in ${(performance.now() - startTime).toFixed(2)}ms`);
    } else {
      console.log('ℹ️ No submenu items to fetch');
    }
    
    // Log total data loading time
    console.log(`✨ Total data loading completed in ${(performance.now() - startTime).toFixed(2)}ms`);

    // Prepare partner logos
    const partnerLogos = preparePartnerLogos();

    return (
      <>
        {/* Header component */}
        <Header 
          mainMenu={mainMenu}
          subMenus={subMenus}
          siteSettings={siteSettings}
        />
        
        {/* Main content */}
        <main>
          <HeroSection
            slides={headerSlides}
            settings={headerSettings}
            partnerLogos={partnerLogos}
          />
          
          <OfferingsSection
            categories={offeringCategories}
            items={offeringItems}
          />
          
          <ReasonsSection
            reasons={reasonsToChoose}
          />
          
          <InteroperabilitySection
            center={interoperabilityCenter}
            connections={interoperabilityConnections}
            settings={interoperabilitySettings}
          />
          
          <TechStackSection
            categories={techCategories}
            technologies={technologies}
          />
          
          {/* Video Section */}
          <VideoSection 
            videoThumbnail="/images/img_group_176.png"
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />
          
          <EfficiencySection
            heading={efficiencyHeading}
            blocks={efficiencyBlocks}
          />
        </main>
        
        {/* Footer */}
        <Footer 
          contactInfo={contactInfo} 
          siteSettings={siteSettings} 
          mainMenu={mainMenu}
        />
      </>
    );
  } catch (error) {
    console.error('❌ Critical error rendering homepage:', error);
    
    // Render a simplified fallback page
    return (
      <div className="min-h-screen flex items-center justify-center bg-lightGray p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-darkBlue mb-4">
            We'll be right back
          </h1>
          <p className="text-gray-600 mb-6">
            We're experiencing some technical difficulties. Please try again in a few moments.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
}