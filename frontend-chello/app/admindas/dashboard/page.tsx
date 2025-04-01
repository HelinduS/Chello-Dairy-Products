"use client";

import React, { useEffect, useState } from "react";
import { Users, Package, Truck, ClipboardList } from "lucide-react"; //icons
import { Card } from "@/components/ui/card";


// Define the Order type
interface order {
    id: string;
    customerName: string;
    status: string;
}

const DashboardPage = () => {
    // Define the state to hold stats (users, orders, drivers, inventory)
    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        drivers: 0,
    });

    // Define state for holding recent orders data
    const [recentOrders, setRecentOrders] = useState<order[]>([]);

    // Define state for managing selected time period
    const [timePeriod, setTimePeriod] = useState("7"); // Default to last 7 days

    // Fetch the dashboard stats (users, orders, drivers, inventory)
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/stats");
                const data = await response.json();
                setStats({
                    users: data.users,
                    orders: data.orders,
                    drivers: data.drivers,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats(); // Call the fetch function when the component mounts
    }, []);

    // Fetch recent orders based on the selected time period
    const fetchRecentOrders = async (period: string) => {
        try {
            const response = await fetch(`/api/orders/recent?period=${period}`);
            const orders = await response.json();
            setRecentOrders(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setRecentOrders([]);
        }
    };

    // Fetch orders whenever the time period changes
    useEffect(() => {
        fetchRecentOrders(timePeriod); // Fetch orders based on the current time period
    }, [timePeriod]); // Runs every time the timePeriod changes

    return (

        <div className="w-full p-4 lg:p-6">
            <h1 className="text-3xl font-bold mb-6 text-left">Admin Dashboard</h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Users Card */}
                <Card className="bg-blue-900 p-6 rounded-xl shadow-md text-white">
                    <a href="/users" className="flex flex-col gap-6">
                        <h2 className="text-xl font-semibold">Users</h2>
                        <p className="text-3xl font-bold">{stats.users}</p>
                        <div className="mt-4 flex items-center">
                            <Users size={24} />
                            <span className="ml-2">Manage your users</span>
                        </div>
                    </a>
                </Card>

                {/* Orders Card */}
                <Card className="bg-blue-900 p-6 rounded-xl shadow-md text-white">
                    <h2 className="text-xl font-semibold">Orders</h2>
                    <p className="text-3xl font-bold">{stats.orders}</p>
                    <div className="mt-4 flex items-center">
                        <ClipboardList size={24} />
                        <span className="ml-2">View all orders</span>
                    </div>
                </Card>

                {/* Delivery Drivers Card */}
                <Card className="bg-blue-900 p-6 rounded-xl shadow-md text-white">
                    <h2 className="text-xl font-semibold">Delivery Drivers</h2>
                    <p className="text-3xl font-bold">{stats.drivers}</p>
                    <div className="mt-4 flex items-center">
                        <Truck size={24} />
                        <span className="ml-2">Manage drivers</span>
                    </div>
                </Card>

            </div>

            {/* Time Period Selector for Recent Orders */}
            <div className="mt-8">
                <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="mt-2 p-2 border rounded"
                >
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="this_month">This Month</option>
                </select>
            </div>

            {/* Recent Orders Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold">Recent Orders</h2>
                <table className="min-w-full mt-4 table-auto border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="border-b px-4 py-2 text-left">Order ID</th>
                        <th className="border-b px-4 py-2 text-left">Customer</th>
                        <th className="border-b px-4 py-2 text-left">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Map through the recent orders and display */}
                    {recentOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="border-b px-4 py-2">{order.id}</td>
                            <td className="border-b px-4 py-2">{order.customerName}</td>
                            <td className="border-b px-4 py-2">{order.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardPage;