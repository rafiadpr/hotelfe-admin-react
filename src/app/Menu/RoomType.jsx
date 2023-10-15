import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import RoomTypeModal from "../../components/Modal/RoomTypeModal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

function RoomType() {
  const [roomType, setRoomType] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nama_tipe_kamar: "",
    harga: "",
    deskripsi: "",
    foto: null, // Use null initially for the image file
  });
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(""); // State variable for search input
  const debouncedSearch = debounce((query) => setSearchQuery(query));

  useEffect(() => {
    const role = Cookies.get("role");

    if (role !== "Admin") {
      navigate("/404");
    }
    // Fetch roomType from your API
    axios.get("http://localhost:8000/tipekamar").then((response) => {
      setRoomType(response.data);
    });
  }, []);

  const handleCreateClick = () => {
    setFormData({
      ...formData,
      id: null,
      nama_tipe_kamar: "",
      harga: "",
      deskripsi: "",
      foto: "",
    });
    setModalIsOpen(true);
  };

  const handleEditClick = (roomType) => {
    setFormData({
      id: roomType.id,
      nama_tipe_kamar: roomType.nama_tipe_kamar,
      harga: roomType.harga,
      deskripsi: roomType.deskripsi,
      foto: null, // Initialize foto as null for editing
    });
    setModalIsOpen(true);
  };

  const handleDeleteClick = (id) => {
    // Send a DELETE request to your API
    axios.delete(`http://localhost:8000/tipekamar/${id}`).then(() => {
      // Update the roomType list after deleting
      setRoomType((prevRoomType) =>
        prevRoomType.filter((roomType) => roomType.id !== id)
      );
    });
  };

  const handleSubmit = () => {
    // Create a FormData object to send files
    const formDataToSend = new FormData();
    formDataToSend.append("nama_tipe_kamar", formData.nama_tipe_kamar);
    formDataToSend.append("harga", formData.harga);
    formDataToSend.append("deskripsi", formData.deskripsi);
    formDataToSend.append("foto", formData.foto); // Append the image file

    // Send a POST request to create a new roomType
    if (!formData.id) {
      axios.post("http://localhost:8000/tipekamar", formDataToSend).then(() => {
        setModalIsOpen(false);
        // Fetch the updated roomType list
        axios.get("http://localhost:8000/tipekamar").then((response) => {
          setRoomType(response.data);
        });
      });
    } else {
      // Send a PUT request to update the roomType
      axios
        .put(`http://localhost:8000/tipekamar/${formData.id}`, formDataToSend)
        .then(() => {
          setModalIsOpen(false);
          // Update the formData object if needed
          setFormData({ ...formData, ...formDataToSend });
          // Update the roomType list if needed
          setRoomType((prevRoomType) =>
            prevRoomType.map((roomTypeItem) =>
              roomTypeItem.id === formData.id
                ? { ...roomTypeItem, ...formData }
                : roomTypeItem
            )
          );
        });
    }
  };

  const TableRow = ({ data }) => (
    <tr key={data.id}>
      {Object.keys(data)
        .filter((key) => key !== "createdAt" && key !== "updatedAt")
        .map((key, index) => {
          if (key === "foto") {
            // Render the image if the key is 'foto'
            return (
              <td key={index} className="px-6 py-4 whitespace-nowrap">
                <img
                  src={`http://localhost:8000/tipekamar/uploads/${data[key]}`} // Adjust the image path based on your backend
                  alt={data[key]}
                  width="100" // Adjust the width as needed
                />
              </td>
            );
          } else {
            return (
              <td key={index} className="px-6 py-4 whitespace-nowrap">
                {data[key]}
              </td>
            );
          }
        })}
      <td className="px-6 py-4 whitespace-nowrap">
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
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter your field"
                value={searchQuery}
                onChange={(e) => debouncedSearch(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-1/2"
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2"
                onClick={handleCreateClick}
              >
                Create
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {roomType.length > 0 &&
                    Object.keys(roomType[0])
                      .filter(
                        (key) => key !== "createdAt" && key !== "updatedAt"
                      )
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
                {roomType
                  .filter((roomType) =>
                    Object.values(roomType)
                      .join(" ")
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((roomType) => (
                    <TableRow key={roomType.id} data={roomType} />
                  ))}
              </tbody>
            </table>
          </div>

          <RoomTypeModal
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

export default RoomType;
