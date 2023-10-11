import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './app/Login/Login';
import HomeAdmin from './app/Admin/Home';
import HomeResepsionis from './app/Resepsionis/Home';
import Sidebar from "./components/Sidebar";
import Reservations from "./app/Menu/Reservations";
import Rooms from "./app/Menu/Rooms";
import RoomType from "./app/Menu/RoomType";
import User from "./app/Menu/User";
import NotFound from "./app/NotFound";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={< test/>} />
          <Route path="/HomeAdmin" element={<HomeAdmin />} />
          <Route path="/HomeResepsionis" element={<HomeResepsionis />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/Reservations" element={<Reservations />} />
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/RoomType" element={<RoomType />} />
          <Route path="/User" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Only display Login on the homepage */}
        <Routes>
        <Route path="/" element={<>
          <Login />
        </>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;