import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import adminService from "../services/admin.service";
import Loading from "../components/Loading";
import { getIndianTime } from "../utils/helper";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";


function ProfileViews() {
    const [loading, setLoading] = useState(false);

    const [viewsByDate, setViewsByDate] = useState([]);
    const [topDoctors, setTopDoctors] = useState([]);
    const [recentViews, setRecentViews] = useState([]);

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const [
                viewsRes,
                topRes,
                recentRes
            ] = await Promise.all([
                adminService.getViewsByDate(),
                adminService.getMostViewedDoctors(),
                adminService.getRecentViews()
            ]);

            setViewsByDate(viewsRes || []);
            setTopDoctors(topRes || []);
            setRecentViews(recentRes || []);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const formattedData = viewsByDate.map(item => ({
        ...item,
        formattedDate: getIndianTime(item.date)
    }));

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Profile view analytics
                </h1>

                {loading && <Loading message="Loading dashboard..." />}

                {!loading && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                            <div className="bg-white p-4 rounded-2xl shadow">
                                <h2 className="font-semibold mb-4">Views Over Time</h2>

                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={formattedData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="formattedDate" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="views" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-white p-4 rounded-2xl shadow">
                                <h2 className="font-semibold mb-4">Top Viewed Doctors</h2>

                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart layout="vertical" data={topDoctors}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis type="category" dataKey="doctor_name" width={150} />
                                        <Tooltip />
                                        <Bar dataKey="views" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                        </div>

                        <div className="bg-white rounded-2xl shadow overflow-hidden">

                            <div className="p-4 border-b font-semibold">
                                Recent Profile Views
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">

                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-3 text-left">Viewer</th>
                                            <th className="p-3 text-left">Doctor</th>
                                            <th className="p-3 text-left">Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentViews.map((item, index) => (
                                            <tr key={index} className="border-t hover:bg-gray-50">

                                                <td className="p-3">
                                                    {item.viewer_name || "Anonymous"}
                                                </td>

                                                <td className="p-3">
                                                    {item.doctor_name}
                                                </td>

                                                <td className="p-3">
                                                    {new Date(item.viewed_at).toLocaleString()}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>

                            {recentViews.length === 0 && (
                                <div className="p-6 text-center text-gray-500">
                                    No recent activity
                                </div>
                            )}

                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}

export default ProfileViews;