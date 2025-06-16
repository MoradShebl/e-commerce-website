import { useParams } from 'react-router-dom';
import items from '../../../items.json';
import ProductCard from '../ProductCard';
import { useState } from 'react';

const ShopPage = () => {
  const { dress_style } = useParams<{ dress_style?: string }>();
  const [selectedColor, setSelectedColor] = useState<string>('');

  const filteredItems = items.filter(
    (item) =>
      (!dress_style || item.dress_style === dress_style) &&
      (selectedColor === '' || item.colors.includes(selectedColor))
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-16 py-8">
      <aside className="w-full md:w-1/4">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-4 satoshi">Filters</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium satoshi">Color</label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {[...new Set(items.flatMap((item) => item.colors))].map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border ${
                    selectedColor === color ? 'ring-2 ring-black' : ''
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                ></button>
              ))}
              <button
                className={`w-auto px-3 text-sm h-6 rounded-full border ${
                  selectedColor === '' ? 'bg-black text-white' : ''
                }`}
                onClick={() => setSelectedColor('')}
              >
                All
              </button>
            </div>
          </div>
        </div>
      </aside>
      <main className="w-full md:w-3/4">
        <h1 className="text-2xl font-bold mb-4 satoshi">{dress_style}</h1>
        <div className="flex flex-row flex-wrap gap-4">
          {filteredItems.map((item: any, idx: number) => {
            const firstColor = Object.keys(item.images)[0];
            const image = item.images[firstColor]?.[0] || '';

            return (
              <ProductCard
                key={`${item.id}-${idx}`}
                images={item.images[selectedColor == "" ? firstColor : selectedColor] || [image]}
                name={item.name}
                stars={item.stars}
                offer_price={item.offer_price}
                price={item.price}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
