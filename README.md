# 🏠 Flex Living - Reviews Dashboard

A modern, full-stack review management system for Flex Living properties.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/flex-living-dashboard)

## ✨ Features

- ✅ **Hostaway API Integration** - Fetch and normalize review data
- 📊 **Analytics Dashboard** - Real-time insights with interactive charts
- 🔍 **Advanced Filtering** - Filter by property, channel, rating, and search
- ✅ **Review Approval System** - Control which reviews appear publicly
- 🌐 **Public Display Page** - Beautiful property page with approved reviews
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast & Modern** - Built with Next.js 14 and Tailwind CSS

## 🚀 Quick Start
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: Recharts, Lucide Icons
- **Backend**: Next.js API Routes
- **Deployment**: Vercel

## 📁 Project Structure
```
flex-living-dashboard/
├── app/
│   ├── api/reviews/hostaway/    # API endpoints
│   ├── dashboard/               # Manager dashboard
│   ├── property/[id]/           # Public property page
│   └── page.tsx                 # Landing page
├── components/                  # Reusable components
├── lib/                         # Helper functions
├── types/                       # TypeScript interfaces
└── docs/                        # Documentation
```

## 🌐 Live Demo

- **Dashboard**: [https://your-app.vercel.app/dashboard](https://your-app.vercel.app/dashboard)
- **Public Page**: [https://your-app.vercel.app/property/shoreditch](https://your-app.vercel.app/property/shoreditch)
- **API**: [https://your-app.vercel.app/api/reviews/hostaway](https://your-app.vercel.app/api/reviews/hostaway)

## 📖 Documentation

Full documentation available in [`docs/DOCUMENTATION.md`](./docs/DOCUMENTATION.md)

## 🧪 API Testing
```bash
# Fetch all reviews
curl http://localhost:3000/api/reviews/hostaway

# With filters
curl "http://localhost:3000/api/reviews/hostaway?property=Shoreditch&minRating=8"

# Approve review
curl -X POST http://localhost:3000/api/reviews/hostaway \
  -H "Content-Type: application/json" \
  -d '{"reviewId": 1, "isApproved": true}'
```

## 🎯 Key Pages

### Manager Dashboard (`/dashboard`)
- View all reviews with filtering and sorting
- Approve/reject reviews
- Analytics with charts
- Property performance tracking

### Public Property Page (`/property/[id]`)
- Property showcase
- Approved guest reviews only
- Rating statistics
- Responsive design

### Landing Page (`/`)
- Feature overview
- Links to dashboard and demo

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Or use CLI:
```bash
npm i -g vercel
vercel --prod
```

## 🤖 AI Tool Used

**Claude AI (Anthropic)** was used to assist with development, architecture design, and problem-solving.

## 📄 License

MIT

## 👤 Author

[Javid Aslanov] - [cavidaslan23@gmail.com]

---

Built with ❤️ for Flex Living
```

---

### 1️⃣3️⃣ **.gitignore** (Yoxlayın, düzgün olsun)

`.gitignore` faylı:
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts