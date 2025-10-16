export interface ReviewCategory {
    category: string;
    rating: number;
}

export interface Review {
    id: number;
    listingName: string;
    guestName: string;
    rating: number;
    publicReview: string;
    reviewCategory: ReviewCategory[];
    submittedAt: string;
    channel: string;
    status: string;
    type?: string;
    isApproved: boolean;
}

export interface PropertyStats {
    name: string;
    avgRating: number;
    reviewCount: number;
    approvedCount: number;
}

export interface FilterOptions {
    property: string;
    channel: string;
    minRating: number;
    searchTerm: string;
    sortBy: 'date' | 'rating';
}