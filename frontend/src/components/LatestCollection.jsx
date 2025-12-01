import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Title from './Title';
import { assets } from "../assets/assets"; // Import your assets

const LatestCollection = () => {
  // Football jersey categories with your imported images
  const categories = [
    {
      id: 1,
      title: "Home Jersey",
      image: assets.home, // Replace with your actual asset name
      path: "/collection/home-jersey",
      color: "bg-blue-50",
      iconBg: "bg-blue-100"
    },
    {
      id: 2,
      title: "Fan Version",
      image: assets.fan, // Replace with your actual asset name
      path: "/collection/fan-version",
      color: "bg-cyan-50",
      iconBg: "bg-cyan-100"
    },
    {
      id: 3,
      title: "Player Version",
      image: assets.player, // Replace with your actual asset name
      path: "/collection/player-version",
      color: "bg-red-50",
      iconBg: "bg-red-100"
    },
    {
      id: 4,
      title: "Set With Shorts",
      image: assets.short ,
      path: "/collection/set-with-shorts",
      color: "bg-gray-50",
      iconBg: "bg-gray-100"
    },
    {
      id: 5,
      title: "Football T-shirts",
      image: assets.shirt,
      path: "/collection/football-t-shirts",
      color: "bg-slate-50",
      iconBg: "bg-slate-100",
      featured: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className='my-10'>
      {/* Title Section */}
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Explore our premium collection of football jerseys and discover the perfect gear for your passion.
        </p>
      </div>

      {/* Cards Section */}
      <div className="w-full py-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Cards Grid */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className={`relative group cursor-pointer ${category.featured ? 'lg:col-span-2' : ''}`}
              >
                <Link to={category.path}>
                  <div className={`
                    relative overflow-hidden rounded-2xl p-4 sm:p-6 transition-all duration-300 
                    hover:shadow-xl hover:-translate-y-1 ${category.color} 
                    border border-gray-100 hover:border-gray-200
                    ${category.featured ? 'h-full min-h-[200px]' : 'h-32 sm:h-40'}
                  `}>
                    {/* Jersey Icon/Image Container */}
                    <div className={`
  absolute top-2 left-2 w-16 h-16 sm:w-20 sm:h-20 rounded-xl 
  ${category.iconBg} flex items-center justify-center group-hover:scale-110 
  transition-transform duration-300
`}>
  <div className="relative w-full h-full overflow-hidden rounded-xl">
    <img 
      src={category.image} 
      alt={category.title}
      className="w-full h-full object-cover"
    />
  </div>
</div>

                    {/* Category Title */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className={`
                        text-gray-800 font-semibold leading-tight
                        ${category.featured ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'}
                      `}>
                        {category.title}
                      </h3>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    {/* Featured Badge */}
                    {category.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded-md">
                        FEATURED
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Link 
              to="/collection"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              View All Collections
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestCollection
