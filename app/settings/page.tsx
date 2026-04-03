import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col sm:ml-64 w-full">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your account configurations and application preferences.
            </p>
          </div>
          
          <div className="grid gap-6 max-w-3xl">
            {/* Profile Settings */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Application Settings */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Preferences</h3>
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Email Notifications</span>
                  <span className="text-xs text-gray-500">Receive weekly financial summaries.</span>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full cursor-pointer relative">
                  <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Danger Zone</span>
                  <span className="text-xs text-gray-500">Permanently delete your account and formatted data.</span>
                </div>
                <button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium rounded-lg text-sm transition-colors border border-red-200 dark:border-red-900">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
