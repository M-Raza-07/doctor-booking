// import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const Navbar = () => {
  const links: { name: string; to: string }[] = [
    { name: "HOME", to: "/" },
    { name: "ALL DOCTORS", to: "/doctors" },
    { name: "ABOUT", to: "/about" },
    { name: "CONTACT", to: "/contact" },
  ];

  const navigateTo = useNavigate();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [token, setToken] = useState<boolean>(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 ">
      <img src={assets.logo} alt="logo" className="w-44 cursor-pointer" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        {links.map((link) => (
          <NavLink key={link.name} to={link.to}>
            <li className="py-1">{link.name}</li>
            <hr className="border-none outline-none h-0.5 bg-primary-color w-3/5 m-auto hidden" />
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={assets.profile_pic}
              alt="profile_pic"
              className="w-8 rounded-full"
            />
            <img
              src={assets.dropdown_icon}
              alt="dropdown_icon"
              className="w-2.5"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigateTo("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigateTo("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigateTo("/login")}
            className="bg-primary-color text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
