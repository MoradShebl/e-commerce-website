import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

type ProductCardProps = {
  image: string;
  name: string;
  stars: number;
  offer_price: number;
  price: number;
};

const ProductCard = ({ image, name, stars, offer_price, price }: ProductCardProps) => {
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    if (price > 0) {
      const calculated = ((price - offer_price) / price) * 100;
      setDiscount(Math.round(calculated));
    }
  }, [offer_price, price]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        className={`${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="bg-gray-100 aspect-square flex items-center justify-center overflow-hidden h-65 w-full">
        <img src={image} alt={name} className="object-cover h-full w-full" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex mr-2">{renderStars(stars)}</div>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-lg text-gray-900 satoshi">${offer_price.toFixed(2)}</span>
          {offer_price < price &&
            <span className="ml-2 text-gray-500 line-through satoshi">${price.toFixed(2)}</span>
          }
          {offer_price < price && (
            <span className="ml-2 p-1 bg-red-100 rounded-xl text-red-500 text-sm font-medium">-{discount}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
