# Base image
FROM python:3.8-slim-buster

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY . /app/
COPY requirements.txt /app/

RUN pip install -r requirements.txt
RUN pip install gunicorn

EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "--timeout", "60000", "main:app"]
