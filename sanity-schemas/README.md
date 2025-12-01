# Sanity Schemas for Anarres FM

Copy these schemas to your Sanity Studio to enable CMS-powered content.

## Setup

### 1. Copy Schema Files

Copy `scheduleDay.ts` to your Sanity Studio's `schemas/` directory.

### 2. Register the Schema

In your Sanity Studio's `schemas/index.ts`:

```typescript
import scheduleDay from './scheduleDay'

export const schemaTypes = [
  // ... your existing schemas
  scheduleDay,
]
```

### 3. Deploy Changes

```bash
cd your-sanity-studio
npx sanity deploy
```

### 4. Create Schedule Data

In your Sanity Studio:

1. Go to **Schedule Day** in the sidebar
2. Create 7 documents (one for each day):

| Day | dayId | dayName | dayOrder |
|-----|-------|---------|----------|
| Monday | `monday` | Monday | 0 |
| Tuesday | `tuesday` | Tuesday | 1 |
| Wednesday | `wednesday` | Wednesday | 2 |
| Thursday | `thursday` | Thursday | 3 |
| Friday | `friday` | Friday | 4 |
| Saturday | `saturday` | Saturday | 5 |
| Sunday | `sunday` | Sunday | 6 |

3. Add broadcasts to each day with:
   - **Time Slot**: Format `HH:MM - HH:MM` (e.g., `18:00 - 21:00`)
   - **Show Title**: Name of the show
   - **Is Live Show?**: Toggle for live DJ shows
   - **Producer/DJ**: (Only for live shows) DJ name
   - **Mixcloud URL**: (Only for live shows) Link to Mixcloud
   - **Genre Tags**: (Only for playlists) Comma-separated genres

## Fallback Behavior

The frontend will **automatically fall back** to the static schedule in `src/data/schedule.ts` if:
- Sanity is unreachable
- No schedule data exists in Sanity
- API request fails

This ensures the site always works even if Sanity is down.

## CORS Configuration

Make sure your Sanity project allows requests from your frontend URL:

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to **API** → **CORS origins**
4. Add your frontend URLs:
   - `http://localhost:8080` (development)
   - `https://yourdomain.com` (production)

