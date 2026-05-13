from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from database import Base
import datetime

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, index=True)
    amount = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    risk_score = Column(Float)
    is_anomaly = Column(Boolean, default=False)
    location_lat = Column(Float, nullable=True)
    location_lng = Column(Float, nullable=True)

class DailyAnalytics(Base):
    __tablename__ = "daily_analytics"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, unique=True, index=True)
    fraud_count = Column(Integer, default=0)
    prevented_loss = Column(Float, default=0.0)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="Analyst") # Admin or Analyst
