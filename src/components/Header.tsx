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

// GSAP CDN script loader
const loadGSAP = () => {
  return new Promise((resolve, reject) => {
    if (window.gsap) {
      resolve(window.gsap);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => resolve(window.gsap);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState<boolean>(false);
  const [gsap, setGsap] = useState<any>(null);
  
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileDropdownItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const chevronRef = useRef<SVGSVGElement | null>(null);
  const mobileChevronRef = useRef<SVGSVGElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load GSAP on component mount
  useEffect(() => {
    loadGSAP().then((gsapInstance) => {
      setGsap(gsapInstance);
    }).catch((error) => {
      console.error('Failed to load GSAP:', error);
    });
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!gsap || !mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      // Animate mobile menu container
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      });

      // Animate mobile menu items in
      const validItems = menuLinksRef.current.filter(item => item !== null);
      gsap.fromTo(validItems, 
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: "power3.out"
        }
      );

      // Animate the mobile shop dropdown trigger
      const shopTrigger = document.querySelector('#mobile-menu .mobile-shop-trigger');
      if (shopTrigger) {
        gsap.fromTo(shopTrigger,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: "power3.out" }
        );
      }
    } else {
      // Animate mobile menu out
      gsap.to(mobileMenuRef.current, {
        x: '-100%',
        duration: 0.5,
        ease: "power3.in"
      });

      // Reset mobile dropdown when closing mobile menu
      setIsMobileDropdownOpen(false);
    }
  }, [isMobileMenuOpen, gsap]);

  // Desktop dropdown animation
  useEffect(() => {
    if (!gsap || !dropdownRef.current) return;

    if (isDropdownOpen) {
      // Show dropdown with scale and fade animation
      gsap.set(dropdownRef.current, { display: 'flex' });
      gsap.fromTo(dropdownRef.current,
        { y: -10, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" }
      );

      // Animate dropdown items
      const validItems = dropdownItemsRef.current.filter(item => item !== null);
      gsap.fromTo(validItems,
        { y: -10, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out"
        }
      );

      // Animate chevron rotation
      if (chevronRef.current) {
        gsap.to(chevronRef.current, { rotation: 180, duration: 0.3, ease: "power3.out" });
      }
    } else {
      // Hide dropdown with reverse animation
      gsap.to(dropdownRef.current,
        { 
          y: -10, 
          scale: 0.95, 
          opacity: 0, 
          duration: 0.2, 
          ease: "power3.in",
          onComplete: () => {
            if (dropdownRef.current) {
              gsap.set(dropdownRef.current, { display: 'none' });
            }
          }
        }
      );

      // Animate chevron rotation back
      if (chevronRef.current) {
        gsap.to(chevronRef.current, { rotation: 0, duration: 0.3, ease: "power3.out" });
      }
    }
  }, [isDropdownOpen, gsap]);

  // Mobile dropdown animation
  useEffect(() => {
    if (!gsap || !mobileDropdownRef.current) return;

    if (isMobileDropdownOpen) {
      // Show mobile dropdown
      gsap.to(mobileDropdownRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: "power3.out"
      });

      // Animate mobile dropdown items
      const validItems = mobileDropdownItemsRef.current.filter(item => item !== null);
      gsap.fromTo(validItems,
        { x: -20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.out"
        }
      );

      // Animate mobile chevron rotation
      if (mobileChevronRef.current) {
        gsap.to(mobileChevronRef.current, { rotation: 180, duration: 0.3, ease: "power3.out" });
      }
    } else {
      // Hide mobile dropdown
      gsap.to(mobileDropdownRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in"
      });

      // Animate mobile chevron rotation back
      if (mobileChevronRef.current) {
        gsap.to(mobileChevronRef.current, { rotation: 0, duration: 0.3, ease: "power3.out" });
      }
    }
  }, [isMobileDropdownOpen, gsap]);

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
    <header className="verysm:hidden sticky  top-0 w-full z-50 bg-white">
      {/* Announcement Bar */}
      <div className="bg-black h-auto min-h-[32px] flex items-center justify-center text-white text-sm py-1 w-full">
        <p className="text-center px-2 sm:px-4 md:px-0 text-xs sm:text-sm">
          Order and get 20% off to your first order.
          <a className="underline text-xs sm:text-base cursor-pointer ml-1 inline-block">Order Now!</a>
        </p>
      </div>

      {/* Main Header */}
      <header className="verysm:hidden sticky  w-full bg-white border-b border-[#E8ECEF] border-opacity-30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                className="p-2 lg:hidden hover:scale-110 transition-transform duration-200"
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
                  Shop 
                  <svg
                    ref={chevronRef}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
              <button className="p-2 lg:hidden hover:bg-gray-100 hover:scale-110 rounded-full transition-all duration-200">
                <Icons.Search />
              </button>
              <button className="p-2 hover:bg-gray-100 hover:scale-110 rounded-full transition-all duration-200">
                <Icons.Cart />
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              id="mobile-menu"
              ref={mobileMenuRef}
              className="fixed top-[104px] left-0 w-auto h-screen bg-white transform -translate-x-full lg:hidden z-40 shadow-lg"
            >
              <div className="px-4 py-6 space-y-4 ">
                {/* Mobile Shop Dropdown */}
                <div className="block">
                  <div
                    className="mobile-shop-trigger flex items-center justify-between text-gray-600 text-lg hover:text-black hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-200 cursor-pointer "
                    onClick={handleMobileDropdownToggle}
                  >
                    <span>Shop</span>
                    <svg
                      ref={mobileChevronRef}
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Mobile Dropdown Items */}
                  <div
                    ref={mobileDropdownRef}
                    className="overflow-hidden ml-4"
                    style={{ height: '0px', opacity: 0 }}
                  >
                    <div className="py-2 space-y-2">
                      {['Gym', 'Formal', 'Party', 'Casual'].map((item, index) => (
                        <a
                          key={item}
                          ref={(el) => { mobileDropdownItemsRef.current[index] = el; }}
                          href="#"
                          className="block text-gray-500 text-base hover:text-black hover:bg-gray-50 px-3 py-1 rounded transition-colors duration-200"
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
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </header>
  );
};

export default Header;