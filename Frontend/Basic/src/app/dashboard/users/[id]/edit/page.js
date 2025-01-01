'use client';
import DashboardLayout from '@/components/DashboardLayout';
import UserForm from '@/components/UserForm';
import { useParams } from 'next/navigation';

export default function EditUser() {
    const params = useParams();
    
    return (
        <DashboardLayout>
            <UserForm userId={params.id} />
        </DashboardLayout>
    );
}