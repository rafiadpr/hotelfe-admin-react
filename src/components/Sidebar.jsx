import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaBed,
  FaThLarge,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="w-64 bg-white border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Admin</h1>
      </div>
      <ul>
        <a
          className="p-4 hover:bg-gray-200 flex items-center space-x-2"
          href="/HomeAdmin"
        >
          <FaHome className="text-gray-500" />
          <span>Home & Add Reservations</span>
        </a>
        <a
          className="p-4 hover:bg-gray-200 flex items-center space-x-2"
          href="/Reservations"
        >
          <FaCalendarAlt className="text-gray-500" />
          <span>Reservations</span>
        </a>
        <a
          className="p-4 hover:bg-gray-200 flex items-center space-x-2"
          href="/Rooms"
        >
          <FaBed className="text-gray-500" />
          <span>Room</span>
        </a>
        <a
          className="p-4 hover:bg-gray-200 flex items-center space-x-2"
          href="/RoomType"
        >
          <FaThLarge className="text-gray-500" />
          <span>Room Type</span>
        </a>
        <a
          className="p-4 hover:bg-gray-200 flex items-center space-x-2"
          href="/User"
        >
          <FaUser className="text-gray-500" />
          <span>User</span>
        </a>
        <a
          className="p-4 hover:bg-gray-200 flex items-center space-x-2"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-gray-500" />
          <span>Logout</span>
        </a>
      </ul>
    </nav>
  );
};

export default Sidebar;
