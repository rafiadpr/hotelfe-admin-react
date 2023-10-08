import React, { useEffect, useState } from "react";

function RoomTypeModal({
  isOpen,
  closeModal,
  formData,
  setFormData,
  handleSubmit,
  isCreating,
}) {
  const [imageUrl, setImageUrl] = useState(""); // State to store the image URL

  useEffect(() => {
    // When the component mounts or formData.foto changes, update the image URL
    if (formData.foto) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.foto);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
    }
  }, [formData.foto]);

  const handleChange = (e) => {
    if (e.target.name === "foto") {
      // Get the selected file and set it as Blob
      const selectedFile = e.target.files[0];
      setFormData({
        ...formData,
        foto: selectedFile,
      });

      // You can also display a preview of the selected image
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const renderInputField = (label, name, type = "text") => (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}:</label>
      {type === "text" ? (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
        />
      ) : (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={type}
          name={name}
          onChange={handleChange}
        />
      )}
    </div>
  );

  return (
    // Use conditional rendering to show/hide the modal based on the isOpen prop
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            {isCreating ? "Create User" : "Edit User"}
          </h2>
          <form>
            {renderInputField("Nama User", "nama_user")}
            {renderInputField("Email", "email")}
            {renderInputField("Password", "password")}
            {renderInputField("Role", "role")}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Foto:</label>
              <input
                type="file"
                name="foto"
                onChange={handleChange}
                accept="image/*" // Allow only image files
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded Image"
                  className="mt-2 rounded"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </div>
            <div className="mb-4">
              <button
                className={`${
                  isCreating ? "bg-green-500" : "bg-blue-500"
                } hover:${
                  isCreating ? "bg-green-700" : "bg-blue-700"
                } text-white font-bold py-2 px-4 rounded mr-2`}
                type="button"
                onClick={handleSubmit}
              >
                {isCreating ? "Create" : "Save"}
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
}

export default RoomTypeModal;
