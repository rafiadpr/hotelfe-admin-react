import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import RoomModal from "../../components/Modal/RoomModal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nomor_kamar: "",
    id_tipe_kamar: "",
    tersedia: "",
  });
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(""); // State variable for search input
  const debouncedSearch = debounce((query) => setSearchQuery(query));

  useEffect(() => {
    const role = Cookies.get("role");

    if (role !== "Admin") {
      navigate("/404");
    }
    // Fetch rooms from your API
    axios.get("http://localhost:8000/kamar").then((response) => {
      setRooms(response.data);
    });
  }, []);

  const handleCreateClick = () => {
    setFormData({
      ...formData,
      nomor_kamar: "",
      id_tipe_kamar: "",
      tersedia: "",
    });
    setModalIsOpen(true);
  };

  const handleEditClick = (rooms) => {
    setFormData(rooms);
    setModalIsOpen(true);
  };

  const handleDeleteClick = (id) => {
    // Send a DELETE request to your API
    axios.delete(`http://localhost:8000/kamar/${id}`).then(() => {
      // Update the rooms list after deleting
      setRooms((prevRooms) => prevRooms.filter((rooms) => rooms.id !== id));
    });
  };

  const handleSubmit = () => {
    // Send a POST request to create a new rooms
    if (!formData.id) {
      axios.post("http://localhost:8000/kamar", formData).then(() => {
        setModalIsOpen(false);
        // Fetch the updated rooms list
        axios.get("http://localhost:8000/kamar").then((response) => {
          setRooms(response.data);
        });
      });
    } else {
      // Send a PUT request to update the rooms
      axios
        .put(`http://localhost:8000/kamar/${formData.id}`, formData)
        .then(() => {
          setModalIsOpen(false);
          setRooms((prevRooms) =>
            prevRooms.map((rooms) =>
              rooms.id === formData.id ? formData : rooms
            )
          );
        });
    }
  };

  const TableRow = ({ data }) => (
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
                  {rooms.length > 0 &&
                    Object.keys(rooms[0])
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
                {rooms
                  .filter((room) =>
                    Object.values(room)
                      .join(" ")
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((room) => (
                    <TableRow key={room.id} data={room} />
                  ))}
              </tbody>
            </table>
          </div>

          <RoomModal
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

export default Rooms;
