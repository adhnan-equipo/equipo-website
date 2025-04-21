// src/lib/db.ts
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from './firebase';
import { 
  HeaderSlide, 
  HeaderSettings, 
  OfferingCategory, 
  OfferingItem,
  ReasonToChoose,
  InteroperabilityCenter,
  InteroperabilityConnection,
  InteroperabilitySettings,
  TechCategory,
  Technology,
  EfficiencyHeading,
  EfficiencyBlock,
  MenuItem,
  SubMenuItem,
  ContactInfo,
  SiteSettings
} from '../types/database';

const BASE_PATH = 'equipe_website';

// Header Slider
export async function getHeaderSlides(): Promise<HeaderSlide[]> {
  const slidesRef = ref(db, `${BASE_PATH}/header_slider/slides`);
  const snapshot = await get(slidesRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .sort((a: any, b: any) => a.display_order - b.display_order)
      .filter((slide: any) => slide.active);
  }
  
  return [];
}

export async function getHeaderSettings(): Promise<HeaderSettings> {
  const settingsRef = ref(db, `${BASE_PATH}/header_slider/settings`);
  const snapshot = await get(settingsRef);
  
  if (snapshot.exists()) {
    return snapshot.val();
  }
  
  return {
    auto_rotate: true,
    rotation_interval: 5,
    transition_effect: 'fade'
  };
}

// Offerings
export async function getOfferingCategories(): Promise<OfferingCategory[]> {
  const categoriesRef = ref(db, `${BASE_PATH}/offerings/categories`);
  const snapshot = await get(categoriesRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .sort((a: any, b: any) => a.display_order - b.display_order);
  }
  
  return [];
}

export async function getOfferingItems(categoryId?: string): Promise<OfferingItem[]> {
  const itemsRef = ref(db, `${BASE_PATH}/offerings/items`);
  let offeringQuery;
  
  if (categoryId) {
    offeringQuery = query(
      itemsRef,
      orderByChild('category_id'),
      equalTo(categoryId)
    );
  } else {
    offeringQuery = itemsRef;
  }
  
  const snapshot = await get(offeringQuery);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .sort((a: any, b: any) => a.display_order - b.display_order);
  }
  
  return [];
}

export async function getFeaturedOfferingItems(): Promise<OfferingItem[]> {
  const itemsRef = ref(db, `${BASE_PATH}/offerings/items`);
  const snapshot = await get(itemsRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .filter((item: any) => item.featured)
      .sort((a: any, b: any) => a.display_order - b.display_order);
  }
  
  return [];
}

// Reasons to Choose
export async function getReasonsToChoose(): Promise<ReasonToChoose[]> {
  const reasonsRef = ref(db, `${BASE_PATH}/reasons_to_choose`);
  const snapshot = await get(reasonsRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .sort((a: any, b: any) => a.display_order - b.display_order);
  }
  
  return [];
}

// Interoperability Solutions
export async function getInteroperabilityCenter(): Promise<InteroperabilityCenter> {
  const centerRef = ref(db, `${BASE_PATH}/interoperability_solutions/center`);
  const snapshot = await get(centerRef);
  
  if (snapshot.exists()) {
    return snapshot.val();
  }
  
  return {
    title: 'Interoperability Solutions',
    subtitle: 'Connect with all systems',
    image_url: '/placeholder.png'
  };
}

export async function getInteroperabilityConnections(): Promise<InteroperabilityConnection[]> {
  const connectionsRef = ref(db, `${BASE_PATH}/interoperability_solutions/connections`);
  const snapshot = await get(connectionsRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .filter((connection: any) => connection.active);
  }
  
  return [];
}

export async function getInteroperabilitySettings(): Promise<InteroperabilitySettings> {
  const settingsRef = ref(db, `${BASE_PATH}/interoperability_solutions/settings`);
  const snapshot = await get(settingsRef);
  
  if (snapshot.exists()) {
    return snapshot.val();
  }
  
  return {
    animation_enabled: true,
    highlight_on_hover: true
  };
}

// Tech Stack
export async function getTechCategories(): Promise<TechCategory[]> {
  const categoriesRef = ref(db, `${BASE_PATH}/tech_stack/categories`);
  const snapshot = await get(categoriesRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .sort((a: any, b: any) => a.display_order - b.display_order);
  }
  
  return [];
}

export async function getTechnologies(categoryId?: string): Promise<Technology[]> {
  const techRef = ref(db, `${BASE_PATH}/tech_stack/technologies`);
  let techQuery;
  
  if (categoryId) {
    techQuery = query(
      techRef,
      orderByChild('category_id'),
      equalTo(categoryId)
    );
  } else {
    techQuery = techRef;
  }
  
  const snapshot = await get(techQuery);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .sort((a: any, b: any) => a.display_order - b.display_order);
  }
  
  return [];
}

// Efficiency Section
export async function getEfficiencyHeading(): Promise<EfficiencyHeading> {
  const headingRef = ref(db, `${BASE_PATH}/efficiency_section/heading`);
  const snapshot = await get(headingRef);
  
  if (snapshot.exists()) {
    return snapshot.val();
  }
  
  return {
    title: 'Maximize Efficiency, Minimize Resources',
    subtitle: 'How Equipe Helps'
  };
}

export async function getEfficiencyBlocks(): Promise<EfficiencyBlock[]> {
  const blocksRef = ref(db, `${BASE_PATH}/efficiency_section/blocks`);
  const snapshot = await get(blocksRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .filter((block: any) => block.active);
  }
  
  return [];
}

// Navigation
export async function getMainMenu(): Promise<MenuItem[]> {
  const menuRef = ref(db, `${BASE_PATH}/navigation/main_menu`);
  const snapshot = await get(menuRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .sort((a: any, b: any) => a.display_order - b.display_order);
  }
  
  return [];
}

export async function getSubMenu(parentId: string): Promise<SubMenuItem[]> {
  const subMenuRef = ref(db, `${BASE_PATH}/navigation/sub_menu`);
  const subMenuQuery = query(
    subMenuRef,
    orderByChild('parent_id'),
    equalTo(parentId)
  );
  
  const snapshot = await get(subMenuQuery);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)
      .sort((a: any, b: any) => a.display_order - b.display_order);
  }
  
  return [];
}

// Contact Info
export async function getContactInfo(): Promise<ContactInfo> {
  const contactRef = ref(db, `${BASE_PATH}/contact_info`);
  const snapshot = await get(contactRef);
  
  if (snapshot.exists()) {
    return snapshot.val();
  }
  
  return {
    address: '',
    email: '',
    phone: '',
    office_hours: '',
    social_media: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  };
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  const settingsRef = ref(db, `${BASE_PATH}/site_settings`);
  const snapshot = await get(settingsRef);
  
  if (snapshot.exists()) {
    return snapshot.val();
  }
  
  return {
    logo_url: '',
    favicon_url: '',
    company_name: 'Equipe',
    tagline: '',
    copyright_text: '',
    meta_description: '',
    meta_keywords: '',
    google_analytics_id: ''
  };
}