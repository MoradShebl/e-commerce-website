import { Star } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

type ProductCardProps = {
  images: string[];
  name: string;
  stars: number;
  offer_price: number;
  price: number;
};

const ProductCard = ({ images, name, stars, offer_price, price }: ProductCardProps) => {
  const [discount, setDiscount] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (price > 0) {
      const calculated = ((price - offer_price) / price) * 100;
      setDiscount(Math.round(calculated));
    }
  }, [offer_price, price]);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        className={`${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));

  const transitionToImage = useCallback((imageIndex: number) => {
    if (imageIndex === currentIndex || isTransitioning || !images[imageIndex]) return;

    setIsTransitioning(true);

    // Animate current image out
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0,
      ease: "power2.out",
      onComplete: () => {
        setCurrentImage(images[imageIndex]);
        setCurrentIndex(imageIndex);

        // Animate new image in
        gsap.fromTo(imgRef.current,
          { opacity: 0},
          {
            opacity: 1,
            duration: 0,
            ease: "power2.out",
            onComplete: () => setIsTransitioning(false)
          }
        );
      },
    });

  }, [currentIndex, isTransitioning, images]);

  const handleImageHover = useCallback((imageIndex: number) => {
    transitionToImage(imageIndex);
  }, [transitionToImage]);

  const handleMouseLeave = useCallback(() => {
    if (currentIndex !== 0) {
      transitionToImage(0);
    }
  }, [currentIndex, transitionToImage]);


  const handleCardLeave = useCallback(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        duration: 0,
        ease: "power2.out"
      });
    }
    handleMouseLeave();
  }, [handleMouseLeave]);

  // Calculate hover zone positions with overlap prevention
  const getHoverZoneStyle = (index: number) => {
    const totalZones = images.length;
    const zoneWidth = 100 / totalZones;
    return {
      left: `${index * zoneWidth}%`,
      width: `${zoneWidth}%`
    };
  };

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-lg overflow-hidden"
      onMouseLeave={handleCardLeave}
    >
      <div className="bg-gray-100 aspect-square flex items-center justify-center overflow-hidden h-65 w-full relative group">
        <img
          ref={imgRef}
          src={currentImage}
          alt={name}
          className="object-cover h-full w-full will-change-transform"
        />

        {/* Invisible hover zones with smooth transitions */}
        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {images.map((_, index) => (
                <div
                  key={index}
                  className="absolute h-full cursor-pointer z-10 transition-colors duration-200"
                  style={getHoverZoneStyle(index)}
                  onMouseEnter={() => handleImageHover(index)}
                />
              ))}
            </div>

            {/* Image indicators */}
            <div className="absolute bottom-3 left-1/2 transform flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {images.map((_, index) => (
                <div
                  key={index}
                  ref={el => {
                    if (el) indicatorRefs.current[index] = el;
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                      ? 'bg-white shadow-lg'
                      : 'bg-white bg-opacity-60 hover:bg-opacity-80'
                    }`}
                  onClick={() => transitionToImage(index)}
                  style={{
                    transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
                    opacity: index === currentIndex ? 1 : 0.5
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-200">{name}</h3>
        {stars > 0 && (
          <div className="flex items-center mb-2 space-x-1">
            {renderStars(stars)}
            <span className="text-xs text-gray-500 ml-2">({stars})</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold text-lg text-gray-900 satoshi">${offer_price.toFixed(2)}</span>
            {offer_price < price && (
              <>
                <span className="ml-2 text-gray-500 line-through satoshi text-sm">${price.toFixed(2)}</span>
                <span className="ml-2 px-2 py-1 bg-gradient-to-r text-red-700 bg-red-100 rounded-full text-xs font-medium shadow-sm">
                  -{discount}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;