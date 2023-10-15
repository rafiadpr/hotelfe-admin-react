import React from "react";

function RoomModal({
  isOpen,
  closeModal,
  formData,
  setFormData,
  handleSubmit,
  isCreating,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderInputField = (label, name) => (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}:</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    // Use conditional rendering to show/hide the modal based on the isOpen prop
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            {isCreating ? "Create Room" : "Edit Room"}
          </h2>
          <form>
            {renderInputField("Nomor Kamar", "nomor_kamar")}
            {renderInputField("ID Tipe Kamar", "id_tipe_kamar")}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Tersedia:</label>
              <select
                id="tersedia"
                name="tersedia"
                className="border p-2 text-gray-600"
                value={formData.tersedia}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Tersedia">Tersedia</option>
                <option value="Tidak Tersedia">Tidak Tersedia</option>
              </select>
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

export default RoomModal;
