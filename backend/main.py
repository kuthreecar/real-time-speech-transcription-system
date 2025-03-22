from fastapi import FastAPI, WebSocket
import whisper
import uvicorn
import os
import json
import ssl
import warnings
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

# Suppress specific warning
warnings.filterwarnings("ignore", message="FP16 is not supported on CPU; using FP32 instead")

ssl._create_default_https_context = ssl._create_unverified_context
app = FastAPI()
model = whisper.load_model("base")  # Load Whisper STT model

# MongoDB setup
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "chat_logs"
COLLECTION_NAME = "logs"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

clients = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_bytes()
            transcript = await transcribe_audio(data)
            response = {"transcript": transcript, "timestamp": datetime.utcnow().isoformat()}
            
            # Save to MongoDB
            await collection.insert_one(response)
            
            for client in clients:
                await client.send_text(json.dumps(response))
    except Exception as e:
        print("WebSocket error:", e)
    finally:
        clients.remove(websocket)

async def transcribe_audio(audio_data: bytes) -> str:
    """Transcribes audio using Whisper."""
    with open("temp.wav", "wb") as f:
        f.write(audio_data)
    result = model.transcribe("temp.wav")
    os.remove("temp.wav")
    return result["text"]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
