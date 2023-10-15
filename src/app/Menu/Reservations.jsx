import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import ReservationModal from "../../components/Modal/ReservationModal";
import ReceiptPreviewModal from "../../components/Modal/ReceiptPreviewModal";
import Receipt from "../../components/Receipt";
import debounce from "lodash.debounce";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [receiptPreviewIsOpen, setReceiptPreviewIsOpen] = useState(false); // State variable for receipt preview modal
  const [receiptData, setReceiptData] = useState(null);
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
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = debounce((query) => setSearchQuery(query));

  useEffect(() => {
    // Fetch reservations from your API
    axios.get("http://localhost:8000/pemesanan").then((response) => {
      setReservations(response.data);
    });
  }, []);

  const handleEditClick = (reservation) => {
    setFormData(reservation);
    setModalIsOpen(true);
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
      if (!id) {
        console.error("Reservation ID is undefined or null.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/pemesanan/print/${id}`
      );
      setReceiptData(response.data);
      setReceiptPreviewIsOpen(true); // Open the receipt preview modal
    } catch (error) {
      console.error(error);
    }
  };

  const TableRow = ({ data }) => {
    return (
      <tr key={data.id}>
        {Object.keys(data)
          .filter((key) => key !== "createdAt" && key !== "updatedAt")
          .map((key, index) => (
            <td key={index} className="px-6 py-4 whitespace-nowrap">
              {data[key]}
            </td>
          ))}
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            onClick={() => handlePrintClick(data.id)} // Pass the reservation ID
          >
            Print
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            onClick={() => handleEditClick(data)}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4">
        <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter your reservation ID"
                value={searchQuery}
                onChange={(e) => debouncedSearch(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-1/2"
              />
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {reservations.length > 0 &&
                    Object.keys(reservations[0])
                      .filter((key) => key !== "createdAt" && key !== "updatedAt")
                      .map((header, index) => (
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
                {reservations
                  .filter((reservation) =>
                    Object.values(reservation)
                      .join(" ")
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((reservation) => (
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
        <ReceiptPreviewModal
          isOpen={receiptPreviewIsOpen}
          closeModal={() => setReceiptPreviewIsOpen(false)}
          receiptData={receiptData}
        />
      </main>
    </div>
  );
}

export default Reservations;
