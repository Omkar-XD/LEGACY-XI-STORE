import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, cancelPendingAdd } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const temp = [];
      for (const pid in cartItems) {
        for (const size in cartItems[pid]) {
          const q = cartItems[pid][size];
          if (q > 0) temp.push({ _id: pid, size, quantity: q });
        }
      }
      setCartData(temp);
    }
  }, [cartItems, products]);

  const items = useMemo(() => {
    return cartData.map(line => {
      const prod = products.find(p => p._id === line._id);
      const price = prod?.price ?? 0;
      return {
        ...line,
        name: prod?.name ?? 'Unknown',
        image: prod?.image?.[0],
        price,
        subtotal: price * line.quantity,
      };
    });
  }, [cartData, products]);

  const total = useMemo(() => items.reduce((s, it) => s + it.subtotal, 0), [items]);

  const proceed = () => {
    navigate('/place-order', { state: { total } });
  };

  const cancelAdd = () => {
    if (typeof cancelPendingAdd === 'function') cancelPendingAdd();
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1='YOUR' text2='CART' />
      </div>

      <div className='flex justify-between items-center mb-6'>
        <p className='text-gray-600'>Review your jerseys, sizes, and quantities.</p>
        <button onClick={cancelAdd} className='border border-gray-300 text-gray-700 text-sm px-4 py-2 hover:bg-gray-50'>
          Cancel
        </button>
      </div>

      <div>
        {items.map(item => (
          <div
            key={`${item._id}-${item.size}`}
            className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.6fr_0.6fr] sm:grid-cols-[4fr_2fr_0.6fr] items-center gap-4'
          >
            <div className='flex items-start gap-6'>
              <img className='w-16 sm:w-20' src={item.image} alt={item.name} />
              <div>
                <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                <div className='flex items-center gap-5 mt-2'>
                  <p>{currency}{item.price}</p>
                  <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                </div>
                <p className='mt-1 text-sm'>Subtotal: {currency}{item.subtotal.toFixed(2)}</p>
              </div>
            </div>

            <input
              className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
              type='number'
              min={1}
              value={item.quantity}
              onChange={(e) => {
                const n = Number(e.target.value);
                updateQuantity(item._id, item.size, !Number.isFinite(n) || n < 1 ? 1 : n);
              }}
              aria-label='Quantity'
            />

            <button
              onClick={() => updateQuantity(item._id, item.size, 0)}
              className='justify-self-end text-red-600 text-sm hover:underline'
              aria-label='Remove item'
              title='Remove item'
            >
              Cancel
            </button>
          </div>
        ))}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={proceed} className='bg-black text-white text-sm my-8 px-8 py-3'>
              PROCEED TO CHECKOUT
            </button>
            <div className='text-right text-gray-700'>Total now: {currency}{total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
