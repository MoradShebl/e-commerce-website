import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

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
  ChevronDown: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

const navItems = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(menuLinksRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    } else {
      gsap.to(menuLinksRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.in"
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="xl:fixed sticky top-0 w-full z-50 bg-white verysm:hidden">
      {/* Announcement Bar */}
      <div className="bg-black h-auto min-h-[32px] flex items-center justify-center text-white text-sm py-1 w-full">
        <p className="text-center px-2 sm:px-4 md:px-0 text-xs sm:text-sm">
          Order and get 20% off to your first order.
          <a className="underline text-xs sm:text-base cursor-pointer ml-1 inline-block">Order Now!</a>
        </p>
      </div>

      {/* Main Header */}
      <header className="w-full bg-white border-b border-[#E8ECEF] border-opacity-30">
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
                <a href="/"><span className="font-black integral">SHOP.CO</span></a>
              </div>
            </div>

            {/* Navigation Links - Hidden on Mobile & Tablet */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="#" className="text-gray-600 text-sm hover:text-black flex items-center gap-1">Shop<Icons.ChevronDown /></a>
              <a href="#" className="text-gray-600 text-sm hover:text-black flex items-center gap-1">On Sale</a>
              <a href="#new-arrivals" className="text-gray-600 text-sm hover:text-black flex items-center gap-1">New Arrivals</a>
              <a href="#brands" className="text-gray-600 text-sm hover:text-black flex items-center gap-1">Brands</a>
            </div>

            {/* Search Bar - Hidden on Mobile & Tablet */}
            <div className="hidden lg:flex flex-1 mx-6 max-w-xl relative">
              <input
                type="search"
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-12 bg-gray-100 rounded-full focus:outline-none"
              />
              <svg className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 lg:hidden">
                <Icons.Search />
              </button>
              <button className="p-2">
                <Icons.Cart />
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              id="mobile-menu"
              className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed top-[104px] left-0 w-auto h-screen bg-white transform transition-transform duration-300 ease-in-out lg:hidden z-40`}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    ref={el => { menuLinksRef.current[index] = el }}
                    href="#"
                    className="block text-gray-600 text-lg"
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