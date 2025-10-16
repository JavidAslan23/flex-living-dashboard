'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Star, Filter, TrendingUp, MapPin, Check, X, Eye, Search, Home } from 'lucide-react';
import Link from 'next/link';

interface ReviewCategory {
    category: string;
    rating: number;
}

interface Review {
    id: number;
    listingName: string;
    guestName: string;
    rating: number;
    publicReview: string;
    reviewCategory: ReviewCategory[];
    submittedAt: string;
    channel: string;
    status: string;
    isApproved: boolean;
}

export default function DashboardPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [selectedProperty, setSelectedProperty] = useState('all');
    const [selectedChannel, setSelectedChannel] = useState('all');
    const [minRating, setMinRating] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');

    // Fetch reviews on component mount
    useEffect(() => {
        fetchReviews();
    }, []);

    // Apply filters whenever dependencies change
    useEffect(() => {
        filterReviews();
    }, [reviews, selectedProperty, selectedChannel, minRating, searchTerm, sortBy]);

    async function fetchReviews() {
        try {
            const response = await fetch('/api/reviews/hostaway');
            const data = await response.json();

            if (data.success) {
                setReviews(data.data);
                setFilteredReviews(data.data);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    }

    function filterReviews() {
        let filtered = [...reviews];

        // Filter by property
        if (selectedProperty !== 'all') {
            filtered = filtered.filter(r => r.listingName === selectedProperty);
        }

        // Filter by channel
        if (selectedChannel !== 'all') {
            filtered = filtered.filter(r => r.channel === selectedChannel);
        }

        // Filter by minimum rating
        if (minRating > 0) {
            filtered = filtered.filter(r => r.rating >= minRating);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(r =>
                r.publicReview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.guestName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort reviews
        if (sortBy === 'date') {
            filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredReviews(filtered);
    }

    async function toggleApproval(id: number) {
        const review = reviews.find(r => r.id === id);
        if (!review) return;

        const newStatus = !review.isApproved;

        try {
            const response = await fetch('/api/reviews/hostaway', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviewId: id, isApproved: newStatus })
            });

            if (response.ok) {
                setReviews(reviews.map(r =>
                    r.id === id ? { ...r, isApproved: newStatus } : r
                ));
            }
        } catch (error) {
            console.error('Error updating review:', error);
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading reviews...</p>
                </div>
            </div>
        );
    }

    // Calculate statistics
    const properties = [...new Set(reviews.map(r => r.listingName))];
    const channels = [...new Set(reviews.map(r => r.channel))];

    const propertyStats = properties.map(prop => ({
        name: prop.split(' ').slice(0, 2).join(' '),
        avgRating: parseFloat((reviews.filter(r => r.listingName === prop)
                .reduce((sum, r) => sum + r.rating, 0) /
            reviews.filter(r => r.listingName === prop).length).toFixed(1)),
        count: reviews.filter(r => r.listingName === prop).length
    }));

    const channelStats = channels.map(channel => ({
        name: channel,
        value: reviews.filter(r => r.channel === channel).length
    }));

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '0';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/public" className="text-slate-600 hover:text-slate-900 transition">
                                <Home size={20} />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Flex Living</h1>
                                <p className="text-sm text-slate-500">Reviews Dashboard</p>
                            </div>
                        </div>
                        <Link
                            href="/property/shoreditch"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            <Eye size={18} />
                            Preview Public Page
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700">Average Rating</h3>
                            <Star className="text-yellow-500" fill="currentColor" size={20} />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{avgRating}</p>
                        <p className="text-sm text-slate-500 mt-1">Across all properties</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700">Total Reviews</h3>
                            <TrendingUp className="text-green-500" size={20} />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{reviews.length}</p>
                        <p className="text-sm text-slate-500 mt-1">
                            {reviews.filter(r => r.isApproved).length} approved
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700">Properties</h3>
                            <MapPin className="text-blue-500" size={20} />
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{properties.length}</p>
                        <p className="text-sm text-slate-500 mt-1">Active listings</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <h3 className="font-semibold text-slate-700 mb-4">Property Performance</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={propertyStats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis domain={[0, 10]} />
                                <Tooltip />
                                <Bar dataKey="avgRating" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <h3 className="font-semibold text-slate-700 mb-4">Reviews by Channel</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={channelStats}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {channelStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={20} className="text-slate-600" />
                        <h3 className="font-semibold text-slate-700">Filters</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Property</label>
                            <select
                                value={selectedProperty}
                                onChange={(e) => setSelectedProperty(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Properties</option>
                                {properties.map(prop => (
                                    <option key={prop} value={prop}>{prop}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Channel</label>
                            <select
                                value={selectedChannel}
                                onChange={(e) => setSelectedChannel(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Channels</option>
                                {channels.map(channel => (
                                    <option key={channel} value={channel}>{channel}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Min Rating</label>
                            <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.5"
                                value={minRating}
                                onChange={(e) => setMinRating(parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="date">Date (Newest)</option>
                                <option value="rating">Rating (Highest)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search reviews..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-700">
                            Reviews ({filteredReviews.length})
                        </h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {filteredReviews.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-slate-500">No reviews found matching your filters.</p>
                            </div>
                        ) : (
                            filteredReviews.map(review => (
                                <div key={review.id} className="p-6 hover:bg-slate-50 transition">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-semibold text-slate-900">{review.guestName}</span>
                                                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                          {review.channel}
                        </span>
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="text-yellow-500" fill="currentColor" />
                                                    <span className="font-semibold text-slate-700">{review.rating}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">{review.listingName}</p>
                                            <p className="text-slate-700 mb-3">{review.publicReview}</p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {review.reviewCategory.map((cat, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {cat.category}: {cat.rating}/10
                          </span>
                                                ))}
                                            </div>
                                            <p className="text-xs text-slate-400">
                                                {new Date(review.submittedAt).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => toggleApproval(review.id)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                                                    review.isApproved
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                            >
                                                {review.isApproved ? (
                                                    <>
                                                        <Check size={16} />
                                                        Approved
                                                    </>
                                                ) : (
                                                    <>
                                                        <X size={16} />
                                                        Pending
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}