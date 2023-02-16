# Base image
FROM python:3.8-slim-buster

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY . /app/
COPY requirements.txt /app/

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "main.py"]