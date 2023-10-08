import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import UserModal from "../../components/Modal/UserModal"; // Import the separate modal component

function User() {
  const [user, setUser] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null, // Add an id field for tracking the user to edit
    nama_user: "",
    foto: null,
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    // Fetch user from your API
    axios.get("http://localhost:8000/user").then((response) => {
      setUser(response.data);
    });
  }, []);

  const handleCreateClick = () => {
    setFormData({
      ...formData,
      id: null,
      nama_user: "",
      foto: "",
      email: "",
      password: "",
      role: "",
    });
    setModalIsOpen(true);
  };

  const handleEditClick = (user) => {
    setFormData({
      id: user.id,
      nama_user: user.nama_user,
      foto: null,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setModalIsOpen(true);
  };

  const handleDeleteClick = (id) => {
    // Send a DELETE request to your API
    axios.delete(`http://localhost:8000/user/${id}`).then(() => {
      // Update the user list after deleting
      setUser(user.filter((user) => user.id !== id));
    });
  };

  const handleSubmit = () => {
    // Create a FormData object to send files
    const formDataToSend = new FormData();
    formDataToSend.append("nama_user", formData.nama_user);
    formDataToSend.append("foto", formData.foto);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);

    // Send a POST request to create a new user
    if (!formData.id) {
      axios.post("http://localhost:8000/user", formDataToSend).then(() => {
        setModalIsOpen(false);
        // Fetch the updated user list
        axios.get("http://localhost:8000/user").then((response) => {
          setUser(response.data);
        });
      });
    } else {
      // Send a PUT request to update the user
      axios.put(`http://localhost:8000/user/${formData.id}`, formDataToSend)
      .then(() => {
        setModalIsOpen(false);
        // Update the formData object if needed
        setFormData({ ...formData, ...formDataToSend });
        // Update the user list if needed
        setUser((prevUser) =>
          prevUser.map((userItem) =>
            userItem.id === formData.id ? { ...userItem, ...formData } : userItem
          )
        );
      });
    }
  };

  const TableRow = ({ data }) => (
    <tr key={data.id}>
      {Object.keys(data).map((key, index) => {
        if (key === "foto") {
          // Render the image if the key is 'foto'
          return (
            <td key={index} className="px-6 py-4 whitespace-nowrap">
              <img
                src={`http://localhost:8000/user/uploads/${data[key]}`} // Adjust the image path based on your backend
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
                  {user.length > 0 &&
                    Object.keys(user[0])?.map((header, index) => (
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
                {user.map((user) => (
                  <TableRow key={user.id} data={user} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Render the modal component */}
          <UserModal
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

export default User;
