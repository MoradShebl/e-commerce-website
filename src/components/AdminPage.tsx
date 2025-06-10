import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Package, AlertCircle, Star, DollarSign, Palette } from "lucide-react";
import items from "../../items.json"

// Simulated JSON data (in a real app, this would be imported from a separate file)
const initialItemsData = items;

type Review = {
    name: string;
    comment: string;
    date: string;
    rating: number;
};

type FAQ = {
    question: string;
    answer: string;
};

type Item = {
    id: number;
    name: string;
    price: number;
    offer_price: number;
    stars: number;
    type: "T-shirt" | "Shorts" | "Shirts" | "Hoodie" | "Jeans";
    dress_style: "Casual" | "Formal" | "Party" | "Gym";
    colors: string[];
    quantity: number;
    sizes: string[];
    description: string;
    images: { [color: string]: string[] };
    reviews: Review[];
    faq: FAQ[];
    date: string;
};


const AdminDashboard: React.FC = () => {
    // Authentication states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");

    // Dashboard states
    const [items, setItems] = useState<Item[]>([]);
    const [activeTab, setActiveTab] = useState<"overview" | "add" | "manage">("overview");
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "out-of-stock">("all");

    // Form states for adding/editing items
    const [formData, setFormData] = useState<Partial<Item>>({
        name: "",
        price: 0,
        offer_price: 0,
        stars: 0,
        type: "T-shirt",
        dress_style: "Casual",
        colors: [],
        quantity: 0,
        sizes: [],
        description: "",
        images: {},
        reviews: [],
        faq: []
    });

    const [tempColor, setTempColor] = useState("");
    const [tempSize, setTempSize] = useState("");
    const [tempImageUrl, setTempImageUrl] = useState("");
    const [selectedColorForImage, setSelectedColorForImage] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            setItems(initialItemsData as unknown as Item[]);
        }
    }, [isLoggedIn]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "password123") {
            setIsLoggedIn(true);
            setError("");
        } else {
            setError("Access denied! Invalid credentials.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setPassword("");
        setActiveTab("overview");
        setEditingItem(null);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            price: 0,
            offer_price: 0,
            stars: 0,
            type: "T-shirt",
            dress_style: "Casual",
            colors: [],
            quantity: 0,
            sizes: [],
            description: "",
            images: {},
            reviews: [],
            faq: []
        });
        setTempColor("");
        setTempSize("");
        setTempImageUrl("");
        setSelectedColorForImage("");
    };

    const calculateOfferPercentage = (price: number, offerPrice: number) => {
        if (price === 0) return 0;
        return Math.round(((price - offerPrice) / price) * 100);
    };

    const getStockStatus = (quantity: number) => {
        if (quantity === 0) return "out-of-stock";
        if (quantity < 10) return "low-stock";
        return "in-stock";
    };

    const filteredItems = items.filter(item => {
        if (stockFilter === "in-stock") return item.quantity > 0;
        if (stockFilter === "out-of-stock") return item.quantity === 0;
        return true;
    });

    const addColor = () => {
        if (tempColor && !formData.colors?.includes(tempColor)) {
            setFormData({
                ...formData,
                colors: [...(formData.colors || []), tempColor],
                images: {
                    ...formData.images,
                    [tempColor]: []
                }
            });
            setTempColor("");
        }
    };

    const removeColor = (color: string) => {
        const newColors = formData.colors?.filter(c => c !== color) || [];
        const newImages = { ...formData.images };
        delete newImages[color];
        setFormData({
            ...formData,
            colors: newColors,
            images: newImages
        });
    };

    const addSize = () => {
        if (tempSize && !formData.sizes?.includes(tempSize)) {
            setFormData({
                ...formData,
                sizes: [...(formData.sizes || []), tempSize]
            });
            setTempSize("");
        }
    };

    const removeSize = (size: string) => {
        setFormData({
            ...formData,
            sizes: formData.sizes?.filter(s => s !== size) || []
        });
    };

    const addImageToColor = () => {
        if (tempImageUrl && selectedColorForImage) {
            const currentImages = formData.images?.[selectedColorForImage] || [];
            setFormData({
                ...formData,
                images: {
                    ...formData.images,
                    [selectedColorForImage]: [...currentImages, tempImageUrl]
                }
            });
            setTempImageUrl("");
        }
    };

    const removeImageFromColor = (color: string, imageIndex: number) => {
        const colorImages = formData.images?.[color] || [];
        const newImages = colorImages.filter((_, index) => index !== imageIndex);
        setFormData({
            ...formData,
            images: {
                ...formData.images,
                [color]: newImages
            }
        });
    };

    const handleSubmitItem = () => {
        if (!formData.name || !formData.price || formData.colors?.length === 0) {
            alert("Please fill in all required fields (name, price, colors)");
            return;
        }
        
        if (editingItem) {
            // Update existing item
            setItems(items.map(item =>
                item.id === editingItem.id
                ? { ...formData as Item, id: editingItem.id }
                : item
            ));
            setEditingItem(null);
        } else {
            // Add new item
            const newId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
            setItems([...items, { ...formData as Item, id: newId, date: new Date().toDateString()}]);
        }
        
        resetForm();
        setActiveTab("manage");
        console.log(items)
    };

    const handleEditItem = (item: Item) => {
        setFormData(item);
        setEditingItem(item);
        setActiveTab("add");
    };

    const handleDeleteItem = (id: number) => {
        if (confirm("Are you sure you want to delete this item?")) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const handleQuickQuantityUpdate = (id: number, quantity: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h2>
                        <p className="text-gray-600">Access your dashboard</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 xl:mt-26">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">E-commerce Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {[
                            { key: "overview", label: "Overview", icon: Package },
                            { key: "add", label: editingItem ? "Edit Item" : "Add Item", icon: Plus },
                            { key: "manage", label: "Manage Items", icon: Edit3 }
                        ].map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key as any)}
                                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${activeTab === key
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <Package className="h-8 w-8 text-blue-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Items</p>
                                        <p className="text-2xl font-bold text-gray-900">{items.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <AlertCircle className="h-8 w-8 text-green-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">In Stock</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {items.filter(item => item.quantity > 0).length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <AlertCircle className="h-8 w-8 text-red-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {items.filter(item => item.quantity === 0).length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center">
                                    <DollarSign className="h-8 w-8 text-yellow-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Value</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ${items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Items Overview */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Inventory Overview</h3>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Item
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Discount
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Stock
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {items.slice(0, 5).map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                                <div className="text-sm text-gray-500">{item.type} • {item.dress_style}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                                                        <div className="text-sm text-gray-500">${item.offer_price.toFixed(2)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            {calculateOfferPercentage(item.price, item.offer_price)}% OFF
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockStatus(item.quantity) === "in-stock"
                                                            ? "bg-green-100 text-green-800"
                                                            : getStockStatus(item.quantity) === "low-stock"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                            }`}>
                                                            {getStockStatus(item.quantity) === "in-stock" ? "In Stock" :
                                                                getStockStatus(item.quantity) === "low-stock" ? "Low Stock" : "Out of Stock"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add/Edit Item Tab */}
                {activeTab === "add" && (
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">
                                {editingItem ? "Edit Item" : "Add New Item"}
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <input
                                        type="text"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price after Offer</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.offer_price}
                                        onChange={(e) => setFormData({ ...formData, offer_price: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {formData.price && formData.offer_price && formData.price > 0 && (
                                        <p className="text-sm text-green-600 mt-1">
                                            {calculateOfferPercentage(formData.price, formData.offer_price)}% discount
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="T-shirt">T-shirt</option>
                                        <option value="Shorts">Shorts</option>
                                        <option value="Shirts">Shirts</option>
                                        <option value="Hoodie">Hoodie</option>
                                        <option value="Jeans">Jeans</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dress Style</label>
                                    <select
                                        value={formData.dress_style}
                                        onChange={(e) => setFormData({ ...formData, dress_style: e.target.value as any })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="Casual">Casual</option>
                                        <option value="Formal">Formal</option>
                                        <option value="Party">Party</option>
                                        <option value="Gym">Gym</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Colors Management */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Colors *</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {formData.colors?.map(color => (
                                        <span key={color} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                            <Palette size={14} className="mr-1" />
                                            {color}
                                            <button
                                                type="button"
                                                onClick={() => removeColor(color)}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tempColor}
                                        onChange={(e) => setTempColor(e.target.value)}
                                        placeholder="Enter color name"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={addColor}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Add Color
                                    </button>
                                </div>
                            </div>

                            {/* Sizes Management */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {formData.sizes?.map(size => (
                                        <span key={size} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                            {size}
                                            <button
                                                type="button"
                                                onClick={() => removeSize(size)}
                                                className="ml-2 text-green-600 hover:text-green-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tempSize}
                                        onChange={(e) => setTempSize(e.target.value)}
                                        placeholder="Enter size (e.g., S, M, L, XL, 32, 34)"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={addSize}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Add Size
                                    </button>
                                </div>
                            </div>

                            {/* Images Management */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Images by Color</label>
                                {formData.colors && formData.colors.length > 0 ? (
                                    <div className="space-y-4">
                                        {/* Add Image to Color */}
                                        <div className="flex gap-2">
                                            <select
                                                value={selectedColorForImage}
                                                onChange={(e) => setSelectedColorForImage(e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select color</option>
                                                {formData.colors.map(color => (
                                                    <option key={color} value={color}>{color}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="url"
                                                value={tempImageUrl}
                                                onChange={(e) => setTempImageUrl(e.target.value)}
                                                placeholder="Enter image URL"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                onClick={addImageToColor}
                                                disabled={!selectedColorForImage || !tempImageUrl}
                                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
                                            >
                                                Add Image
                                            </button>
                                        </div>

                                        {/* Display Images by Color */}
                                        {formData.colors.map(color => (
                                            <div key={color} className="border border-gray-200 rounded-lg p-4">
                                                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                                    <Palette size={16} className="mr-2" />
                                                    {color} Images ({formData.images?.[color]?.length || 0})
                                                </h4>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                    {formData.images?.[color]?.map((imageUrl, index) => (
                                                        <div key={index} className="relative group">
                                                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                                                <img
                                                                    src={imageUrl}
                                                                    alt={`${color} ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZTwvdGV4dD48L3N2Zz4=';
                                                                    }}
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImageFromColor(color, index)}
                                                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">Add colors first to manage images</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleSubmitItem}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    {editingItem ? "Update Item" : "Add Item"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (editingItem) {
                                            setEditingItem(null);
                                        }
                                        resetForm();
                                    }}
                                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                >
                                    {editingItem ? "Cancel Edit" : "Reset Form"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Manage Items Tab */}
                {activeTab === "manage" && (
                    <div className="space-y-6">
                        {/* Filters */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex flex-wrap gap-4 items-center">
                                <label className="text-sm font-medium text-gray-700">Filter by stock:</label>
                                <div className="flex gap-2">
                                    {[
                                        { value: "all", label: "All Items" },
                                        { value: "in-stock", label: "In Stock" },
                                        { value: "out-of-stock", label: "Out of Stock" }
                                    ].map(({ value, label }) => (
                                        <button
                                            key={value}
                                            onClick={() => setStockFilter(value as any)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${stockFilter === value
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Items Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    {/* Item Header */}
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-600">{item.type} • {item.dress_style}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditItem(item)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Item"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteItem(item.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item Content */}
                                    <div className="p-4 space-y-3">
                                        {/* Pricing */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-lg font-bold text-gray-900">${item.offer_price.toFixed(2)}</span>
                                                {item.price !== item.offer_price && (
                                                    <>
                                                        <span className="text-sm text-gray-500 line-through ml-2">${item.price.toFixed(2)}</span>
                                                        <span className="text-sm text-green-600 ml-2">
                                                            {calculateOfferPercentage(item.price, item.offer_price)}% OFF
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                <Star size={16} className="text-yellow-400 fill-current" />
                                                <span className="text-sm text-gray-600 ml-1">{item.stars}</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {item.description && (
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        )}

                                        {/* Colors and Sizes */}
                                        <div className="space-y-2">
                                            <div className="flex items-center flex-wrap gap-1">
                                                <span className="text-xs font-medium text-gray-700">Colors:</span>
                                                {item.colors.map(color => (
                                                    <span key={color} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                        {color}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center flex-wrap gap-1">
                                                <span className="text-xs font-medium text-gray-700">Sizes:</span>
                                                {item.sizes.map(size => (
                                                    <span key={size} className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                                        {size}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Stock Management */}
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium text-gray-700">Stock:</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuickQuantityUpdate(item.id, parseInt(e.target.value) || 0)}
                                                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStockStatus(item.quantity) === "in-stock"
                                                ? "bg-green-100 text-green-800"
                                                : getStockStatus(item.quantity) === "low-stock"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}>
                                                {getStockStatus(item.quantity) === "in-stock" ? "In Stock" :
                                                    getStockStatus(item.quantity) === "low-stock" ? "Low Stock" : "Out of Stock"}
                                            </span>
                                        </div>

                                        {/* Date */}
                                        <div className="text-xs text-gray-500">
                                            Added on: {item.date}
                                        </div>

                                        {/* Images Preview */}
                                        {Object.keys(item.images).length > 0 && (
                                            <div className="pt-2 border-t border-gray-100">
                                                <span className="text-xs font-medium text-gray-700 block mb-2">Images:</span><div className="grid grid-cols-4 gap-1">
                                                    {Object.entries(item.images).slice(0, 4).map(([color, images]) => {
                                                        const imageArray = Array.isArray(images) ? images : []; // <-- ✅ ensure it's an array

                                                        return imageArray.slice(0, 1).map((imageUrl, index) => (
                                                            <div key={`${color}-${index}`} className="aspect-square bg-gray-100 rounded overflow-hidden">
                                                                <img
                                                                    src={imageUrl}
                                                                    alt={`${color} preview`}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzk5OSI+SW1nPC90ZXh0Pjwvc3ZnPg==';
                                                                    }}
                                                                />
                                                            </div>
                                                        ));
                                                    })}
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredItems.length === 0 && (
                            <div className="text-center py-12">
                                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                                <p className="text-gray-600 mb-4">
                                    {stockFilter === "all"
                                        ? "You haven't added any items yet."
                                        : `No items match the ${stockFilter.replace("-", " ")} filter.`}
                                </p>
                                <button
                                    onClick={() => setActiveTab("add")}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus size={16} className="mr-2" />
                                    Add Your First Item
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;