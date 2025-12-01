import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const FeatureCollection = () => {
  const featuredItems = [
    {
      id: 1,
      name: 'portugal',
      image: assets.portugal,
      title: 'PORTUGAL NATIONAL TEAM',
      subtitle: '2025-26',
      orientation: 'vertical',
      path: '/collection'
    },
    {
      id: 2,
      name: 'mbappe',
      image: assets.mbappe,
      title: 'MBAPPÉ SPECIAL EDITION',
      subtitle: '2025',
      orientation: 'vertical',
      path: '/collection'
    },
    {
      id: 3,
      name: 'ft',
      image: assets.feature1,
      title: 'MAN CITY POWER',
      subtitle: '2025-26',
      orientation: 'vertical',
      path: '/collection'
    },
    {
      id: 4,
      name: 'lamine',
      image: assets.lamine,
      title: 'LAMINE YAMAL RISING STAR',
      subtitle: '2025',
      orientation: 'vertical',
      path: '/collection'
    }
  ];

  // Animation variants for cards
  const cardVariants = {
    initial: { 
      scale: 1,
      filter: 'brightness(0.9)'
    },
    hover: { 
      scale: 1.02,
      filter: 'brightness(1.1)',
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Image zoom animation variants
  const imageVariants = {
    initial: { 
      scale: 1.1 // Already zoomed in by default
    },
    hover: { 
      scale: 1.15, // Zoom in more on hover
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Text animation variants
  const textVariants = {
    initial: { 
      opacity: 0.9,
      y: 0
    },
    hover: { 
      opacity: 1,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: '0 4px 15px rgba(147, 51, 234, 0.3)'
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 6px 25px rgba(147, 51, 234, 0.5)',
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FEATURED COLLECTION
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of iconic jerseys and exclusive editions
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                item.orientation === 'horizontal' 
                  ? 'aspect-[16/9] md:aspect-[21/9]' 
                  : 'aspect-[4/5] md:aspect-[3/4]'
              }`}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              // Staggered animation for initial load
              animate={{ 
                opacity: 1, 
                y: 0 
              }}
              style={{ 
                opacity: 0, 
                y: 50 
              }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.6 
              }}
            >
              {/* Background Image - Zoomed In */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover" // Changed to object-cover for zoomed effect
                  variants={imageVariants}
                  initial="initial"
                  whileHover="hover"
                />
                {/* Dark Overlay for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
              </div>

              {/* Content Overlay */}
              <motion.div 
                className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white z-10"
                variants={textVariants}
                initial="initial"
                whileHover="hover"
              >
                {/* Title */}
                <motion.h3 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {item.title}
                </motion.h3>
                
                {/* Subtitle */}
                <motion.p 
                  className="text-lg md:text-xl font-medium mb-6 opacity-90"
                >
                  {item.subtitle}
                </motion.p>

                {/* Shop Now Button */}
                <Link to={item.path}>
                  <motion.button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 w-fit transition-all duration-300"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    SHOP NOW
                    <svg 
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Glowing Border Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/50 group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCollection;
