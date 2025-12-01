import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, Menu, ChevronDown, X } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdown, setDropdown] = useState({
    categories: false,
    footballJersey: false,
    accessories: false,
  });

  const categoriesRef = useRef(null);
  const footballJerseyRef = useRef(null);
  const accessoriesRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const toggleDropdown = (key) => {
    setDropdown((prev) => ({
      categories: false,
      footballJersey: false,
      accessories: false,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target) &&
        footballJerseyRef.current &&
        !footballJerseyRef.current.contains(event.target) &&
        accessoriesRef.current &&
        !accessoriesRef.current.contains(event.target)
      ) {
        setDropdown({
          categories: false,
          footballJersey: false,
          accessories: false,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full fixed top-0 left-0 z-50 font-[Montserrat] shadow-md">
        {/* Top Bar */}
        <div className="bg-[#1a2947] text-[#c89b3c] text-sm text-center py-1 tracking-wide w-full">
          ⚜️ Free Shipping On Prepaid Orders • Trusted By 1 Lac+ Customers ⚜️
        </div>

        {/* Main Row */}
        <div className="flex items-center justify-between bg-[#f5f1e8] px-6 py-3 border-b border-[#c89b3c]/40 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={assets.leagcy} alt="Legacy XI Store" className="h-12 w-auto" />
            <h1 className="text-xl font-semibold text-[#1a2947] tracking-wide">
              LEGACY XI STORE
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex w-1/3 border border-[#1a2947]/40 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-grow px-4 py-2 text-sm bg-transparent outline-none text-[#1a2947]"
            />
            <button
              onClick={() => {
                setShowSearch(true);
                navigate("/collection");
              }}
              className="bg-[#1a2947] text-[#f5f1e8] px-5 py-2 font-medium hover:bg-[#c89b3c] hover:text-[#1a2947] transition"
            >
              SEARCH
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6 text-sm text-[#1a2947]">
            {token ? (
              <div className="group relative cursor-pointer">
                <User size={20} />
                <div className="group-hover:block hidden absolute right-0 top-7 bg-[#f5f1e8] text-[#1a2947] rounded shadow-md w-36 py-2">
                  <p className="px-4 py-2 hover:bg-[#c89b3c]/40 cursor-pointer">
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="px-4 py-2 hover:bg-[#c89b3c]/40 cursor-pointer"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="px-4 py-2 hover:bg-[#c89b3c]/40 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            ) : (
              <div
                onClick={() => navigate("/login")}
                className="flex items-center gap-1 cursor-pointer hover:text-[#c89b3c] transition"
              >
                <User size={18} />
                <span>Login</span>
              </div>
            )}

            <Link to="/cart" className="relative">
              <ShoppingCart
                size={20}
                className="cursor-pointer hover:text-[#c89b3c]"
              />
              <p className="absolute -right-2 -bottom-2 w-4 h-4 flex items-center justify-center text-[10px] bg-[#1a2947] text-[#f5f1e8] rounded-full">
                {getCartCount()}
              </p>
            </Link>

            <Menu
              onClick={() => setVisible(true)}
              size={20}
              className="cursor-pointer text-[#1a2947] sm:hidden"
            />
          </div>
        </div>

        {/* Bottom Nav */}
        <nav className="hidden sm:flex items-center justify-center gap-10 py-3 bg-[#1a2947] text-[#f5f1e8] font-medium relative w-full border-t border-[#c89b3c]/40">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[#c89b3c] transition ${
                isActive ? "text-[#c89b3c]" : "text-[#f5f1e8]"
              }`
            }
          >
            Home
          </NavLink>

          {/* Dropdowns */}
          <div className="relative" ref={categoriesRef}>
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-[#c89b3c] transition"
              onClick={() => toggleDropdown("categories")}
            >
              <span>Shop Categories</span>
              <ChevronDown
                size={14}
                className={`text-[#c89b3c] transition-transform duration-200 ${
                  dropdown.categories ? "rotate-180" : ""
                }`}
              />
            </div>
            {dropdown.categories && (
              <div className="absolute top-9 left-0 bg-[#f5f1e8] text-[#1a2947] shadow-lg rounded-md w-52 py-2 border border-[#c89b3c]/20">
                {[
                  "New 23-24 Season",
                  "Set With Shorts",
                  "World Cup Kits",
                  "Player Version",
                  "Club Jersey",
                  "Star Edition",
                ].map((item) => (
                  <Link
                    key={item}
                    to={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block px-4 py-2 text-sm hover:bg-[#c89b3c] hover:text-[#1a2947] transition"
                    onClick={() =>
                      setDropdown((prev) => ({ ...prev, categories: false }))
                    }
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Football Jersey */}
          <div className="relative" ref={footballJerseyRef}>
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-[#c89b3c] transition"
              onClick={() => toggleDropdown("footballJersey")}
            >
              <span>Football Jersey</span>
              <ChevronDown
                size={14}
                className={`text-[#c89b3c] transition-transform duration-200 ${
                  dropdown.footballJersey ? "rotate-180" : ""
                }`}
              />
            </div>
            {dropdown.footballJersey && (
              <div className="absolute top-9 left-0 bg-[#f5f1e8] text-[#1a2947] shadow-lg rounded-md w-52 py-2 border border-[#c89b3c]/20">
                {[
                  "Star Edition",
                  "Player Version",
                  "Fan Version",
                  "Set With Shorts",
                ].map((item) => (
                  <Link
                    key={item}
                    to={`/football-jersey/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block px-4 py-2 text-sm hover:bg-[#c89b3c] hover:text-[#1a2947] transition"
                    onClick={() =>
                      setDropdown((prev) => ({
                        ...prev,
                        footballJersey: false,
                      }))
                    }
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Accessories */}
          <div className="relative" ref={accessoriesRef}>
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-[#c89b3c] transition"
              onClick={() => toggleDropdown("accessories")}
            >
              <span>Accessories</span>
              <ChevronDown
                size={14}
                className={`text-[#c89b3c] transition-transform duration-200 ${
                  dropdown.accessories ? "rotate-180" : ""
                }`}
              />
            </div>
            {dropdown.accessories && (
              <div className="absolute top-9 left-0 bg-[#f5f1e8] text-[#1a2947] shadow-lg rounded-md w-52 py-2 border border-[#c89b3c]/20">
                {["Football", "Football Trophies", "Studs"].map((item) => (
                  <Link
                    key={item}
                    to={`/accessories/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block px-4 py-2 text-sm hover:bg-[#c89b3c] hover:text-[#1a2947] transition"
                    onClick={() =>
                      setDropdown((prev) => ({ ...prev, accessories: false }))
                    }
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `hover:text-[#c89b3c] transition ${
                isActive ? "text-[#c89b3c]" : "text-[#f5f1e8]"
              }`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/track-order"
            className={({ isActive }) =>
              `hover:text-[#c89b3c] transition ${
                isActive ? "text-[#c89b3c]" : "text-[#f5f1e8]"
              }`
            }
          >
            Track Order
          </NavLink>
        </nav>
      </header>

      {/* 👇 Invisible Spacer (Fixes Carousel Touching Navbar) */}
      <div className="h-[6rem] sm:h-[7rem]"></div>

    </>
  );
};

export default Navbar;
