import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ContactInfo, SiteSettings, MenuItem } from '@/types/database';

interface FooterProps {
  contactInfo: ContactInfo;
  siteSettings: SiteSettings;
  mainMenu: MenuItem[];
}

const Footer: React.FC<FooterProps> = ({ contactInfo, siteSettings, mainMenu }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background wave pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/img_group_15.png"
          alt="Background Wave"
          fill
          className="object-cover opacity-70"
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Link href="/">
                <div className="h-12 w-40 relative">
                  <Image
                    src={siteSettings.logo_url || '/images/img_blue_4.png'}
                    alt={siteSettings.company_name}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              </Link>
            </div>
            <p className="text-gray-700 mb-4">
              {siteSettings.tagline}
            </p>
            <div className="flex space-x-4">
              {contactInfo.social_media.facebook && (
                <a 
                  href={contactInfo.social_media.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-primary-500 hover:text-primary-600 transition-colors"
                >
                  <div className="w-8 h-8 relative">
                    <Image 
                      src="/images/img_facebook.png" 
                      alt="Facebook"
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              )}
              {contactInfo.social_media.instagram && (
                <a 
                  href={contactInfo.social_media.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-primary-500 hover:text-primary-600 transition-colors"
                >
                  <div className="w-8 h-8 relative">
                    <Image 
                      src="/images/img_instagram.png" 
                      alt="Instagram"
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              )}
              {contactInfo.social_media.linkedin && (
                <a 
                  href={contactInfo.social_media.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-primary-500 hover:text-primary-600 transition-colors"
                >
                  <div className="w-8 h-8 relative">
                    <Image 
                      src="/images/img_linkedin.png" 
                      alt="LinkedIn"
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-darkBlue mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {mainMenu.map((item) => (
                <li key={item.id}>
                  <Link 
                    href={item.url} 
                    className="text-primary-600 hover:text-primary-500 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-darkBlue mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.address && (
                <li className="flex items-start">
                  <div className="mt-1 mr-2 w-5 h-5 relative flex-shrink-0">
                    <Image
                      src="/images/img_maps_and_flags.png"
                      alt="Location"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-gray-700">{contactInfo.address}</span>
                </li>
              )}
              {contactInfo.email && (
                <li className="flex items-center">
                  <div className="mr-2 w-5 h-5 relative flex-shrink-0">
                    <Image
                      src="/images/img_mail.png"
                      alt="Email"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <a 
                    href={`mailto:${contactInfo.email}`} 
                    className="text-primary-600 hover:text-primary-500 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.phone && (
                <li className="flex items-center">
                  <div className="mr-2 w-5 h-5 relative flex-shrink-0">
                    <Image
                      src="/images/img_viber.png"
                      alt="Phone"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <a 
                    href={`tel:${contactInfo.phone}`} 
                    className="text-primary-600 hover:text-primary-500 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo.office_hours && (
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{contactInfo.office_hours}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-darkBlue mb-4">Stay Updated</h3>
            <p className="text-gray-700 mb-3">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 placeholder-gray-400 flex-grow"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright and Bottom Info */}
        <div className="pt-8 border-t border-gray-200 text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center">
          <div>
            {siteSettings.copyright_text 
              ? siteSettings.copyright_text.replace(/\{year\}/g, year.toString())
              : `© ${year} ${siteSettings.company_name}. All rights reserved.`
            }
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-primary-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-primary-500 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;