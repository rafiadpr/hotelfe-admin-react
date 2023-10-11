import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaBed,
  FaThLarge,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import Cookies from "js-cookie";

const listNav = [
  {
    role: "Admin",
    list: [
      {
        value: "Home & Add Reservations",
        href: "/HomeAdmin",
        icon: <FaHome className="text-gray-500" />,
      },
      {
        value: "Reservations",
        href: "/Reservations",
        icon: <FaCalendarAlt className="text-gray-500" />,
      },
      {
        value: "Room",
        href: "/Rooms",
        icon: <FaBed className="text-gray-500" />,
      },
      {
        value: "Room Type",
        href: "/RoomType",
        icon: <FaThLarge className="text-gray-500" />,
      },
      {
        value: "User",
        href: "/User",
        icon: <FaUser className="text-gray-500" />,
      },
    ],
  },
  {
    role: "Resepsionis",
    list: [
      {
        value: "Home & Add Reservations",
        href: "/HomeResepsionis",
        icon: <FaHome className="text-gray-500" />,
      },
      {
        value: "Reservations",
        href: "/Reservations",
        icon: <FaCalendarAlt className="text-gray-500" />,
      },
    ],
  },
];

const Sidebar = () => {
  const role = Cookies.get("role");
  const filteredNav = listNav.filter((item) => item.role === role);

  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("role");
    navigate("/");
  };
  return (
    <nav className="w-64 bg-white border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Admin</h1>
      </div>
      <div>
        {filteredNav[0].list.map((item) => (
          <Link
            className="p-4 hover:bg-gray-200 flex items-center space-x-2"
            to={item.href}
          >
            {item.icon}
            <span>{item.value}</span>
          </Link>
        ))}
        <Link
          to="/"
          className="p-4 hover:bg-gray-200 flex items-center space-x-2"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-gray-500" />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
