function PharmaProfileModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-full max-w-lg">

        <h2 className="text-xl font-bold mb-4">User Profile</h2>

        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {user?.company_name && <p><strong>Company:</strong> {user?.company_name}</p>}

        <div className="flex justify-end mt-4">
          <button onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
}

export default PharmaProfileModal;