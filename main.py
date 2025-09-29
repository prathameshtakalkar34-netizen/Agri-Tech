from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production, specify your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database for demo
crops_db = []

# Pydantic model for Crop
class Crop(BaseModel):
    name: str
    type: str
    quantity: int  # in kg
    farmer_name: str

# Register a crop
@app.post("/register_crop")
def register_crop(crop: Crop):
    # Save crop to "database"
    crops_db.append(crop.dict())
    return {"message": "Crop registered successfully", "crop": crop}

# Get all crops
@app.get("/crops", response_model=List[Crop])
def get_crops():
    return crops_db
