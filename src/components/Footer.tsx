import { useState } from 'react';

const Footer= () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full">
        {/* Newsletter Section */}
        <div className="bg-black rounded-3xl p-6 mb-8 flex flex-col lg:flex-row items-center justify-around">
          <h2 className="text-white lg:text-3xl w-full lg:max-w-1/2 text-lg mb-4 integral demibold">
            STAY UPTO DATE
            ABOUT OUR
            LATEST OFFERS
          </h2>
          
          <div className="lg:w-1/3 w-full">
            <div className="relative w-full mb-2">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 rounded-full border-0 bg-white text-gray-900 placeholder-gray-500 "
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full bg-white text-black py-3 px-4 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 "
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        {/* Brand and Description */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-black mb-3">SHOP.CO</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We have clothes that suits your style and which you're
            proud to wear.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-8">
          <a
            href="#"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988zM12.017 7.062c2.723 0 4.928 2.204 4.928 4.928c0 2.723-2.205 4.928-4.928 4.928c-2.723 0-4.928-2.205-4.928-4.928C7.089 9.266 9.294 7.062 12.017 7.062z"/>
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
            aria-label="Website"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            Shop.co © 2000-2025. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;