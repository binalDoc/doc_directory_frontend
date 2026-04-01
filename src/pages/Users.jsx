import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import adminService from "../services/admin.service";
import Loading from "../components/Loading";
import toaster from "../components/toaster";
import UserFormModal from "../components/UserFormModal";
import ConfirmModal from "../components/ConfirmModal";
import DoctorProfileModal from "../components/DoctorProfileModal";
import PharmaProfileModal from "../components/PharmaProfileModal";

function Users() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await adminService.getAllUsers({ page, limit });
      setList(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async () => {
    try {
      await adminService.deleteUserByAdmin(deleteUser?.user_id);
      toaster.success("User deleted successfully");
      setDeleteUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Users</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage all registered users</p>
          </div>
          <button
            title="Add new user"
            onClick={() => { setSelectedUser(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            <span className="text-lg leading-none">+</span>
            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>

        {/* LOADING */}
        {loading && <Loading message="Loading users..." />}

        {/* DESKTOP TABLE */}
        {!loading && (
          <>
            <div className="hidden md:block bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 text-left font-semibold text-gray-600">Name</th>
                      <th className="p-4 text-left font-semibold text-gray-600">Email</th>
                      <th className="p-4 text-left font-semibold text-gray-600">Role</th>
                      <th className="p-4 text-center font-semibold text-gray-600">Profile</th>
                      <th className="p-4 text-center font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((user, index) => (
                      <tr
                        key={user.user_id}
                        className={`border-t border-gray-50 hover:bg-blue-50/30 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                      >
                        <td className="p-4 font-medium text-gray-800">{user.name}</td>
                        <td className="p-4 text-gray-500">{user.email}</td>
                        <td className="p-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium
                          ${user.role === "ADMIN" ? "bg-purple-100 text-purple-700"
                              : user.role === "DOCTOR" ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setViewUser(user)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs transition"
                          >
                            View
                          </button>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => { setSelectedUser(user); setShowForm(true); }}
                              className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-xs font-medium transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteUser(user)}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {list.length === 0 && (
                <div className="p-12 text-center text-gray-400">No users found</div>
              )}
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden flex flex-col gap-3">
              {list.length === 0 && (
                <div className="p-10 text-center text-gray-400 bg-white rounded-2xl shadow">
                  No users found
                </div>
              )}
              {list.map((user) => (
                <div key={user.user_id} className="bg-white rounded-2xl shadow border border-gray-100 p-4 flex flex-col gap-3">
                  {/* Top: name + role badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                    </div>
                    <span className={`shrink-0 inline-flex px-2.5 py-1 rounded-full text-xs font-medium
                    ${user.role === "ADMIN" ? "bg-purple-100 text-purple-700"
                        : user.role === "DOCTOR" ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"}`}>
                      {user.role}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setViewUser(user)}
                      className="flex-1 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => { setSelectedUser(user); setShowForm(true); }}
                      className="flex-1 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-xs font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteUser(user)}
                      className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-gray-300 transition"
          >
            ← Prev
          </button>
          <span className="text-gray-600 font-medium text-sm">Page {page}</span>
          <button
            disabled={list.length <= limit}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-blue-700 transition"
          >
            Next →
          </button>
        </div>

        {/* MODALS */}
        {showForm && (
          <UserFormModal
            user={selectedUser}
            onClose={() => setShowForm(false)}
            onSuccess={() => { fetchUsers(); setShowForm(false); }}
          />
        )}
        {deleteUser && (
          <ConfirmModal
            title="Delete User"
            message={`Are you sure you want to delete ${deleteUser.name}?`}
            onConfirm={handleDelete}
            onClose={() => setDeleteUser(null)}
          />
        )}
        {viewUser && (
          viewUser?.role === "DOCTOR" ? (
            <DoctorProfileModal doctorId={viewUser?.doctor_profile_id} onClose={() => setViewUser(null)} />
          ) : (
            <PharmaProfileModal user={viewUser} onClose={() => setViewUser(null)} />
          )
        )}

      </div>
    </AdminLayout>
  );
}

export default Users;