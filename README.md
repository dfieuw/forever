# Forever — Darci & Kris

A proposal website. 💍

## Quick Setup

### 1. Add Your Photos
Drop images into the `images/` folder with these exact filenames:

**Hero & Timeline:**
| Filename | Description |
|----------|-------------|
| `hero.jpg` | Main couple photo (hero background) |
| `timeline-met.jpg` | Early photo / when you met |
| `timeline-first-date.jpg` | First date at Cucina |
| `timeline-official.jpg` | March 18 — official day |
| `timeline-camping.jpg` | Camping adventure |
| `timeline-rafting.jpg` | River rafting in Alpine, WY |
| `timeline-belgium-1.jpg` | Belgium trip |
| `timeline-concert-1.jpg` | Concert together |
| `timeline-vegas-1.jpg` | Las Vegas |
| `timeline-datenight.jpg` | Friday date night |
| `timeline-moved-in.jpg` | Moving in / your home |
| `timeline-future.jpg` | A beautiful photo of you two |

**Gallery (20 slots):**
`gallery-01.jpg` through `gallery-20.jpg`
- Mix of portrait and landscape
- Wide photos work great for `gallery-01`, `gallery-07`, `gallery-12`, `gallery-19`
- Tall/portrait photos work great for `gallery-04`, `gallery-09`, `gallery-15`

**Memories:**
| Filename | Description |
|----------|-------------|
| `memory-camping.jpg` | Camping photo |
| `memory-concert.jpg` | Concert photo |
| `memory-vegas.jpg` | Vegas photo |
| `memory-datenight.jpg` | Date night photo |
| `memory-belgium.jpg` | Belgium photo |
| `memory-rafting.jpg` | Rafting photo |
| `memory-home.jpg` | Home / everyday photo |
| `memory-adventure.jpg` | Any adventure photo |

**Special:**
| Filename | Description |
|----------|-------------|
| `celebration.jpg` | Photo shown after she says yes! |

**Total: 42 photo slots**

### 2. Add Music
Drop an MP3 file into `music/` named `song.mp3`.

Song suggestions (not country!):
- "At Last" — Etta James
- "I Choose You" — Sara Bareilles
- "Everywhere" — Fleetwood Mac
- "Come Away With Me" — Norah Jones
- "Can't Help Falling in Love" — Haley Reinhart cover
- "Lover" — Taylor Swift

### 3. Update Countdown Date
In `js/main.js`, find the CONFIG section and change the countdown date:
```js
countdownDate: new Date(2026, 7, 1, 18, 0), // Month is 0-indexed! (7 = August)
```

### 4. Update Map Locations
In `js/main.js`, update the `mapLocations` coordinates to your actual locations.
Use Google Maps to find coordinates (right-click any spot → "What's here?").

### 5. Password
Default password: `marketplace`
To change it, edit `CONFIG.password` in `js/main.js`.

## Deploy to GitHub Pages

```bash
cd forever
git init
git add .
git commit -m "Initial commit"
gh repo create forever --public --source=. --push
```

Then go to **Settings → Pages → Source → Deploy from branch → main → / (root) → Save**

Your site will be live at: `https://dfieuw.github.io/forever`

## Photo Tips
- Compress images before adding (use tinypng.com or squoosh.app)
- Aim for ~200-500KB per image max
- Hero image can be larger (~1MB) since it's the first thing people see
- JPG format works best for photos
