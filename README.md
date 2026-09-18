# THE SMART MODERN PUBLIC SCHOOL QAMBER
## School Management System (Demo / Frontend)

A complete, modern, fully responsive School Management System built with **HTML5, CSS3, Vanilla JavaScript, Bootstrap 5, Chart.js, and LocalStorage**.

> **DEMO ONLY** — Authentication and data persistence use browser LocalStorage.  
> Do not store real passwords or sensitive production data.  
> Designed to be easily connected to Firebase, Supabase, or MySQL later.

---

## Features

- Role-based login (Admin, Principal, Teacher, Accountant, Staff)
- Dashboard with live stats & Chart.js charts
- Student, Teacher, Staff, Parent management (CRUD)
- Classes, Sections, Subjects
- Attendance marking (Present / Absent / Leave)
- Fee collection, receipts, pending fees
- Admissions workflow
- Homework, Exams, Results
- Notices & Notifications
- Leave management
- Reports & CSV export
- Settings (school profile, session, currency)
- Fully responsive (mobile / tablet / desktop)
- Print-friendly receipts & profiles

---

## Demo Credentials

| Role        | Username    | Password      |
|-------------|-------------|---------------|
| Admin       | admin       | admin123      |
| Principal   | principal   | principal123  |
| Teacher     | teacher1    | teacher123    |
| Accountant  | accountant  | account123    |
| Staff       | staff1      | staff123      |

All accounts are clearly marked as **DEMO**. Passwords are stored in plain text only for this demo.

---

## Project Structure

```
school-management-system/
├── index.html              # Redirects to login or dashboard
├── login.html
├── dashboard.html
├── students.html
├── student-profile.html
├── teachers.html
├── staff.html
├── parents.html
├── classes.html
├── subjects.html
├── attendance.html
├── timetable.html
├── homework.html
├── exams.html
├── results.html
├── fees.html
├── fee-receipt.html
├── admissions.html
├── leaves.html
├── notices.html
├── notifications.html
├── reports.html
├── settings.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── print.css
├── js/
│   ├── storage.js          # LocalStorage data layer + demo data
│   ├── auth.js             # Login, roles, permissions
│   ├── app.js              # Sidebar, topbar, toasts, helpers
│   ├── dashboard.js
│   ├── students.js
│   ├── teachers.js
│   ├── attendance.js
│   ├── fees.js
│   └── modules.js          # Other modules
└── assets/
```

---

## How to Run Locally

1. Download or clone the project folder.
2. Open `index.html` or `login.html` in a modern browser (Chrome, Firefox, Edge, Safari).
3. Or use a local server (recommended):

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .

# VS Code Live Server extension
```

4. Visit `http://localhost:8080`
5. Login with any demo account above.

**Note:** LocalStorage data is stored per browser/domain. Clearing site data resets the demo.

---

## How to Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload the entire `school-management-system` folder contents to the root (or `/docs`).
3. Go to **Settings → Pages**.
4. Source: Deploy from branch `main` (or `master`), folder `/` (or `/docs`).
5. Save. After a minute your site will be live at:
   `https://YOUR_USERNAME.github.io/REPO_NAME/`

---

## Connecting a Real Backend Later

### Option A — Firebase

1. Create a Firebase project and enable Authentication + Firestore.
2. Replace `storage.js` functions (`getData`, `saveData`, etc.) with Firestore calls.
3. Replace `auth.js` login with Firebase Auth (`signInWithEmailAndPassword`).
4. Keep the same UI and permission matrix.

### Option B — Supabase

1. Create a Supabase project.
2. Map each LocalStorage collection to a Postgres table.
3. Use Supabase JS client for CRUD and Auth.
4. Row Level Security (RLS) can enforce the role permissions.

### Option C — MySQL + PHP/Node API

1. Create REST endpoints matching the collection names.
2. Replace LocalStorage with `fetch()` calls.
3. Use JWT or session cookies for authentication.
4. Hash passwords with bcrypt on the server.

The modular design (`storage.js` as the single data access layer) makes backend swap straightforward.

---

## Architecture Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  HTML Pages │────▶│  app.js      │────▶│  storage.js     │
│  (Views)    │     │  (UI helpers)│     │  (Data layer)   │
└─────────────┘     └──────────────┘     └─────────────────┘
       │                   │                       │
       │            ┌──────┴──────┐                │
       │            │  auth.js    │                │
       │            │  (Roles)    │                │
       │            └─────────────┘                │
       │                                           ▼
       │                                  LocalStorage
       │                                  (Demo only)
       ▼
  Bootstrap 5 + Chart.js + Font Awesome
```

- **storage.js** — single source of truth for all data operations.
- **auth.js** — login, session, role permission matrix.
- **app.js** — shared layout (sidebar, topbar), toasts, modals, CSV export, formatting.
- Each feature page has its own script (or uses `modules.js`).

---

## Security Notes (Demo)

- Never collect real passwords from users.
- Never store card numbers, CVV, or banking credentials.
- This frontend demo uses plain-text passwords for convenience only.
- When adding a backend: hash passwords, use HTTPS, validate on server, implement proper sessions/JWT.

---

## Browser Support

Chrome, Firefox, Safari, Edge (latest 2 versions).  
Requires JavaScript enabled and LocalStorage support.

---

## License

Built for **THE SMART MODERN PUBLIC SCHOOL QAMBER** as a demonstration project.  
Free to use and extend for educational purposes.

---

**School:** THE SMART MODERN PUBLIC SCHOOL QAMBER  
**Location:** Qamber, Pakistan  
**Session (demo):** 2026–2027
