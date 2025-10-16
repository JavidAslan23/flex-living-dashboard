# Flex Living Reviews Dashboard - Documentation

## Overview
A comprehensive review management system for Flex Living properties with Hostaway API integration.

## Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless endpoints
- **Hostaway API** - Review data source

### Deployment
- **Vercel** - Cloud hosting

## Key Features

### 1. Manager Dashboard (`/dashboard`)
- Real-time analytics with charts
- Filter by property, channel, rating
- Search functionality
- Approve/reject reviews
- Sort by date or rating

### 2. Public Property Page (`/property/[id]`)
- Beautiful property showcase
- Only displays approved reviews
- Guest ratings and comments
- Responsive design

### 3. API Endpoints

#### GET `/api/reviews/hostaway`
Fetches and normalizes review data.

**Query Parameters:**
- `property` - Filter by property name
- `channel` - Filter by booking channel
- `minRating` - Minimum rating threshold

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "listingName": "Shoreditch Heights 2B N1",
      "guestName": "Shane Finkelstein",
      "rating": 10,
      "publicReview": "Amazing property!",
      "reviewCategory": [...],
      "submittedAt": "2024-10-10T14:30:00",
      "channel": "Airbnb",
      "isApproved": false
    }
  ],
  "count": 1,
  "meta": {
    "totalReviews": 8,
    "properties": [...],
    "channels": [...],
    "averageRating": "8.85"
  }
}
```

#### POST `/api/reviews/hostaway`
Updates review approval status.

**Request:**
```json
{
  "reviewId": 1,
  "isApproved": true
}
```

## Data Normalization

The API normalizes Hostaway data:
1. Calculates average rating from categories if main rating is null
2. Standardizes date formats
3. Adds approval status field
4. Handles missing channel information

## Google Reviews Integration

### Research Findings:
- Google Places API can fetch reviews
- Requires API key and Place ID
- Read-only access (cannot modify reviews)
- Rate limits apply
- Requires active Google My Business listing

### Implementation (if needed):
```typescript
// lib/google-reviews.ts
export async function fetchGoogleReviews(placeId: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${API_KEY}`
  );
  return response.json();
}
```

**Recommendation:** Focus on Hostaway; add Google Reviews as supplementary data.

## Design Decisions

### 1. Mock Data Strategy
Since Hostaway sandbox is empty, implemented fallback to comprehensive mock data matching real API structure.

### 2. State Management
Used React hooks (useState, useEffect) - appropriate for this application scope.

### 3. Responsive Design
Mobile-first approach with Tailwind breakpoints.

### 4. Real-time Updates
Instant UI feedback when approving/rejecting reviews.

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone [repository-url]
cd flex-living-dashboard

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev

# Open http://localhost:3000
```

### Deployment
```bash
# Deploy to Vercel
npm i -g vercel
vercel login
vercel --prod
```

## Testing

### Local Testing
```bash
# Test API endpoint
curl http://localhost:3000/api/reviews/hostaway

# With filters
curl "http://localhost:3000/api/reviews/hostaway?property=Shoreditch&minRating=8"

# Approve review
curl -X POST http://localhost:3000/api/reviews/hostaway \
  -H "Content-Type: application/json" \
  -d '{"reviewId": 1, "isApproved": true}'
```

## Future Enhancements
1. Database integration (MongoDB/PostgreSQL)
2. Authentication for manager dashboard
3. Email notifications for new reviews
4. AI sentiment analysis
5. Export functionality (CSV/PDF)
6. Multi-language support

## AI Tool Used
**Claude AI (Anthropic)** - Used for architecture design, code generation, and problem-solving.

## Contact
For questions: [your-email@example.com]

---
**Version:** 1.0.0  
**Last Updated:** October 2024