import { Review } from '@/types/review';

const API_BASE = '/api/reviews';

export async function fetchHostawayReviews(filters?: any): Promise<Review[]> {
    try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/hostaway?${params}`);

        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
}

export async function updateReviewApproval(
    reviewId: number,
    isApproved: boolean
): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE}/hostaway`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reviewId, isApproved }),
        });

        return response.ok;
    } catch (error) {
        console.error('Error updating review:', error);
        return false;
    }
}

export function getPropertyStats(reviews: Review[]) {
    const properties = [...new Set(reviews.map(r => r.listingName))];

    return properties.map(property => {
        const propertyReviews = reviews.filter(r => r.listingName === property);
        const avgRating = propertyReviews.reduce((sum, r) => sum + r.rating, 0) / propertyReviews.length;

        return {
            name: property,
            avgRating: Math.round(avgRating * 10) / 10,
            reviewCount: propertyReviews.length,
            approvedCount: propertyReviews.filter(r => r.isApproved).length,
        };
    });
}