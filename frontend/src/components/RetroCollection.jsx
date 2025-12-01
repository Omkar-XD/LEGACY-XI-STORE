import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const RetroCollection = () => {
  const { addToCart, currency = "₹" } = useContext(ShopContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // ✅ Disable background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "auto";
  }, [selectedProduct]);

  // ✅ Sample Product Data (8 jerseys)
  const retroProducts = [
    {
      _id: "retro1",
      name: "Classic 90s Jersey",
      description:
        "Retro football jersey inspired by the 1990s era with breathable cotton fabric.",
      price: 499,
      image: assets.retro1,
      sizes: ["M", "L", "XL"],
    },
    {
      _id: "retro2",
      name: "Vintage Team Jersey",
      description:
        "Throwback edition with embroidered logo and bold vintage stripes.",
      price: 599,
      image: assets.retro2,
      sizes: ["S", "M", "L"],
    },
    {
      _id: "retro3",
      name: "Retro Club Edition",
      description:
        "A limited club edition jersey with authentic old-school vibes.",
      price: 699,
      image: assets.retro3,
      sizes: ["L", "XL"],
    },
    {
      _id: "retro4",
      name: "Classic Red Retro Kit",
      description:
        "A pure cotton red kit inspired by early 2000s football classics.",
      price: 549,
      image: assets.retro4,
      sizes: ["M", "L", "XL"],
    },
    {
      _id: "retro5",
      name: "Old Legends Jersey",
      description: "Celebrate the legends with this nostalgic jersey piece.",
      price: 620,
      image: assets.retro5,
      sizes: ["S", "M", "L"],
    },
    {
      _id: "retro6",
      name: "Retro White Kit",
      description:
        "A clean, old-school white design that never goes out of style.",
      price: 580,
      image: assets.retro6,
      sizes: ["M", "L"],
    },
    {
      _id: "retro7",
      name: "Vintage Navy Jersey",
      description:
        "A navy-blue jersey crafted with soft, durable retro fabric.",
      price: 550,
      image: assets.retro7,
      sizes: ["M", "L", "XL"],
    },
    {
      _id: "retro8",
      name: "Retro Champions Jersey",
      description:
        "A limited-edition jersey celebrating championship heritage.",
      price: 650,
      image: assets.retro8,
      sizes: ["S", "M", "L", "XL"],
    },
  ];

  // ✅ Add to Cart (with size check)
  const handleAddToCart = (product) => {
    if (!selectedSize) {
      toast.warn("Please select a size before adding to cart!");
      return;
    }
    addToCart(product._id, selectedSize);
    toast.success(`${product.name} added to cart 🛒`);
    setSelectedProduct(null);
    setSelectedSize(null);
  };

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-b from-[#fafafa] to-[#f3f3f3]">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Retro Collection
      </h2>

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {retroProducts.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedProduct(item)}
            className="bg-white cursor-pointer shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {item.description}
              </p>
              <span className="text-blue-600 font-bold mt-2 inline-block">
                {currency}
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal Section */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white w-11/12 sm:w-3/4 lg:w-1/2 rounded-2xl shadow-xl overflow-hidden relative animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>

            <div className="flex flex-col sm:flex-row">
              {/* Left - Image */}
              <div className="sm:w-1/2 w-full">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 sm:h-full object-cover"
                />
              </div>

              {/* Right - Info */}
              <div className="sm:w-1/2 w-full p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {selectedProduct.description}
                  </p>
                  <p className="text-blue-600 text-lg font-semibold mb-4">
                    {currency}
                    {selectedProduct.price}
                  </p>

                  {/* Size Selector */}
                  {selectedProduct.sizes && (
                    <div className="mb-4">
                      <p className="font-semibold mb-2">Select Size:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`border px-3 py-1 rounded-md transition ${
                              selectedSize === size
                                ? "bg-blue-600 text-white border-blue-600"
                                : "border-gray-300 hover:border-blue-400"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  disabled={!selectedSize}
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    selectedSize
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {selectedSize ? "Add to Cart" : "Select Size to Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Tailwind Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  );
};

export default RetroCollection;
