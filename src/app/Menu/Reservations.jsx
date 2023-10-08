import React, { useState, useEffect, useRef } from "react";
import { ReactDOM } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import ReservationModal from "../../components/Modal/ReservationModal";
import Receipt from "../../components/Receipt";
import ReactToPdf from "react-to-pdf";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nomor_pemesanan: "",
    nama_pemesan: "",
    email_pemesan: "",
    tgl_pemesanan: new Date().toISOString(),
    tgl_check_in: "",
    tgl_check_out: "",
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
  });

  const [pdfData, setPdfData] = useState("");
  const pdfRef = useRef(null); // Initialize pdfRef with null

  useEffect(() => {
    // Fetch reservations from your API
    axios.get("http://localhost:8000/pemesanan").then((response) => {
      setReservations(response.data);
    });
  }, []);

  const handleCreateClick = () => {
    setFormData({
      ...formData,
      nomor_pemesanan: "",
      nama_pemesan: "",
      email_pemesan: "",
      tgl_pemesanan: new Date().toISOString(),
      tgl_check_in: "",
      tgl_check_out: "",
      nama_tamu: "",
      jumlah_kamar: "",
      id_tipe_kamar: "",
      id_user: "1",
      status_pemesanan: "",
    });
    setModalIsOpen(true);
  };

  const handleEditClick = (reservation) => {
    setFormData(reservation);
    setModalIsOpen(true);
  };

  const handleDeleteClick = (id) => {
    // Send a DELETE request to your API
    axios.delete(`http://localhost:8000/pemesanan/${id}`).then(() => {
      // Update the reservations list after deleting
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );
    });
  };

  const handleSubmit = () => {
    // Send a POST request to create a new reservation
    if (!formData.id) {
      axios.post("http://localhost:8000/pemesanan", formData).then(() => {
        setModalIsOpen(false);
        // Fetch the updated reservations list
        axios.get("http://localhost:8000/pemesanan").then((response) => {
          setReservations(response.data);
        });
      });
    } else {
      // Send a PUT request to update the reservation
      axios
        .put(`http://localhost:8000/pemesanan/${formData.id}`, formData)
        .then(() => {
          setModalIsOpen(false);
          setReservations((prevReservations) =>
            prevReservations.map((reservation) =>
              reservation.id === formData.id ? formData : reservation
            )
          );
        });
    }
  };

  const handlePrintClick = async (id) => {
    try {
      // Fetch the reservation data
      const reservationResponse = await axios.get(
        `http://localhost:8000/pemesanan/print/${id}`
      );
      const reservationData = reservationResponse.data;

      // Create a new jsPDF instance
      const doc = new jsPDF();

      // Create a temporary div element
      const tempDiv = document.createElement("div");
      document.body.appendChild(tempDiv);

      // Render the Receipt component into the temporary div
      ReactDOM.render(<Receipt data={reservationData} />, tempDiv);

      // Convert the HTML content to a canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2, // You can adjust the scale for better quality
      });

      // Remove the temporary div from the DOM
      document.body.removeChild(tempDiv);

      // Add the canvas image to the PDF
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 10);

      // Save or open the PDF
      doc.save("hotel_reservation_receipt.pdf");
    } catch (error) {
      console.error("Error fetching or generating PDF:", error);
    }
  };

  const TableRow = ({ data }) => (
    <tr key={data.id}>
      {Object.keys(data).map((key, index) => (
        <td key={index} className="px-6 py-4 whitespace-nowrap">
          {data[key]}
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
          onClick={() => handlePrintClick(data.id)}
        >
          Print
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2"
          onClick={handleCreateClick}
        >
          Create
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
          onClick={() => handleEditClick(data)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => handleDeleteClick(data.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4">
        <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {reservations.length > 0 &&
                    Object.keys(reservations[0]).map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id} data={reservation} />
                ))}
              </tbody>
            </table>
          </div>
          <ReservationModal
            isOpen={modalIsOpen}
            closeModal={() => setModalIsOpen(false)}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
}

export default Reservations;
