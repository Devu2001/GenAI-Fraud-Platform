# GenAI CyberGuard: Hybrid GAN + VAE Fraud Detection Platform

## 🛡️ MCA Major Project - Final Year

GenAI CyberGuard is an enterprise-grade fraud detection framework designed to identify sophisticated financial threats in real-time. By combining **Generative Adversarial Networks (GANs)** for synthetic data generation and **Variational Autoencoders (VAEs)** for zero-day anomaly detection, the platform solves the "imbalanced data" problem inherent in financial fraud.

## 🚀 Key Features
- **Real-Time Detection**: Sub-millisecond inference using a FastAPI + WebSocket pipeline.
- **Hybrid AI Architecture**: Uses VAEs to learn "normal" behavior and flag anomalies based on reconstruction error.
- **GAN Data Hub**: Generates synthetic fraud samples to retrain and fortify detection models.
- **Interactive Dashboard**: Features 3D Network Graphs, Geo-Spatial Mapping, and Live Threat Feeds.
- **Evaluator FAQ**: A dedicated page built to address common technical questions during project defense.

## 🛠️ Tech Stack
- **Frontend**: Next.js 16 (React), Tailwind CSS (Vanilla CSS focus), Lucide Icons, Leaflet.js.
- **Backend**: FastAPI (Python), PyTorch (Deep Learning), SQLAlchemy.
- **Database**: PostgreSQL (Production) / SQLite (Local).
- **Deployment**: Docker, Railway / Vercel.

## 📁 Project Structure
- `/frontend`: Next.js web application.
- `/backend`: FastAPI server and PyTorch ML models.

## 🔧 Installation & Local Setup

### Backend
1. `cd backend`
2. `python -m venv venv`
3. `source venv/bin/activate`  # Windows: venv\Scripts\activate
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---
**Designed & Developed for MCA Major Project Defense.**
