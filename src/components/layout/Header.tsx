import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuItem, SubMenuItem, SiteSettings } from '@/types/database';

interface HeaderProps {
  mainMenu: MenuItem[];
  subMenus: Record<string, SubMenuItem[]>;
  siteSettings: SiteSettings;
}

const Header: React.FC<HeaderProps> = ({ mainMenu, subMenus, siteSettings }) => {
  return (
    <header className="bg-blue-50 py-5 px-6 w-full font-sans sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative">
          <div className="h-24 w-40 relative">
            <Image
              src="/images/img_blue_4.png" 
              alt={siteSettings.company_name || "Equipe"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 160px, 160px"
              priority
            />
          </div>
        </Link>

        {/* Navigation and CTA */}
        <div className="flex items-center">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center mr-8">
            <ul className="flex items-center space-x-8">
              <li>
                <Link href="/" className="text-[#002654] hover:text-[#0046be] transition-colors text-base font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-[#002654] hover:text-[#0046be] transition-colors text-base font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#002654] hover:text-[#0046be] transition-colors text-base font-medium">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-[#002654] hover:text-[#0046be] transition-colors text-base font-medium">
                  Our Solutions
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-[#002654] hover:text-[#0046be] transition-colors text-base font-medium">
                  Our Care Partners
                </Link>
              </li>
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-[#ffd800] text-[#002654] font-medium rounded-full text-base hover:bg-[#ffdd33] transition-colors">
              Request for Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 focus:outline-none" aria-label="Open menu">
            <svg className="w-6 h-6 text-[#002654]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;