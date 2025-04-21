// src/types/database.ts

// Header Slider
export interface HeaderSlide {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image_url: string;
    cta_text: string;
    cta_link: string;
    display_order: number;
    active: boolean;
  }
  
  export interface HeaderSettings {
    auto_rotate: boolean;
    rotation_interval: number; // seconds
    transition_effect: string;
  }
  
  // Offerings
  export interface OfferingCategory {
    id: string;
    title: string;
    description: string;
    icon_url: string;
    display_order: number;
  }
  
  export interface OfferingItem {
    id: string;
    category_id: string;
    title: string;
    description: string;
    image_url: string;
    link_text: string;
    link_url: string;
    display_order: number;
    featured: boolean;
  }
  
  // Reasons to Choose
  export interface ReasonToChoose {
    id: string;
    title: string;
    description: string;
    icon_url: string;
    display_order: number;
  }
  
  // Interoperability Solutions
  export interface InteroperabilityCenter {
    title: string;
    subtitle: string;
    image_url: string;
  }
  
  export interface InteroperabilityConnection {
    id: string;
    title: string;
    description: string;
    icon_url: string;
    angle: number; // 0-360
    distance: number; // 0-100
    active: boolean;
  }
  
  export interface InteroperabilitySettings {
    animation_enabled: boolean;
    highlight_on_hover: boolean;
  }
  
  // Tech Stack
  export interface TechCategory {
    id: string;
    name: string;
    display_order: number;
  }
  
  export interface Technology {
    id: string;
    category_id: string;
    name: string;
    logo_url: string;
    website_url: string;
    display_order: number;
  }
  
  // Efficiency Section
  export interface EfficiencyHeading {
    title: string;
    subtitle: string;
  }
  
  export interface EfficiencyBlock {
    id: string;
    title: string;
    description: string;
    image_url: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    cta_text: string;
    cta_link: string;
    active: boolean;
  }
  
  // Navigation
  export interface MenuItem {
    id: string;
    title: string;
    url: string;
    display_order: number;
    has_children: boolean;
  }
  
  export interface SubMenuItem {
    id: string;
    parent_id: string;
    title: string;
    url: string;
    display_order: number;
  }
  
  // Contact Info
  export interface SocialMedia {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  }
  
  export interface ContactInfo {
    address: string;
    email: string;
    phone: string;
    office_hours: string;
    social_media: SocialMedia;
  }
  
  // Site Settings
  export interface SiteSettings {
    logo_url: string;
    favicon_url: string;
    company_name: string;
    tagline: string;
    copyright_text: string;
    meta_description: string;
    meta_keywords: string;
    google_analytics_id: string;
  }