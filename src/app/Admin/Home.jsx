import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Sidebar from "../../components/Sidebar";

const AdminPage = () => {
  const initialFormData = {
    nomor_pemesanan: "",
    nama_pemesan: "",
    email_pemesan: "",
    tgl_pemesanan: "tgl_pemesanan",
    tgl_check_in: "tglCheckIn",
    tgl_check_out: "tglCheckOut",
    nama_tamu: "",
    jumlah_kamar: "",
    id_tipe_kamar: "",
    id_user: "1",
    status_pemesanan: "",
    detail_pemesanan: [
      {
        id_kamar: "1",
        harga: "1200000",
        tgl_akses: "",
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/pemesanan", formData)
      .then((response) => {
        const message = response.data.message;

        if (message === "New pemesanan has been inserted with details.") {
          toast.success("Pemesanan Sukses");
        } else {
          // Check if the error message indicates no available rooms
          if (response.data.error === "No available rooms found") {
            alert("Tidak ada kamar yang tersedia.");
          } else {
            toast.error("Pemesanan Gagal");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Terjadi kesalahan saat mengirim data.");
      });

    // Reset the form
    setFormData(initialFormData);
  };

  const inputFields = [
    { name: "nama_pemesan", label: "Nama Pemesan", type: "text" },
    { name: "email_pemesan", label: "Email Pemesan", type: "email" },
    { name: "tgl_check_in", label: "Tanggal Check-in", type: "date" },
    { name: "tgl_check_out", label: "Tanggal Check-out", type: "date" },
    { name: "nama_tamu", label: "Nama Tamu", type: "text" },
    { name: "jumlah_kamar", label: "Jumlah Kamar", type: "number" },
    { name: "id_tipe_kamar", label: "Tipe Kamar", type: "number" },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-4">
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Reservation Form</h2>
            <form onSubmit={handleSubmit}>
              {inputFields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  />
                </div>
              ))}
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
