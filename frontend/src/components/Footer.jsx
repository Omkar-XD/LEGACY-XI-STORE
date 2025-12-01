import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.leagcy} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            From the roar of the stadium to the passion in your heart, Legacy XI Store brings you closer to the game you love. We are a hub for fans, providing authentic, high-quality jerseys from the world's biggest clubs and national teams. Wear your colors with pride.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+918591258069</li>
                <li>leagcystoreXI@gmail.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ Leagcy XI Store - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
