# SIH 2026 PS 154 Backend | NexGen6

SIH26154 Backend built by the team **NexGen6** using **Node.js, Express, and MongoDB (Mongoose)**. This engine enables users to ingest multimodal source materials (Text, PDFs, Word documents, or Images) and simultaneously transform them into various tailored marketing, editorial, and executive outputs using the **Google Gemini API**.

The architecture strictly adheres to standard software engineering patterns, decoupling routing, controller logic, service execution, and database modeling.

---

##  Key Features & Capabilities

###  Authentication, Authorization & Security
*   **Secure Cookie-Based JWT:** Custom authentication flow utilizing HTTP-only cookies to mitigate XSS vulnerabilities.
*   **Database-Backed Role Verification:** Role checks (`admin` and `operator`) are actively queried against MongoDB in the `authMiddleware` to completely block client-side JWT role manipulation or privilege escalation.
*   **Administrative Control:** Admins can dynamically create isolated `operator` accounts with distinct role restrictions.
*   **Strict Cryptography & Sanitization:** Implements `bcrypt` for one-way password hashing, automated text trimming, email lowercasing, and enforces mandatory minimum password lengths. Passwords are strictly excluded from database responses.

###  Multimodal Content Submission Engine
*   **Diverse Ingestion Formats:** Natively processes **Text inputs, PDFs, DOCX files, and Images (JPEG, PNG, WEBP)**.
*   **One-to-Many Generation Pipeline:** Processes a single upload into multiple distinct outputs simultaneously (e.g., generating a LinkedIn Post, Twitter/X Thread, Policy Advisory, Infographic outline, Executive Summary, and Presentation deck in a single request).
*   **Dynamic Engineering Variables:** Supports fine-grained customization per submission:
    *   Target Audience
    *   Brand Tone & Language
    *   Detail Level & Communication Objective

###  Advanced Document & Image Processing
*   **In-Memory Buffer Handling:** Uses `Multer` memory storage to efficiently parse binary data without caching debris on the local server disk.
*   **Text Ingestion Engines:** Uses `pdf-parse` for automated PDF text extraction and `mammoth` for DOCX structural scraping.
*   **Native Vision Support:** Directly pipes image binary buffers via Base64 strings to Google Gemini's multimodal vision model. 
*   **Optimized Storage Model:** Keeps the MongoDB cluster lightweight by cataloging an `[IMAGE INPUT]` string placeholder rather than storing large raw binary assets.

###  Gemini API Security & Prompt Hardening
The core `generateContent()` service contains explicit structural counter-prompts to sanitize all user uploads before execution, hardening the system against:
*   **Prompt Injections:** Neutralizes instructions hidden maliciously inside user source materials.
*   **System Overrides:** Prevents inputs from attempting to wipe or override predefined application bounds.
*   **Credential/Leak Protection:** Actively blocks attempts to extract system prompts, configurations, or internal API keys.
*   **Formatting Rules:** Controls structural outputs to eliminate hallucinated information and suppress unwanted emoji usage.

###  API Guardrails & Reliability
*   **Rate Limiting:** Guarded via `express-rate-limit` to neutralize brute force and DDoS vectors:
    *   `Login Route`: Max 10 requests / 15 minutes / IP
    *   `Submission Route`: Max 20 requests / 15 minutes / IP (strategically placed *after* authentication to prevent anonymous IP spoofing).
*   **Fail-Safe Global Middlewares:** Catch-all Express middleware handles asynchronous propagation errors, automated Multer binary failures, missing authentication hooks (401), invalid permissions (403), and unexpected runtime errors (500).

---

##  Database Architecture & Audit Logging

The platform maintains strong entity schemas using **Mongoose References** across four primary data models:
*   **User:** Manages system credentials, security hooks, and roles (`admin`, `operator`).
*   **Submission:** Tracks global pipeline jobs. Status transitions sequentially through: `pending` ➔ `processing` ➔ `completed` ➔ `failed`.
*   **Output:** Isolated documents connected directly to an parent Submission ID tracking discrete outputs (`completed`, `failed`).
*   **Audit Log:** Immutable ledger recording system actions (`User ID`, `Action Name`, `Resource Type`, `Target Resource ID`, and a comprehensive JSON metadata `Details` field). **Strictly Admin-Only accessible.**

---

##  Installation & Setup

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB (Local instance or Atlas connection string)
*   Google Gemini API Key

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-content-engine
JWT_SECRET=your_super_secure_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/NexGen6/SIH26154-Backend.git
   cd SIH26154-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   # Production mode
   npm start
   
   # Development mode (with nodemon)
   npm run dev
   ```

---
