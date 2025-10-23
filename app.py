from flask import Flask, jsonify, request, render_template
import requests
import os
from dotenv import load_dotenv

# Initialize Flask app instance
app = Flask(__name__)

load_dotenv()
api_key = os.getenv("OPENWEATHER_API_KEY")
print("Loaded API Key:", api_key)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/weather")
def get_weather():
    city = request.args.get("city")
    api_key = os.getenv("OPENWEATHER_API_KEY")
    
    # Current-weather endpoint
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()
    
    return jsonify(data)

@app.route("/api/forecast")
def get_forecast():
    city = request.args.get("city")
    api_key = os.getenv("OPENWEATHER_API_KEY")

    # Forecast endpoint
    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
