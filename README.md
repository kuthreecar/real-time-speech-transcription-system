# Real-Time Speech Transcription System

## Overview
This project is a web application that transcribes speech in real time using a backend speech-to-text (STT) model. The application streams audio input from the user's microphone, transcribes it using a Python-based FastAPI backend, and displays the transcribed text on a React frontend. The system is dockerized and deployable with Kubernetes.

## Features
- **Real-time speech transcription** using Whisper STT.
- **WebSocket communication** for seamless audio streaming and text updates.
- **User-friendly UI** built with React.
- **Backend in FastAPI** (Python) for processing audio and handling STT.
- **Dockerized and Kubernetes-ready** for scalable deployment.
- **Database integration** to store chat logs.

## Tech Stack
- **Frontend**: React, WebSockets
- **Backend**: FastAPI, Whisper STT, WebSockets
- **Database**: Mongodb
- **Deployment**: Docker, Kubernetes

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Docker & Docker Compose
- Kubernetes (Minikube or a cloud provider like GKE, EKS, AKS)
- Node.js & npm
- Python 3.9+

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```sh
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

### Docker Deployment
1. Build and run the backend:
   ```sh
   docker build -t backend-image .
   ```
2. Build and run the frontend:
   ```sh
   docker build -t frontend-image .
   ```
3. Run docker compose up
   ```sh
   docker-compose up
   ```

### Kubernetes Deployment

1. Navigate to the `kubernetes/manifests/` directory:
   ```sh
   cd kubernetes/manifests/

2. Run the following commands to deploy your services:
   ```sh
   kubectl apply -f .
   ```
   
3. Verify Deployments
   ```sh
   kubectl get pods
   kubectl get svc
   ```

4. Expose Frontend**
   If using Minikube:
   ```sh
   minikube service frontend --url
   ```

Your application should now be running in Kubernetes! 🚀

### Testing
- Open the frontend in a browser and click **Start Recording** to begin speech transcription.
- Ensure the backend logs show audio being processed.
- Stop recording to end the session.

## Screenshots
![Screenshot](./readme/screenshots.png)

## Challenges & Considerations
- **Latency**: WebSockets reduce latency compared to HTTP polling.
- **Scaling**: Kubernetes ensures multiple instances handle high traffic.
- **STT Accuracy**: Whisper performs well but may require fine-tuning.

## Contributing
Contributions are welcome! Fork the repo, make changes, and submit a pull request.

## License
MIT License

