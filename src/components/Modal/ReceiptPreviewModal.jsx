import React from "react";
import Receipt from "../Receipt";

function ReceiptPreviewModal({ isOpen, closeModal, receiptData }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-opacity-80 bg-gray-900">
      <div className="relative w-full max-w-3xl mx-auto my-6">
        {/* Content */}
        <div className="relative bg-white border-0 rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold text-gray-800">
              Receipt Preview
            </h3>
            <button
              onClick={closeModal}
              className="p-1 ml-auto bg-transparent border-0 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <span className="bg-transparent text-gray-800 h-6 w-6 text-2xl block">
                ×
              </span>
            </button>
          </div>
          {/* Body */}
          <div className="p-6">
            <Receipt data={receiptData} />
          </div>
          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            <button
              onClick={closeModal}
              className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm hover:bg-red-100 hover:text-red-600 rounded outline-none focus:outline-none mr-1 mb-1 transition duration-300 ease-in-out"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptPreviewModal;