import { NextResponse } from 'next/server';

const HOSTAWAY_API_KEY = 'f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152';

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

// Mock data
const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        listingName: "Shoreditch Heights 2B N1",
        guestName: "Shane Finkelstein",
        rating: 10,
        publicReview: "Amazing property! Very clean and modern. Great location near restaurants.",
        reviewCategory: [
            { category: "cleanliness", rating: 10 },
            { category: "communication", rating: 10 },
            { category: "respect_house_rules", rating: 10 }
        ],
        submittedAt: "2024-10-10T14:30:00",
        channel: "Airbnb",
        status: "published",
        isApproved: false
    },
    {
        id: 2,
        listingName: "Camden Studio A3",
        guestName: "Maria Garcia",
        rating: 8.7,
        publicReview: "Good stay overall. Clean apartment but wifi was slow.",
        reviewCategory: [
            { category: "cleanliness", rating: 9 },
            { category: "communication", rating: 9 },
            { category: "location", rating: 8 }
        ],
        submittedAt: "2024-10-08T09:15:00",
        channel: "Booking.com",
        status: "published",
        isApproved: true
    },
    {
        id: 3,
        listingName: "Shoreditch Heights 2B N1",
        guestName: "Tom Wilson",
        rating: 9.3,
        publicReview: "Excellent host, smooth check-in process. Highly recommend!",
        reviewCategory: [
            { category: "cleanliness", rating: 9 },
            { category: "communication", rating: 10 },
            { category: "value", rating: 9 }
        ],
        submittedAt: "2024-10-05T16:45:00",
        channel: "Airbnb",
        status: "published",
        isApproved: true
    },
    {
        id: 4,
        listingName: "Notting Hill Deluxe 1B",
        guestName: "Sophie Chen",
        rating: 7.5,
        publicReview: "Location was perfect but apartment needs some maintenance.",
        reviewCategory: [
            { category: "location", rating: 10 },
            { category: "cleanliness", rating: 7 },
            { category: "value", rating: 6 }
        ],
        submittedAt: "2024-09-28T11:20:00",
        channel: "Expedia",
        status: "published",
        isApproved: false
    },
    {
        id: 5,
        listingName: "Camden Studio A3",
        guestName: "David Brown",
        rating: 9.7,
        publicReview: "Perfect for a short stay in London. Everything was spotless!",
        reviewCategory: [
            { category: "cleanliness", rating: 10 },
            { category: "communication", rating: 10 },
            { category: "check_in", rating: 9 }
        ],
        submittedAt: "2024-09-25T19:30:00",
        channel: "Airbnb",
        status: "published",
        isApproved: true
    },
    {
        id: 6,
        listingName: "Notting Hill Deluxe 1B",
        guestName: "James Anderson",
        rating: 8.5,
        publicReview: "Great property with beautiful interior design. Host was very responsive.",
        reviewCategory: [
            { category: "cleanliness", rating: 9 },
            { category: "communication", rating: 10 },
            { category: "location", rating: 7 }
        ],
        submittedAt: "2024-09-20T13:15:00",
        channel: "Airbnb",
        status: "published",
        isApproved: true
    }
];

export async function GET(request: Request) {
    try {
        // URL parametrlərini oxu (Java-dakı @RequestParam kimi)
        const { searchParams } = new URL(request.url);
        const property = searchParams.get('property');
        const channel = searchParams.get('channel');
        const minRating = searchParams.get('minRating');

        let reviews = [...MOCK_REVIEWS];

        // Filter et (Java-dakı stream().filter() kimi)
        if (property && property !== 'all') {
            reviews = reviews.filter(r => r.listingName === property);
        }

        if (channel && channel !== 'all') {
            reviews = reviews.filter(r => r.channel === channel);
        }

        if (minRating) {
            reviews = reviews.filter(r => r.rating >= parseFloat(minRating));
        }

        // Calculate statistics
        const properties = [...new Set(reviews.map(r => r.listingName))];
        const channels = [...new Set(reviews.map(r => r.channel))];
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        // Response (Java-dakı ResponseEntity kimi)
        return NextResponse.json({
            success: true,
            data: reviews,
            count: reviews.length,
            meta: {
                totalReviews: MOCK_REVIEWS.length,
                properties: properties,
                channels: channels,
                averageRating: avgRating.toFixed(2)
            }
        });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch reviews'
            },
            { status: 500 }
        );
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { reviewId, isApproved } = body;

        // Validation
        if (!reviewId) {
            return NextResponse.json(
                { success: false, error: 'Review ID is required' },
                { status: 400 }
            );
        }

        console.log(`Review ${reviewId} approval status: ${isApproved}`);

        return NextResponse.json({
            success: true,
            message: `Review ${isApproved ? 'approved' : 'rejected'} successfully`,
            reviewId
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to update review' },
            { status: 500 }
        );
    }
}