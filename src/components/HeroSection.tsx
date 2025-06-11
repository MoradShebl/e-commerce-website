import HeroSectionImage from '../assets/HeroSection.png';

const Icons = {
    Sparkle: ({ className = "", size = "104" }) => (
        <svg width={size} height={size} viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z" fill="black" />
        </svg>
    )
};

const HeroSection = () => {
    return (
        <section className=' soft-gray flex items-center overflow-hidden'>
            {/* Background decorative sparkles */}

            <div className="container mx-auto lg:px-10 px-5 min-h-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between h-full">
                    {/* Left Section */}
                    <div className="lg:w-1/2 mb-12 lg:mb-0">
                        <h1 className="integral demibold text-4xl lg:text-7xl lg:mb-6 mb-2 text-black whitespace-nowrap">
                            FIND CLOTHES<br />
                            THAT MATCHES<br />
                            YOUR STYLE
                        </h1>

                        <p className="text-gray-600 text-2xs mb-2 lg:mb-8 max-w-lg leading-relaxed">
                            Browse through our diverse range of meticulously crafted garments, designed
                            to bring out your individuality and cater to your sense of style.
                        </p>

                        <button className="button">
                            Shop Now
                        </button>

                        {/* Stats Section */}
                        <div className="w-full max-w-4xl mx-auto">
                            {/* Mobile/Tablet Grid: 2 top, 1 bottom */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-around gap-6 md:gap-8 lg:gap-12">
                                {/* Stat 1 */}
                                <div className="text-center">
                                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black block satoshi demibold">200+</span>
                                    <p className="text-gray-600 text-xs sm:text-sm mt-1">International Brands</p>
                                </div>

                                {/* Stat 2 */}
                                <div className="text-center">
                                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black block satoshi demibold">2,000+</span>
                                    <p className="text-gray-600 text-xs sm:text-sm mt-1">High-Quality Products</p>
                                </div>

                                {/* Stat 3 - Full width on mobile/tablet, normal on desktop */}
                                <div className="text-center col-span-2 md:col-span-1">
                                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black block satoshi demibold">30,000+</span>
                                    <p className="text-gray-600 text-xs sm:text-sm mt-1">Happy Customers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:w-1/2 h-full relative flex justify-center lg:justify-end">
                        {/* Decorative sparkle on the image */}
                        <Icons.Sparkle className="absolute top-20 -right-8 z-10 lg:top-50" size="100" />
                        <Icons.Sparkle className="absolute bottom-70 left-3 lg:bottom-60 lg:left-30 z-10" size="60" />

                        {/* Main Image Placeholder */}
                        <div className="relative">
                            <div className="w-96 lg:w-[500px] rounded-lg flex items-center justify-center lg:h-full h-full">
                                <img className='relative md:top-16' src={HeroSectionImage} alt="Hero Section Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;