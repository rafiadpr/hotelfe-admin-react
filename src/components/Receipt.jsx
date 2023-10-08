import React from "react";

const Receipt = ({ reservation }) => {
  return (
    <div className="p-4 border border-gray-300">
      <h2 className="text-2xl font-bold mb-4">Reservation Receipt</h2>
      <p><strong>Reservation ID:</strong> {reservation.id}</p>
      <p><strong>Booking Number:</strong> {reservation.nomor_pemesanan}</p>
      <p><strong>Guest Name:</strong> {reservation.nama_pemesan}</p>
      <p><strong>Guest Email:</strong> {reservation.email_pemesan}</p>
      <p><strong>Book Date:</strong> {reservation.tgl_pemesanan}</p>
      <p><strong>Check In Date:</strong> {reservation.tgl_check_in}</p>
      <p><strong>Check Out Date:</strong> {reservation.tgl_check_out}</p>
      <p><strong>Customer Name:</strong> {reservation.nama_tamu}</p>
      <p><strong>Room Quantity:</strong> {reservation.jumlah_kamar}</p>
      <p><strong>Room Type:</strong> {reservation.id_tipe_kamar}</p>
      <p><strong>Book Status:</strong> {reservation.status_pemesanan}</p>
    </div>
  );
};

export default Receipt;
