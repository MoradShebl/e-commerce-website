import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import items from "../../../items.json"
import { useParams } from 'react-router-dom';
import ShowCase from '../ShowCase';

const ProductPage: React.FC = () => {
    const { name: productName } = useParams<{ name: string }>();
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [product, setProduct] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'reviews'>('reviews');
    const [reviewStars, setReviewStars] = useState(5)
    const [displayPostReview, setDisplayPostReview] = useState(false)
    const [reviewsToShow, setReviewsToShow] = useState(4)

    useEffect(() => {
        const foundProduct = items.find(item =>
            item.name.toLowerCase().replace(/\s+/g, '-') === productName?.toLowerCase()
        );

        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedColor(foundProduct.colors[0]);
        }
    }, [productName]);

    if (!product) {
        return (
            <section className="min-h-screen mt-26 bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Product not found</p>
            </section>
        );
    }

    const currentImages = product.images[selectedColor] || [];
    const currentImage = currentImages[currentImageIndex] || '';

    const addToCart = (product: any) => {
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        existingCart.push(product);
        localStorage.setItem("cart", JSON.stringify(existingCart));
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setCurrentImageIndex(0);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const postReview = (e: any) => {
        e.preventDefault();
        const name = e.target[0].value;
        const subject = e.target[1].value;
        const rating = Number(reviewStars);
        const date = new Date().toDateString();

        const newReview = {
            id: product.reviews.length + 1,
            name,
            rating,
            date,
            review: subject
        };

        setProduct({
            ...product,
            reviews: [...product.reviews, newReview]
        });
        setDisplayPostReview(false)
        alert("Your review Sent successfully")
    };


    const getColorBackground = (color: string) => {
        const colorMap: { [key: string]: string } = {
            'blue': '#3B82F6',
            'red': '#EF4444',
            'black': '#000000',
            'white': '#FFFFFF',
            'green': '#10B981',
            'yellow': '#F59E0B',
            'purple': '#8B5CF6',
            'pink': '#EC4899',
            'gray': '#6B7280',
            'grey': '#6B7280'
        };
        return colorMap[color.toLowerCase()] || color.toLowerCase();
    };

    return (
        <section className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Breadcrumb */}
                <nav className="mb-6 sm:mb-8 text-sm text-gray-600">
                    <a href='/'>Home</a> <span className="mx-2">/</span>
                    <a href={`/shop/${product.dress_style}`}>{product.dress_style}</a> <span className="mx-2">/</span>
                    <a href='' className="text-gray-900">{product.name}</a>
                </nav>

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 lg:mb-16">
                    {/* Product Images */}
                    <div className=" flex gap-5 flex-col lg:flex-row-reverse">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gray-100 rounded-lg lg:rounded-2xl overflow-hidden">
                            <img
                                src={currentImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                                }}
                            />
                        </div>

                        {/* Thumbnail Images */}
                        {currentImages.length >= 1 && (
                            <div className="flex flex-row lg:flex-col gap-2 w-1/3 pb-2">
                                {currentImages.map((image: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={` min-w-full min-h-1/3 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/80x80?text=No+Image';
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4 lg:space-y-6 lg:pl-8">
                        <div>
                            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4 integral">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 mb-2 lg:mb-4">

                                {product.stars > 0 && (
                                    <>
                                        <div className="flex">
                                            {renderStars(product.stars)}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {product.stars}/5
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <span className="text-2xl lg:text-3xl font-bold text-gray-900 satoshi">
                                ${product.offer_price}
                            </span>
                            {product.price !== product.offer_price && (
                                <>
                                    <span className="text-lg lg:text-xl text-gray-500 line-through satoshi">
                                        ${product.price}
                                    </span>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium satoshi">
                                        -{Math.round(((product.price - product.offer_price) / product.price) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        <hr className="border-gray-200" />

                        {/* Colors */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">
                                Select Colors
                            </h3>
                            <div className="flex gap-2">
                                {product.colors.map((color: string) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorSelect(color)}
                                        className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full  transition-all ${selectedColor === color ? ' scale-110' : ' '
                                            }`}
                                        style={{
                                            backgroundColor: getColorBackground(color)
                                        }}
                                        title={color}
                                    >
                                        {color.toLowerCase() === 'white' && (
                                            <div className="w-full h-full rounded-full border "></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        {product.sizes.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-medium text-gray-900">
                                        Choose Size
                                    </h3>
                                    <a href='' className="text-sm text-gray-600 hover:text-black">
                                        Size Guide
                                    </a>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-2 lg:py-3 bg-gray-100 text-gray-600 rounded-full text-sm font-medium transition-all ${selectedSize === size
                                                ? ' bg-black! text-white'
                                                : ' text-gray-700 '
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <hr className="border-gray-200" />

                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-row w-full gap-5">
                            <div className="flex flex-nowrap items-center  w-1/2 sm:w-1/3 min-h-full">
                                <div className="w-full h-full items-center bg-gray-100 rounded-full flex justify-between lg:justify-evenly">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className=" p-2 lg:p-3 hover:bg-gray-100 transition-colors"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 py-2 lg:py-3 text-center min-w-[3rem] font-medium">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="p-2 lg:p-3 hover:bg-gray-100 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className='w-full'>
                                <button onClick={() => addToCart(product)} className="w-full bg-black text-white py-3 lg:py-4 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-12 lg:mb-16">
                    <div className="flex justify-around items-center gap-4 lg:gap-8 mb-6 lg:mb-8 border-b overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`pb-4 whitespace-nowrap font-medium transition-colors ${activeTab === 'reviews'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-600 hover:text-black'
                                }`}
                        >
                            All Reviews {`(${product.reviews.length})`}
                        </button>
                        {/* <button
                            onClick={() => setActiveTab('faq')}
                            className={`pb-4 whitespace-nowrap font-medium transition-colors ${activeTab === 'faq'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-600 hover:text-black'
                                }`}
                        >
                            FAQs
                        </button> */}
                    </div>

                    {activeTab === 'reviews' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                                <button className="text-sm text-gray-600 hover:text-black" onClick={() => setDisplayPostReview(!displayPostReview)}>
                                    Write a Review
                                </button>
                            </div>

                            <form onSubmit={(e) => postReview(e)} className={` ${displayPostReview ? 'block' : 'hidden'} flex flex-row w-full justify-around flex-wrap items-center`}>
                                <input required type="text" placeholder='Name' className='p-2 border-gray-200 border-1 rounded-full' />
                                <input required type="text" placeholder='subject' className='p-2 border-gray-200 border-1 rounded-full' />
                                <div className="flex gap-5">
                                    <span>stars</span>
                                    <input required type='range' max={5} defaultValue={5} placeholder='stars' onChange={(e: any) => setReviewStars(e.target.value)} />
                                    <span className=' flex flex-row '>{renderStars(reviewStars)}</span>
                                </div>
                                <button type="submit" className=' cursor-pointer border-1 p-1 px-2 rounded-full border-gray-200' >Post</button>
                            </form>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {product.reviews.length === 0 && <div>No Reviews yet</div>}
                                {product.reviews.slice(0, reviewsToShow).map((review: any) => (
                                    <div key={review.id} className="border border-gray-200 rounded-lg p-4 lg:p-6">
                                        <div className="flex items-center gap-1 mb-2">
                                            {renderStars(review.rating)}
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="font-medium">{review.name}</span>
                                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                            <span className="text-sm text-gray-600">Posted on {review.date}</span>
                                        </div>
                                        <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                                            "{review.review}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center">
                                {reviewsToShow < product.reviews.length && (
                                    <button
                                        onClick={() => setReviewsToShow(prev => prev + 4)}
                                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Load More Reviews
                                    </button>
                                )}
                            </div>

                        </div>
                    )}
                </div>
                {/* Show Case */}
                <ShowCase name="You might also like" filter_type={product.type} />
            </div>
        </section >
    );
};

export default ProductPage;