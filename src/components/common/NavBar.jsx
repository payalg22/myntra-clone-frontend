import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/sprite.css";

export default function NavBar() {
  const links = [
    {
      name: "Men",
      path: "/men",
    },
    {
      name: "Women",
      path: "/women",
    },
    {
      name: "Kids",
      path: "/kids",
    },
    { name: "Home", path: "/home" },
    {
      name: "Beauty",
      path: "/beauty",
    },
    { name: "Genz", path: "/genz" },
    {
      name: "Studio",
      path: "/studio",
    },
  ];

  return (
    <div className="shadow-md p-4 w-full flex items-center justify-around">
      <div className="mr-2 sprite-icon logo-header"></div>
      <div>
        {links.map((link) => (
          <span>
            <NavLink to={link.path} className="p-4 font-medium">
              {link.name.toUpperCase()}
            </NavLink>
          </span>
        ))}
      </div>
      <div class="relative w-1/3">
        <span class="absolute inset-y-0 left-0 flex items-center">
          <span class="sprite-icon search-icon px-1"></span>
        </span>
        <input
          type="text"
          placeholder="Search for products, brands and more"
          class="pl-10 pr-4 py-2 border rounded-b-sm bg-gray-100 border-none focus:outline-gray-200 focus:bg-white w-full"
        />
      </div>
      <div class="mx-4 float-right flex gap-4 items-center">
        <a>
          <span class="sprite-icon profile-icon"></span>
          <p class="my-0 font-bold text-xs">Profile</p>
        </a>
        <a>
          <span class="sprite-icon heart-icon"></span>
          <p class="my-0 font-bold text-xs">Wishlist</p>
        </a>
        <a>
          <span class="sprite-icon cart-icon"></span>
          <p class="my-0 font-bold text-xs">Bag</p>
        </a>
        
        
      </div>
    </div>
  );
}
