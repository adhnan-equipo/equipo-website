import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, SubMenuItem, SiteSettings } from '@/types/database';
import Button from '../ui/Button';

interface HeaderProps {
  mainMenu: MenuItem[];
  subMenus: Record<string, SubMenuItem[]>;
  siteSettings: SiteSettings;
}

const Header: React.FC<HeaderProps> = ({ mainMenu, subMenus, siteSettings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (activeSubMenu) setActiveSubMenu(null);
  };

  // Toggle submenu
  const toggleSubMenu = (id: string) => {
    setActiveSubMenu(activeSubMenu === id ? null : id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <div className="h-10 w-32 relative">
            <Image
              src={siteSettings.logo_url || '/logo.svg'}
              alt={siteSettings.company_name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 120px, 128px"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          {mainMenu.map((item) => (
            <div key={item.id} className="relative group">
              {item.has_children ? (
                <>
                  <button
                    className={`flex items-center px-1 py-2 font-medium ${
                      isScrolled ? 'text-darkBlue' : 'text-white'
                    } hover:text-primary-500 transition-colors`}
                    onClick={() => toggleSubMenu(item.id)}
                    aria-expanded={activeSubMenu === item.id}
                  >
                    {item.title}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown for desktop */}
                  <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {subMenus[item.id]?.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.url}
                        className="block px-4 py-2 text-sm text-darkBlue hover:bg-gray-100"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.url}
                  className={`px-1 py-2 font-medium ${
                    isScrolled ? 'text-darkBlue' : 'text-white'
                  } hover:text-primary-500 transition-colors`}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}

          <Button
            variant={isScrolled ? 'primary' : 'secondary'}
            size="sm"
            href="/contact"
          >
            Request a Demo
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative z-50"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span
              className={`line ${
                isScrolled || mobileMenuOpen ? 'bg-darkBlue' : 'bg-white'
              }`}
            ></span>
            <span
              className={`line ${
                isScrolled || mobileMenuOpen ? 'bg-darkBlue' : 'bg-white'
              }`}
            ></span>
            <span
              className={`line ${
                isScrolled || mobileMenuOpen ? 'bg-darkBlue' : 'bg-white'
              }`}
            ></span>
          </div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-40 lg:hidden"
            >
              <div className="flex flex-col h-full p-8 pt-20">
                <nav className="flex flex-col space-y-4">
                  {mainMenu.map((item) => (
                    <div key={item.id}>
                      {item.has_children ? (
                        <>
                          <button
                            className="flex items-center justify-between w-full py-2 text-lg font-medium text-darkBlue border-b border-gray-200"
                            onClick={() => toggleSubMenu(item.id)}
                            aria-expanded={activeSubMenu === item.id}
                          >
                            {item.title}
                            <svg
                              className={`w-5 h-5 transition-transform ${
                                activeSubMenu === item.id ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          <AnimatePresence>
                            {activeSubMenu === item.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden pl-4"
                              >
                                {subMenus[item.id]?.map((subItem) => (
                                  <Link
                                    key={subItem.id}
                                    href={subItem.url}
                                    className="block py-2 text-base text-darkBlue"
                                    onClick={toggleMobileMenu}
                                  >
                                    {subItem.title}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.url}
                          className="block py-2 text-lg font-medium text-darkBlue border-b border-gray-200"
                          onClick={toggleMobileMenu}
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-8">
                  <Button
                    variant="primary"
                    size="lg"
                    href="/contact"
                    className="w-full"
                    onClick={toggleMobileMenu}
                  >
                    Request a Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .hamburger {
          width: 24px;
          height: 18px;
          position: relative;
          transform: rotate(0deg);
          transition: 0.5s ease-in-out;
          cursor: pointer;
        }
        
        .hamburger .line {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: 0.25s ease-in-out;
        }
        
        .hamburger .line:nth-child(1) {
          top: 0;
        }
        
        .hamburger .line:nth-child(2) {
          top: 8px;
        }
        
        .hamburger .line:nth-child(3) {
          top: 16px;
        }
        
        .hamburger.active .line:nth-child(1) {
          top: 8px;
          transform: rotate(135deg);
        }
        
        .hamburger.active .line:nth-child(2) {
          opacity: 0;
          left: -60px;
        }
        
        .hamburger.active .line:nth-child(3) {
          top: 8px;
          transform: rotate(-135deg);
        }
      `}</style>
    </header>
  );
};

export default Header;