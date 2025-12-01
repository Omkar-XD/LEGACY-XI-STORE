import React, { useState, useEffect } from "react";
// Restored original assets import path
import { assets } from "../assets/assets";

// FIX: The path "../assets/assets" cannot be resolved in this environment
// as I don't have access to your local files.
// I've created a placeholder 'assets' object so the component can render.
// Please RE-ENABLE your original import when you use this in your project.


import { motion } from "framer-motion";
// Restored original Link import
import { Link } from "react-router-dom";
// FIX: Using a standard <a> tag to prevent errors, as 'Link'
// requires a full React Router setup. Please change this back to 'Link'
// in your project

// 🖼️ Images + Text
const heroContent = [
  {
    img: assets.mancity,
    title: "Unleash Your Passion for City Blue",
  },
  {
    img: assets.liverpool,
    title: "Feel the Power of the Reds",
  },
  {
    img: assets.acmilan,
    title: "Milan Legacy — Elegance Born from Fire",
  },
  {
    img: assets.barcelona,
    title: "Get Ready for the 25/26 Season",
  },
  {
    img: assets.realmadrid,
    title: "Wear the Royal Whites with Pride",
  },
  {
    img: assets.paris,
    title: "Style, Spirit & Football Energy",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroContent.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + heroContent.length) % heroContent.length);

  return (
    // UPDATED:
    // 1. Changed w-full to `w-screen left-1/2 -ml-[50vw]` to force full-bleed width
    //    and break out of any parent container's padding.
    // 2. Kept `mt-16` to provide space for a 64px (h-16) navbar.
    <div className="relative w-screen left-1/2 -ml-[50vw] mt-16 overflow-hidden">
      {/* Carousel Image - Full Coverage */}
      {/* UPDATED:
          1. Changed height to `h-[90vh]` to make it taller.
      */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative w-full h-[90vh]" // Changed height
      >
        {/* Full Cover Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${heroContent[currentIndex].img})`,
            backgroundSize: 'cover', // UPDATED: Reverted to 'cover'
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
            // Removed black background
          }}
          // Add onerror for placeholder fallback
          onError={(e) => { e.target.style.backgroundImage = 'url(https://placehold.co/1920x1080/cccccc/666666?text=Image+Not+Found)' }}
        />
       
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        key={heroContent[currentIndex].title}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-6 sm:left-12 lg:left-20 transform -translate-y-1/2 text-left text-white z-20 max-w-[90%] sm:max-w-[600px]"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {heroContent[currentIndex].title}
        </h1>
        {/* Restored <Link> component (now a placeholder <a>) */}
        <Link
          to="/collection" // Changed back to <Link>
          className="inline-block bg-yellow-400 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition-all duration-300 text-sm sm:text-base"
        >
          SHOP NOW
        </Link>
      </motion.div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/20 transition duration-300 z-30 border border-white/20"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/20 transition duration-300 z-30 border border-white/20"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-yellow-400 scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Assuming this is part of a larger app, we'll export default
export default Hero;

