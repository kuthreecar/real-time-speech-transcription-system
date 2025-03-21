# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file
COPY requirements.txt ./

# Install dependencies
RUN apt-get update
RUN pip install --no-cache-dir ffmpeg-python
RUN apt-get install -y ffmpeg
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend source code into the container
COPY . .

# Expose the application port
EXPOSE 8000

# Run the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
