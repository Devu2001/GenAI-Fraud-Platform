from fastapi import FastAPI, WebSocket, Depends, UploadFile, File, HTTPException
import pandas as pd
import io
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from database import engine, get_db
import models
import auth
import ml_models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="GenAI Fraud Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://endearing-sorbet-a4f0c0.netlify.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/auth/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username, "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "role": user.role}

# Helper to seed database on startup if empty
def seed_db(db: Session):
    # Seed Users
    if db.query(models.User).count() == 0:
        admin = models.User(
            username="admin",
            hashed_password=auth.get_password_hash("admin123"),
            role="Admin"
        )
        analyst = models.User(
            username="analyst",
            hashed_password=auth.get_password_hash("analyst123"),
            role="Analyst"
        )
        db.add(admin)
        db.add(analyst)
        db.commit()

    if db.query(models.Transaction).count() == 0:
        for _ in range(50):
            amount = round(random.uniform(10.0, 5000.0), 2)
            lat = random.uniform(-90, 90)
            lng = random.uniform(-180, 180)
            
            # Use real ML inference for seeding
            risk_score, is_fraud = ml_models.inference_anomaly_score(amount, lat, lng)
            
            txn = models.Transaction(
                id=f"txn_{random.randint(100000, 999999)}",
                amount=amount,
                risk_score=risk_score,
                is_anomaly=is_fraud,
                location_lat=lat,
                location_lng=lng
            )
            db.add(txn)
        
        for i in range(30):
            date_str = (datetime.now() - timedelta(days=29 - i)).strftime("%b %d")
            fraud_count = random.randint(10, 50) if i != 20 else 120
            analytics = models.DailyAnalytics(
                date=date_str,
                fraud_count=fraud_count,
                prevented_loss=fraud_count * random.uniform(500, 2000)
            )
            db.add(analytics)
        db.commit()

@app.on_event("startup")
def on_startup():
    db = next(get_db())
    seed_db(db)

@app.get("/api/transactions")
def get_transactions(limit: int = 50, db: Session = Depends(get_db)):
    txns = db.query(models.Transaction).order_by(models.Transaction.timestamp.desc()).limit(limit).all()
    # Convert to dict for JSON serialization
    result = []
    for t in txns:
        result.append({
            "id": t.id,
            "amount": t.amount,
            "timestamp": t.timestamp.isoformat(),
            "risk_score": t.risk_score,
            "is_anomaly": t.is_anomaly,
            "location_lat": t.location_lat,
            "location_lng": t.location_lng
        })
    return {"transactions": result}

@app.get("/api/transactions/{txn_id}/xai")
def get_xai_details(txn_id: str):
    return {
        "txn_id": txn_id,
        "features": {
            "amount_deviation": random.uniform(0.5, 0.9),
            "location_mismatch": random.uniform(0.6, 0.95),
            "time_anomaly": random.uniform(0.4, 0.8),
            "velocity_check": random.uniform(0.7, 0.99)
        },
        "recommendation": "Block transaction and alert user"
    }

@app.post("/api/gan/generate")
async def generate_synthetic_data(num_samples: int = 10, current_user: dict = Depends(auth.get_current_user)):
    if current_user.get("role") != "Admin":
        raise HTTPException(status_code=403, detail="Only Admins can generate data")
    
    # Use real PyTorch GAN Generator
    await asyncio.sleep(1) # Simulate processing
    data = ml_models.generate_synthetic_fraud(num_samples)
    return {"status": "success", "samples_generated": num_samples, "data": data}

@app.get("/api/analytics")
def get_analytics(db: Session = Depends(get_db)):
    history = db.query(models.DailyAnalytics).all()
    result = []
    for h in history:
        result.append({
            "date": h.date,
            "fraud_count": h.fraud_count,
            "prevented_loss": h.prevented_loss
        })
    return {"history": result}

@app.get("/api/system/health")
def get_system_health():
    return {
        "cpu_usage": round(random.uniform(40.0, 85.0), 1),
        "ram_usage": round(random.uniform(60.0, 92.0), 1),
        "gpu_usage": round(random.uniform(75.0, 98.0), 1),
        "active_models": ["GAN_v2.1", "VAE_Anomaly_v3"]
    }

@app.post("/api/evaluate-csv")
async def evaluate_csv(file: UploadFile = File(...), current_user: dict = Depends(auth.get_current_user)):
    if current_user.get("role") != "Admin":
        raise HTTPException(status_code=403, detail="Only Admins can evaluate batches")
    contents = await file.read()
    try:
        # Decode contents to string and read with pandas
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        
        results = []
        for index, row in df.iterrows():
            amount = float(row.get('amount', random.uniform(10.0, 5000.0)))
            lat = float(row.get('location_lat', random.uniform(-90, 90)))
            lng = float(row.get('location_lng', random.uniform(-180, 180)))
            
            # Use real ML inference for batch evaluation
            risk_score, is_fraud = ml_models.inference_anomaly_score(amount, lat, lng)
            
            results.append({
                "id": f"batch_{index}_{random.randint(1000,9999)}",
                "amount": amount,
                "risk_score": risk_score,
                "is_anomaly": is_fraud,
                "location_lat": lat,
                "location_lng": lng
            })
            
        return {"status": "success", "evaluated_records": len(results), "data": results}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.websocket("/ws/transactions")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    db = next(get_db())
    try:
        while True:
            await asyncio.sleep(random.uniform(0.5, 3.0))
            # Real-world simulation parameters
            amount = round(random.uniform(5.0, 8000.0), 2)
            lat = random.uniform(30, 50) if random.random() < 0.3 else random.uniform(-90, 90)
            lng = random.uniform(-10, 20) if random.random() < 0.3 else random.uniform(-180, 180)

            # Use REAL PyTorch VAE Inference
            risk_score, is_fraud = ml_models.inference_anomaly_score(amount, lat, lng)

            txn_id = f"txn_{random.randint(100000, 999999)}"
            txn = models.Transaction(
                id=txn_id,
                amount=amount,
                risk_score=risk_score,
                is_anomaly=is_fraud,
                location_lat=lat,
                location_lng=lng
            )
            db.add(txn)
            db.commit()

            msg = {
                "id": txn.id,
                "amount": txn.amount,
                "timestamp": txn.timestamp.isoformat(),
                "risk_score": txn.risk_score,
                "is_anomaly": txn.is_anomaly,
                "location_lat": txn.location_lat,
                "location_lng": txn.location_lng
            }
            await websocket.send_text(json.dumps(msg))
    except Exception as e:
        print(f"WebSocket Error: {e}")
