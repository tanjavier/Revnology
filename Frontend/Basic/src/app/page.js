import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-4">
        <div>
          <h1 className="text-center text-4xl font-bold text-black">Welcome</h1>
          <div className="mt-8 space-y-4">
            <Link 
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}