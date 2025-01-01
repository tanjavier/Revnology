'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function Dashboard() {
    return (
        <DashboardLayout>
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-800">Welcome to the Dashboard</h1>
                <p className="mt-4 text-gray-600">
                    Use the navigation above to manage users and access other features.
                </p>
            </div>
        </DashboardLayout>
    );
}