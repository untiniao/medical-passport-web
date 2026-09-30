# Medical Passport Web

React + Tailwind app to sign in with email/password and view a Firestore `passports` document for the signed-in user.

## Run locally

```bash
npm install
npm run dev
```

Open the shown localhost URL, choose a language, and sign in with the same Firebase Auth account used by the mobile app.

## Data

Firestore collection `passports`, document id = Auth `uid`.

Fields: `name`, `blood`, `allergy`, `meds`, `history`, `contact`, `contactName`, `uid`, `updatedAt`.
