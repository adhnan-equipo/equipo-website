import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import OfferingsSection from '@/components/sections/OfferingsSection';
import ReasonsSection from '@/components/sections/ReasonsSection';
import InteroperabilitySection from '@/components/sections/InteroperabilitySection';
import TechStackSection from '@/components/sections/TechStackSection';
import EfficiencySection from '@/components/sections/EfficiencySection';
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
  // Fetch site settings for SEO
  const siteSettings = await getSiteSettings();
  
  return {
    title: siteSettings.company_name,
    description: siteSettings.meta_description,
    keywords: siteSettings.meta_keywords,
    icons: {
      icon: siteSettings.favicon_url || '/favicon.ico',
    },
  };
}

export default async function Home() {
  // Fetch all data concurrently for better performance
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

  // Fetch submenus for items with children
  const menuItemsWithChildren = mainMenu.filter(item => item.has_children);
  
  // Create a map to store submenus
  const subMenus: Record<string, any[]> = {};
  
  // Fetch all submenus concurrently
  await Promise.all(
    menuItemsWithChildren.map(async (item) => {
      const subMenu = await getSubMenu(item.id);
      subMenus[item.id] = subMenu;
    })
  );

  return (
    <MainLayout
      mainMenu={mainMenu}
      subMenus={subMenus}
      siteSettings={siteSettings}
      contactInfo={contactInfo}
    >
      <HeroSection
        slides={headerSlides}
        settings={headerSettings}
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
      
      <EfficiencySection
        heading={efficiencyHeading}
        blocks={efficiencyBlocks}
      />
    </MainLayout>
  );
}