# 🏠 Smart Housing Finder

Fullstack platform that aggregates rental listings across German cities with AI-powered cover letter generation.

## Features

- 🔍 **Real-time scraping** from Kleinanzeigen across 4 cities (Chemnitz, Leipzig, Dresden, Berlin)
- 🔎 **Filtering** by city, price range, and number of rooms
- ✨ **AI cover letter generation** via Groq API (Llama 3.3)
- ❤️ **Favorites system** with user authentication
- 🔐 **JWT authentication** with bcrypt password hashing

## Tech Stack

**Backend:** Node.js, Express, PostgreSQL, Puppeteer, JWT, bcrypt  
**Frontend:** React, CSS3  
**AI:** Groq API (Llama 3.3-70b)  
**Tools:** Git, Nodemon

## Architecture
```
smart-housing-finder/
├── backend/
│   ├── src/
│   │   ├── config/      # Database connection
│   │   ├── models/      # SQL queries
│   │   ├── routes/      # REST API endpoints
│   │   ├── scraper/     # Puppeteer scrapers
│   │   └── middleware/  # JWT auth middleware
└── frontend/
    └── src/
        ├── components/  # React components
        └── api/         # API layer
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/listings` | Get listings with filters |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/favorites` | Get user favorites |
| POST | `/api/favorites/:id` | Add to favorites |
| DELETE | `/api/favorites/:id` | Remove from favorites |
| POST | `/api/ai/generate-response` | Generate AI cover letter |

## Getting Started
```bash
# Backend
cd backend
npm install
# Add .env file with DB credentials and API keys
npm run dev

# Frontend
cd frontend
npm install
npm start
```
