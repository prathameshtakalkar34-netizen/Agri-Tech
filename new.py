from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from PIL import Image
import random

app = FastAPI()

# Allow frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
async def upload_image(image: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, image.filename)

    # Save file
    with open(file_path, "wb") as f:
        f.write(await image.read())

    # Simulated analysis (replace with ML model)
    diseases = [
        "Leaf Spot Disease",
        "Powdery Mildew",
        "Rust Infection",
        "Healthy Plant"
    ]
    analysis_result = random.choice(diseases)

    return JSONResponse({
        "message": f"Image {image.filename} uploaded successfully ✅",
        "analysis": analysis_result
    })
