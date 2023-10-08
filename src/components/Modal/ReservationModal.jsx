import React from "react";

function ReservationModal({
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
            {isCreating ? "Create Reservation" : "Edit Reservation"}
          </h2>
          <form>
            <div className="mb-4">
              <span className="text-gray-700">{formData.nomor_pemesanan}</span>
            </div>
            {renderInputField("Nama Pemesan", "nama_pemesan")}
            {renderInputField("Email Pemesan", "email_pemesan")}
            {renderInputField("Tanggal Pemesanan", "tgl_pemesanan")}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Tanggal Check In:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="tgl_check_in"
                value={formData.tgl_check_in}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Tanggal Check Out:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="tgl_check_out"
                value={formData.tgl_check_out}
                onChange={handleChange}
              />
            </div>
            {renderInputField("Nama Tamu", "nama_tamu")}
            {renderInputField("Jumlah Kamar", "jumlah_kamar")}
            {renderInputField("Tipe Kamar", "id_tipe_kamar")}
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

export default ReservationModal;
