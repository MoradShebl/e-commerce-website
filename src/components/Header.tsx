import { useState, useRef, useEffect } from 'react';

interface ChevronDownProps {
  isOpen?: boolean;
}

const Icons = {
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Search: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Cart: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  ChevronDown: ({ isOpen = false }: ChevronDownProps) => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
    >
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

const navItems: string[] = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState<boolean>(false);
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileDropdownItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Animate mobile menu items in
      menuLinksRef.current.forEach((item, index) => {
        if (item) {
          item.style.transform = 'translateX(0px)';
          item.style.opacity = '1';
          item.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${(index + 1) * 0.1}s`;
        }
      });

      // Animate the mobile shop dropdown trigger
      const shopTrigger = document.querySelector('#mobile-menu .cursor-pointer');
      if (shopTrigger) {
        (shopTrigger as HTMLElement).style.transform = 'translateX(0px)';
        (shopTrigger as HTMLElement).style.opacity = '1';
        (shopTrigger as HTMLElement).style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.1s';
      }
    } else {
      // Animate mobile menu items out
      menuLinksRef.current.forEach((item, index) => {
        if (item) {
          item.style.transform = 'translateX(-20px)';
          item.style.opacity = '0';
          item.style.transition = `all 0.6s cubic-bezier(0.55, 0, 0.1, 1) ${index * 0.05}s`;
        }
      });

      // Reset mobile dropdown when closing mobile menu
      setIsMobileDropdownOpen(false);

      // Animate the mobile shop dropdown trigger out
      const shopTrigger = document.querySelector('#mobile-menu .cursor-pointer');
      if (shopTrigger) {
        (shopTrigger as HTMLElement).style.transform = 'translateX(-20px)';
        (shopTrigger as HTMLElement).style.opacity = '0';
        (shopTrigger as HTMLElement).style.transition = 'all 0.6s cubic-bezier(0.55, 0, 0.1, 1) 0s';
      }
    }
  }, [isMobileMenuOpen]);

  // Dropdown animation (Desktop)
  useEffect(() => {
    if (dropdownRef.current) {
      if (isDropdownOpen) {
        // Show dropdown with scale and fade animation
        dropdownRef.current.style.display = 'flex';
        dropdownRef.current.style.transform = 'translateY(-10px) scale(0.95)';
        dropdownRef.current.style.opacity = '0';

        // Force reflow
        dropdownRef.current.offsetHeight;

        dropdownRef.current.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
        dropdownRef.current.style.transform = 'translateY(0px) scale(1)';
        dropdownRef.current.style.opacity = '1';

        // Animate dropdown items
        dropdownItemsRef.current.forEach((item, index) => {
          if (item) {
            item.style.transform = 'translateY(-10px)';
            item.style.opacity = '0';
            item.style.transition = `all 0.4s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.08}s`;

            // Force reflow
            item.offsetHeight;

            item.style.transform = 'translateY(0px)';
            item.style.opacity = '1';
          }
        });
      } else {
        // Hide dropdown with reverse animation
        dropdownRef.current.style.transition = 'all 0.2s cubic-bezier(0.55, 0, 0.1, 1)';
        dropdownRef.current.style.transform = 'translateY(-10px) scale(0.95)';
        dropdownRef.current.style.opacity = '0';

        setTimeout(() => {
          if (dropdownRef.current) {
            dropdownRef.current.style.display = 'none';
          }
        }, 200);
      }
    }
  }, [isDropdownOpen]);

  // Mobile dropdown animation
  useEffect(() => {
    if (mobileDropdownRef.current) {
      if (isMobileDropdownOpen) {
        // Show mobile dropdown
        mobileDropdownRef.current.style.maxHeight = '200px';
        mobileDropdownRef.current.style.opacity = '1';

        // Animate mobile dropdown items
        mobileDropdownItemsRef.current.forEach((item, index) => {
          if (item) {
            item.style.transform = 'translateX(0px)';
            item.style.opacity = '1';
            item.style.transition = `all 0.4s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`;
          }
        });
      } else {
        // Hide mobile dropdown
        mobileDropdownRef.current.style.maxHeight = '0px';
        mobileDropdownRef.current.style.opacity = '0';

        // Reset mobile dropdown items
        mobileDropdownItemsRef.current.forEach((item) => {
          if (item) {
            item.style.transform = 'translateX(-20px)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.3s cubic-bezier(0.55, 0, 0.1, 1)';
          }
        });
      }
    }
  }, [isMobileDropdownOpen]);

  // Mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Animate mobile menu items in
      menuLinksRef.current.forEach((item, index) => {
        if (item) {
          item.style.transform = 'translateX(0px)';
          item.style.opacity = '1';
          item.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`;
        }
      });
    } else {
      // Animate mobile menu items out
      menuLinksRef.current.forEach((item, index) => {
        if (item) {
          item.style.transform = 'translateX(-20px)';
          item.style.opacity = '0';
          item.style.transition = `all 0.6s cubic-bezier(0.55, 0, 0.1, 1) ${index * 0.05}s`;
        }
      });
    }
  }, [isMobileMenuOpen]);

  // Dropdown animation
  useEffect(() => {
    if (dropdownRef.current) {
      if (isDropdownOpen) {
        // Show dropdown with scale and fade animation
        dropdownRef.current.style.display = 'flex';
        dropdownRef.current.style.transform = 'translateY(-10px) scale(0.95)';
        dropdownRef.current.style.opacity = '0';

        // Force reflow
        dropdownRef.current.offsetHeight;

        dropdownRef.current.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
        dropdownRef.current.style.transform = 'translateY(0px) scale(1)';
        dropdownRef.current.style.opacity = '1';

        // Animate dropdown items
        dropdownItemsRef.current.forEach((item, index) => {
          if (item) {
            item.style.transform = 'translateY(-10px)';
            item.style.opacity = '0';
            item.style.transition = `all 0.4s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.08}s`;

            // Force reflow
            item.offsetHeight;

            item.style.transform = 'translateY(0px)';
            item.style.opacity = '1';
          }
        });
      } else {
        // Hide dropdown with reverse animation
        dropdownRef.current.style.transition = 'all 0.2s cubic-bezier(0.55, 0, 0.1, 1)';
        dropdownRef.current.style.transform = 'translateY(-10px) scale(0.95)';
        dropdownRef.current.style.opacity = '0';

        setTimeout(() => {
          if (dropdownRef.current) {
            dropdownRef.current.style.display = 'none';
          }
        }, 200);
      }
    }
  }, [isDropdownOpen]);

  const handleDropdownToggle = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseEnter = (): void => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = (): void => {
    // Add a small delay before closing to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };
  
  const handleMobileDropdownToggle = (): void => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);



  return (
    <div className="verysm:hidden xl:fixed sticky top-0 w-full z-50 bg-white">
      {/* Announcement Bar */}
      <div className="bg-black h-auto min-h-[32px] flex items-center justify-center text-white text-sm py-1 w-full">
        <p className="text-center px-2 sm:px-4 md:px-0 text-xs sm:text-sm">
          Order and get 20% off to your first order.
          <a className="underline text-xs sm:text-base cursor-pointer ml-1 inline-block">Order Now!</a>
        </p>
      </div>

      {/* Main Header */}
      <header className="verysm:hidden fixed w-full bg-white border-b border-[#E8ECEF] border-opacity-30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                className="p-2 lg:hidden"
                aria-label="Menu"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Icons.Menu />
              </button>

              <div className="bold-text text-2xl lg:text-3xl mx-3">
                <a href="/"><span className="font-black">SHOP.CO</span></a>
              </div>
            </div>

            {/* Navigation Links - Hidden on Mobile & Tablet */}
            <div className="hidden lg:flex items-center gap-6 relative">
              <div
                ref={dropdownContainerRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="text-gray-600 text-sm hover:text-black flex items-center gap-1 cursor-pointer py-2 px-1 transition-colors duration-200"
                  onClick={handleDropdownToggle}
                >
                  Shop <Icons.ChevronDown isOpen={isDropdownOpen} />
                </div>

                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md flex-col z-50 p-2 min-w-[120px] border border-gray-100"
                  style={{ display: 'none' }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {['Gym', 'Formal', 'Party', 'Casual'].map((item, index) => (
                    <a
                      key={item}
                      ref={(el) => { dropdownItemsRef.current[index] = el; }}
                      href="#"
                      className="text-gray-600 text-sm hover:text-black hover:bg-gray-50 px-3 py-2 rounded transition-colors duration-200 block"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <a href="#" className="text-gray-600 text-sm hover:text-black flex items-center gap-1 ml-6 transition-colors duration-200">On Sale</a>
              <a href="#new-arrivals" className="text-gray-600 text-sm hover:text-black flex items-center gap-1 transition-colors duration-200">New Arrivals</a>
              <a href="#brands" className="text-gray-600 text-sm hover:text-black flex items-center gap-1 transition-colors duration-200">Brands</a>
            </div>

            {/* Search Bar - Hidden on Mobile & Tablet */}
            <div className="hidden lg:flex flex-1 mx-6 max-w-xl relative">
              <input
                type="search"
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-12 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
              <svg className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 lg:hidden hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Icons.Search />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <Icons.Cart />
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              id="mobile-menu"
              className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed top-[104px] left-0 w-64 h-screen bg-white transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden z-40 shadow-lg`}
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Shop Dropdown */}
                <div className="block">
                  <div
                    className="flex items-center justify-between text-gray-600 text-lg hover:text-black hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-200 cursor-pointer"
                    onClick={handleMobileDropdownToggle}
                  >
                    <span>Shop</span>
                    <Icons.ChevronDown isOpen={isMobileDropdownOpen} />
                  </div>

                  {/* Mobile Dropdown Items */}
                  <div
                    ref={mobileDropdownRef}
                    className="overflow-hidden transition-all duration-300 ease-in-out ml-4"
                    style={{ maxHeight: '0px', opacity: 0 }}
                  >
                    <div className="py-2 space-y-2">
                      {['Gym', 'Formal', 'Party', 'Casual'].map((item, index) => (
                        <a
                          key={item}
                          ref={(el) => { mobileDropdownItemsRef.current[index] = el; }}
                          href="#"
                          className="block text-gray-500 text-base hover:text-black hover:bg-gray-50 px-3 py-1 rounded transition-colors duration-200"
                          style={{ opacity: 0, transform: 'translateX(-20px)' }}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Other Mobile Menu Items */}
                {navItems.slice(1).map((item, index) => (
                  <a
                    key={index + 1}
                    ref={(el) => { menuLinksRef.current[index + 1] = el; }}
                    href="#"
                    className="block text-gray-600 text-lg hover:text-black hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-200"
                    style={{ opacity: 0, transform: 'translateX(-20px)' }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;