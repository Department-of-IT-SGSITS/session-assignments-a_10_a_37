// fetchWeather.js
const axios = require("axios");
const AWS = require("aws-sdk");
const { sendAlert } = require("./utils/alertSender");

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });

const API_KEY = "1e49651f5c1a2d093d630a35e5e5d359";
const CITY = "Indore";
const TABLE_NAME = "WeatherData";

// Thresholds
const HIGH_TEMP = 40;   
const LOW_TEMP = 5;     
const HIGH_WIND = 10;   
const RAINY_CONDITION = ["Rain", "Drizzle", "Thunderstorm"];

exports.handler = async () => {
  try {
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );
    const data = response.data;

    const item = {
      id: Date.now().toString(),
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      weather: data.weather[0].main,
      windSpeed: data.wind.speed,
      timestamp: new Date().toISOString(),
    };

    await dynamoDB
      .put({ TableName: TABLE_NAME, Item: item })
      .promise();

    console.log("Weather data saved:", item);

    if (item.temperature >= HIGH_TEMP) {
      console.log("🔥 High Temperature Alert!");
      await sendAlert(`High Temp Alert! ${CITY}: ${item.temperature}°C`, "+918815456914");
    } 
    if (item.temperature <= LOW_TEMP) {
      console.log("❄️ Low Temperature Alert!");
      await sendAlert(`Low Temp Alert! ${CITY}: ${item.temperature}°C`, "+918815456914");
    }
    if (item.windSpeed >= HIGH_WIND) {
      console.log("💨 High Wind Alert!");
      await sendAlert(`High Wind Alert! ${CITY}: ${item.windSpeed} m/s`, "+918815456914");
    }
    if (RAINY_CONDITION.includes(item.weather)) {
      console.log("☔ Rainy Day Alert!");
      await sendAlert(`Rainy Day Alert! ${CITY}: ${item.weather}`, "+918815456914");
    }

    return { statusCode: 200, body: JSON.stringify(item) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify(error.message) };
  }
};
