import AdminSidebar from "./AdminSidebar";
import Navbar from "./Navbar";

function AdminLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      <Navbar/>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Content */}
      <div className="flex-1 p-6 sm:mt-16 sm:px-4">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;