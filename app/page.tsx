import Link from 'next/link';
import { ArrowRight, BarChart3, CheckCircle, Eye } from 'lucide-react';

export default function HomePage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Flex Living</h1>
            <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        </header>

        {/* Hero */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Reviews Dashboard
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Manage and showcase your property reviews with ease.
              Track performance, approve reviews, and build trust with guests.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
              >
                View Dashboard
                <ArrowRight size={20} />
              </Link>
              <Link
                  href="/property/shoreditch"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition text-lg font-semibold"
              >
                <Eye size={20} />
                Public Page Demo
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-slate-600">
                Track property performance with real-time charts and statistics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Review Management</h3>
              <p className="text-slate-600">
                Approve or reject reviews before they appear on your public pages.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Public Display</h3>
              <p className="text-slate-600">
                Beautiful review sections that integrate with your property pages.
              </p>
            </div>
          </div>
        </main>
      </div>
  );
}