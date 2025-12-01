import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { assets } from "../assets/assets"; // Your existing import

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    // Sample brand data using your imported assets
    const brandData = [
        { 
            _id: '1', 
            name: 'NIVIA', 
            image: [assets.nivia], // Replace with your actual asset name 
            bestseller: true 
        },
        { 
            _id: '2', 
            name: 'PUMA', 
            image: [assets.puma], // Replace with your actual asset name 
            bestseller: true 
        },
        { 
            _id: '3', 
            name: 'ADIDAS', 
            image: [assets.adidas], // Replace with your actual asset name 
            bestseller: true 
        },
        { 
            _id: '4', 
            name: 'NIKE', 
            image: [assets.nike], // Replace with your actual asset name 
            bestseller: true 
        }
    ];

    useEffect(() => {
        // Use actual products if available, otherwise use sample brand data
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => (item.bestseller));
            setBestSeller(bestProduct.slice(0, 5));
        } else {
            setBestSeller(brandData);
        }
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-8'>
                <div className='text-3xl'>
                    <Title text1={'BEST'} text2={'SELLERS'} />
                </div>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4'>
                    Some of our latest Trending Jersey available.
                </p>
            </div>

            {/* Grid with proper centering for logos */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6 px-4'>
                {
                    bestSeller.map((item, index) => (
                        <div key={index} className='group cursor-pointer'>
                            <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 flex flex-col items-center justify-center min-h-[200px]'>
                                {/* Logo container - properly centered */}
                                <div className='w-full h-24 mb-4 flex items-center justify-center overflow-hidden'>
                                    <img 
                                        src={item.image[0]} 
                                        alt={item.name}
                                        className='max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>
                                
                                {/* Brand name */}
                                <div className='text-center mb-2'>
                                    <h3 className='text-lg font-semibold text-gray-800 uppercase tracking-wide'>
                                        {item.name}
                                    </h3>
                                </div>
                                
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Alternative: Using your existing ProductItem component */}
            {/* 
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <div key={index} className='flex justify-center'>
                            <ProductItem 
                                id={item._id} 
                                name={item.name} 
                                image={item.image} 
                                price={item.price} 
                            />
                        </div>
                    ))
                }
            </div>
            */}
        </div>
    )
}

export default BestSeller
