import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ReactDatePicker from "react-datepicker";
import Sidebar from "../../components/Sidebar";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const history = useNavigate();
  const [formData, setFormData] = useState({
    nomor_pemesanan: "",
    nama_pemesan: "",
    email_pemesan: "",
    tgl_pemesanan: null,
    tgl_check_in: null,
    tgl_check_out: null,
    nama_tamu: "",
    jumlah_kamar: "",
    id_tipe_kamar: "",
    id_user: "1",
    status_pemesanan: "",
    detail_pemesanan: [],
  });

  useEffect(() => {
    const role = Cookies.get("role");
    const token = Cookies.get("jwtToken");
    if (role === "Resepsionis") {
      history("/HomeResepsionis");
    }

    if (!token) {
      history("/");
    }

    const fetchRoomTypes = async () => {
      try {
        const response = await fetch("http://localhost:8000/tipekamar");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRoomTypes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckInChange = (date) => {
    setFormData({ ...formData, tgl_check_in: date });
  };

  const handleCheckOutChange = (date) => {
    setFormData({ ...formData, tgl_check_out: date });
  };

  const handleTipeKamar = (e) => {
    const jumlah = parseInt(e.target.value);

    // Buat array kamar
    const newKamar = [];
    for (let i = 1; i <= jumlah; i++) {
      newKamar.push({
        id_kamar: i,
        tgl_akses: "",
        harga: null,
      });
    }

    // Set state kamar and also update formData
    setFormData({
      ...formData,
      jumlah_kamar: jumlah, // Set jumlah_kamar here
      detail_pemesanan: newKamar,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/pemesanan", formData)
      .then((response) => {
        const message = response.data.message;

        if (message === "New pemesanan has been inserted with details.") {
          alert("Pemesanan Sukses");
        } else {
          // Check if the error message indicates no available rooms
          if (response.data.error === "No available rooms found") {
            alert("Tidak ada kamar yang tersedia.");
          } else {
            alert("Pemesanan Gagal");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengirim data.");
      });

    // Reset the form
    setFormData({
      nomor_pemesanan: "",
      nama_pemesan: "",
      email_pemesan: "",
      tgl_pemesanan: null,
      tgl_check_in: null,
      tgl_check_out: null,
      nama_tamu: "",
      jumlah_kamar: "",
      id_tipe_kamar: "",
      id_user: "1",
      status_pemesanan: "",
      detail_pemesanan: [],
    });
  };

  console.log(formData);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-4">
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Reservation Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="nama_pemesan"
                  className="block font-medium text-gray-700"
                >
                  Nama Pemesan
                </label>
                <input
                  type="text"
                  id="nama_pemesan"
                  name="nama_pemesan"
                  value={formData.nama_pemesan}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email_pemesan"
                  className="block font-medium text-gray-700"
                >
                  Email Pemesan
                </label>
                <input
                  type="email"
                  id="email_pemesan"
                  name="email_pemesan"
                  value={formData.email_pemesan}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tgl_check_in"
                  className="block font-medium text-gray-700"
                >
                  Tanggal Check-in
                </label>
                <ReactDatePicker
                  selected={formData.tgl_check_in}
                  minDate={new Date()} // Set the minimum date to today
                  onChange={handleCheckInChange}
                  dateFormat="dd/MM/yyyy"
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tgl_check_out"
                  className="block font-medium text-gray-700"
                >
                  Tanggal Check-out
                </label>
                <ReactDatePicker
                  selected={formData.tgl_check_out}
                  minDate={new Date()}
                  onChange={handleCheckOutChange}
                  dateFormat="dd/MM/yyyy"
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="nama_tamu"
                  className="block font-medium text-gray-700"
                >
                  Nama Tamu
                </label>
                <input
                  type="text"
                  id="nama_tamu"
                  name="nama_tamu"
                  value={formData.nama_tamu}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="jumlah_kamar"
                  className="block font-medium text-gray-700"
                >
                  Jumlah Kamar
                </label>
                <input
                  type="number"
                  id="jumlah_kamar"
                  name="jumlah_kamar"
                  value={formData.jumlah_kamar}
                  onChange={handleTipeKamar}
                  min="1"
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="id_tipe_kamar"
                  className="block font-medium text-gray-700"
                >
                  Tipe Kamar
                </label>
                <select
                  id="id_tipe_kamar"
                  name="id_tipe_kamar"
                  className="border p-2 text-gray-600"
                  value={formData.id_tipe_kamar}
                  onChange={handleChange}
                >
                  <option value="">Select Room Type</option>
                  {roomTypes?.map((roomType) => (
                    <option key={roomType.id} value={roomType.id}>
                      {roomType.nama_tipe_kamar}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
