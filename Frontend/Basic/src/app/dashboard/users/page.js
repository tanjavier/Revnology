'use client';
import DashboardLayout from '@/components/DashboardLayout';
import UsersList from '@/components/UsersList';

export default function Users() {
    return (
        <DashboardLayout>
            <UsersList />
        </DashboardLayout>
    );
}