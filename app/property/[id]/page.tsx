// app/property/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Star, MapPin, Bed, Bath, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Review {
    id: number;
    listingName: string;
    guestName: string;
    rating: number;
    publicReview: string;
    submittedAt: string;
    channel: string;
    isApproved: boolean;
}

export default function PropertyPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApprovedReviews();
    }, []);

    async function fetchApprovedReviews() {
        try {
            const response = await fetch('/api/reviews/hostaway');
            const data = await response.json();

            if (data.success) {
                // Yalnız approved review-ları göstər
                const approved = data.data.filter((r: Review) => r.isApproved);
                setReviews(approved);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '0';

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-slate-900 text-white sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="hover:text-slate-300">
                                <ArrowLeft size={20} />
                            </Link>
                            <h1 className="text-2xl font-bold">Flex Living</h1>
                        </div>
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition text-sm font-medium"
                        >
                            Manager Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            {/* Property Hero */}
            <div className="relative h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h2 className="text-5xl font-bold mb-4">Shoreditch Heights</h2>
                        <p className="text-xl mb-2">Modern Living in Central London</p>
                        <div className="flex items-center justify-center gap-2 text-lg">
                            <MapPin size={20} />
                            <span>Shoreditch, London E1</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Property Info */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="text-center p-6 bg-slate-50 rounded-xl">
                        <Bed className="mx-auto mb-3 text-blue-600" size={32} />
                        <p className="text-3xl font-bold text-slate-900">2</p>
                        <p className="text-slate-600">Bedrooms</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-xl">
                        <Bath className="mx-auto mb-3 text-blue-600" size={32} />
                        <p className="text-3xl font-bold text-slate-900">1</p>
                        <p className="text-slate-600">Bathroom</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-xl">
                        <Home className="mx-auto mb-3 text-blue-600" size={32} />
                        <p className="text-3xl font-bold text-slate-900">65m²</p>
                        <p className="text-slate-600">Living Space</p>
                    </div>
                </div>

                {/* About Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">About This Property</h3>
                    <p className="text-slate-700 leading-relaxed">
                        Welcome to our stunning 2-bedroom apartment in the heart of Shoreditch.
                        This modern, fully-furnished property features high-quality finishes,
                        a spacious living area, and is perfectly located near trendy restaurants,
                        cafes, and excellent transport links. Ideal for professionals or small families
                        looking for a stylish London base.
                    </p>
                </div>

                {/* Amenities */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['WiFi', 'Kitchen', 'Washing Machine', 'Heating', 'TV', 'Workspace', 'Coffee Maker', 'Parking'].map((amenity) => (
                            <div key={amenity} className="flex items-center gap-2 text-slate-700">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span>{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t border-slate-200 pt-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Guest Reviews</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <Star size={24} className="text-yellow-500" fill="currentColor" />
                                    <span className="text-2xl font-bold text-slate-900">{avgRating}</span>
                                </div>
                                <span className="text-slate-600 text-lg">({reviews.length} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-slate-600">Loading reviews...</p>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-xl">
                            <p className="text-slate-500 text-lg">No approved reviews yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {reviews.map(review => (
                                <div key={review.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <p className="font-semibold text-slate-900">{review.guestName}</p>
                                            <p className="text-sm text-slate-500">
                                                {new Date(review.submittedAt).toLocaleDateString('en-GB', {
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="text-yellow-500" fill="currentColor" />
                                            <span className="font-bold text-slate-900">{review.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">{review.publicReview}</p>
                                    <p className="text-xs text-slate-400 mt-3">via {review.channel}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}