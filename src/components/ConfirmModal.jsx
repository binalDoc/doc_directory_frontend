function ConfirmModal({ title, message, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">

      <div className="bg-white p-6 rounded-xl w-full max-w-sm">

        <h2 className="font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;