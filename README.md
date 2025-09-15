# 🌦️ Serverless Weather Alert System

A cloud-based application that monitors **real-time weather conditions** and automatically sends alerts (email/SMS) when critical thresholds like high temperature, heavy rainfall, or storms are exceeded.  
Built on a **serverless architecture** for scalability, cost-efficiency, and reliability.  

---

## 📋 Features
- ✅ Real-time weather monitoring using **OpenWeatherMap API**  
- ✅ Automated alerts via **AWS SNS** (Email/SMS)  
- ✅ Serverless backend powered by **AWS Lambda**  
- ✅ Historical weather data stored in **DynamoDB**  
- ✅ Interactive weather trends dashboard hosted on **Amazon S3**  
- ✅ Low-cost, highly scalable, and minimal maintenance  

---

## 🏗️ Architecture
```
Cloud Scheduler (EventBridge) → Lambda Function → DynamoDB  
                          ↘ Threshold Analysis → SNS Alerts (Email/SMS)  
Static Dashboard (S3) ← Historical Weather Data ← DynamoDB
```

---

## 📌 Use Cases
- 🌾 **Agriculture Monitoring** – Notify farmers of weather hazards  
- 🏫 **Campus Safety** – Send alerts to staff/students during storms  
- 🌪 **Disaster Management** – Early warnings for critical conditions  

---

## 🖥️ Tech Stack
| Component        | Technology          |
|------------------|-------------------|
| **Cloud Provider**| AWS               |
| **Language**      | Node.js           |
| **Database**      | DynamoDB          |
| **APIs/Services** | OpenWeatherMap, AWS SNS, EventBridge |
| **Frontend**      | HTML, CSS, JavaScript (Dashboard) |
| **Hosting**       | Amazon S3         |
| **Version Control**| GitHub           |

---

## 📊 Working Steps
1. **Lambda** fetches weather data from OpenWeatherMap.  
2. Data is stored in **DynamoDB** with timestamps.  
3. Analysis compares data with predefined thresholds.  
4. **AWS SNS** sends email/SMS alerts.  
5. Historical data is displayed on a **static S3 dashboard**.  

---

## 🧪 Testing
- Simulate different weather conditions by modifying thresholds.  
- Verify alerts via email or SMS.  
- Check DynamoDB for stored weather data.  
- Ensure the S3 dashboard reflects updated data trends.  

---

## 📚 References
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)  
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda)  
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3)  
a
