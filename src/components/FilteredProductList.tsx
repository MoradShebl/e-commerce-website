import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import items from '../../items.json';

type Product = {
  id: number;
  name: string;
  price: number;
  offer_price: number;
  stars: number;
  type?: string;
  dress_style?: string;
  colors?: string[];
  quantity: number;
  sizes?: string[];
  description?: string;
  images: {
    [color: string]: string[] | undefined;
    Red?: string[];
    Blue?: string[];
    Black?: string[];
    red?: string[];
  };
  reviews?: Review[];
  faq?: FAQItem[];
  date: string;
};

type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type FilteredProductListProps = {
  filter_type: string;
};

const FilteredProductList = ({ filter_type }: FilteredProductListProps) => {
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    let result = [...items];

    if (filter_type === 'newest') {
      result = result
        .filter(item => item.quantity > 0)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    if (filter_type === 'top_selling') {
      result = result
        .filter(item => item.quantity < 10 && item.quantity > 0)
        .sort((a, b) => a.quantity - b.quantity);
    }

    setFiltered(result.slice(0, 4));
  }, [filter_type]);

  return (
    <>
      {filtered.map((item, idx) => {
        const firstColor = Object.keys(item.images)[0];
        const image = item.images[firstColor]?.[0] || '';

        return (
          <ProductCard
            key={`${item.id}-${idx}`}
            images={item.images[firstColor] || [image]}
            name={item.name}
            stars={item.stars}
            offer_price={item.offer_price}
            price={item.price}
          />
        );
      })}
    </>
  );
};

export default FilteredProductList;
