require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //croos-origin resource sharing
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

const Survey = require("./models/Survey");

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting
app.set("trust proxy", 1);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/neighborfit",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// --- API Endpoints ---

// Mock neighborhood data
// const neighborhoods = require('./mock/neighborhoods');

// Submit survey and get match
app.post("/api/submit", async (req, res) => {
  try {
    const surveyData = req.body;
    // Save to MongoDB
    const survey = new Survey(surveyData);
    await survey.save();

    // Call Python service for matching
    const matchRes = await axios.post(
      "http://localhost:8000/match",
      surveyData
    );
    res.json({ success: true, results: matchRes.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// // Direct match endpoint
// app.post("/api/match", async (req, res) => {
//   try {
//     const matchRes = await axios.post("http://localhost:8000/match", req.body);
//     res.json(matchRes.data);
//   } catch (err) {
//     res.status(500).json({ error: "Matching service error" });
//   }
// });

// // Get all neighborhoods
// app.get("/api/neighborhoods", (req, res) => {
//   res.json(neighborhoods);
// });

// Analytics for dashboard
app.get("/api/analytics", async (req, res) => {
  try {
    // Read data.csv from python-service directory
    const dataPath = path.join(__dirname, "../python-service/data.csv");
    const results = [];
    fs.createReadStream(dataPath)
      .pipe(csv())
      .on("data", (row) => {
        // Convert numeric fields
        row.Price = parseFloat(row.Price) || 0;
        row["Total_Area(SQFT)"] = parseFloat(row["Total_Area(SQFT)"]) || 0;
        row.BHK = parseInt(row.BHK) || 0;
        results.push(row);
      })
      .on("end", async () => {
        // Calculate analytics for properties
        const totalProperties = results.length;
        const avgPrice = totalProperties
          ? Math.round(
              results.reduce((sum, r) => sum + r.Price, 0) / totalProperties
            )
          : 0;
        const avgArea = totalProperties
          ? Math.round(
              results.reduce((sum, r) => sum + r["Total_Area(SQFT)"], 0) /
                totalProperties
            )
          : 0;
        const propertyTypeCounts = {};
        const cityCounts = {};
        results.forEach((r) => {
          propertyTypeCounts[r.property_type] =
            (propertyTypeCounts[r.property_type] || 0) + 1;
          cityCounts[r.city] = (cityCounts[r.city] || 0) + 1;
        });
        const topPropertyType =
          Object.entries(propertyTypeCounts).sort(
            (a, b) => b[1] - a[1]
          )[0]?.[0] || "N/A";
        const topCities = Object.entries(cityCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([city, count]) => ({ city, count }));

        // --- Survey Insights ---
        const surveys = await Survey.find({});
        const surveyCount = surveys.length;
        // Most valued factors (average priority)
        const priorities = [
          "safety",
          "affordability",
          "cleanliness",
          "commute",
          "greenery",
          "nightlife",
        ];
        const avgPriorities = {};
        priorities.forEach((p) => {
          avgPriorities[p] = surveyCount
            ? surveys.reduce((sum, s) => sum + (s[p] || 0), 0) / surveyCount
            : 0;
        });
        // Most common vibe
        const vibeCounts = {};
        surveys.forEach((s) => {
          if (s.vibe) vibeCounts[s.vibe] = (vibeCounts[s.vibe] || 0) + 1;
        });
        const topVibe =
          Object.entries(vibeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
          "N/A";
        // Most common disappointments (lowest priorities)
        const disappointmentCounts = {};
        surveys.forEach((s) => {
          let minVal = 5;
          let minKey = "";
          priorities.forEach((p) => {
            if ((s[p] || 0) < minVal) {
              minVal = s[p];
              minKey = p;
            }
          });
          if (minKey)
            disappointmentCounts[minKey] =
              (disappointmentCounts[minKey] || 0) + 1;
        });
        const topDisappointments = Object.entries(disappointmentCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 2)
          .map(([factor, count]) => ({ factor, count }));
        // Tool interest rates (survey count by day)
        const interestByDay = {};
        surveys.forEach((s) => {
          const day = s.createdAt.toISOString().slice(0, 10);
          interestByDay[day] = (interestByDay[day] || 0) + 1;
        });
        const interestTrend = Object.entries(interestByDay)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([day, count]) => ({ day, count }));

        res.json({
          totalProperties,
          avgPrice,
          avgArea,
          topPropertyType,
          topCities,
          surveyCount,
          avgPriorities,
          topVibe,
          topDisappointments,
          interestTrend,
        });
      });
  } catch (err) {
    res.status(500).json({ error: "Analytics error" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// New lifestyle survey endpoint
app.post("/api/survey", async (req, res) => {
  try {
    const surveyData = req.body;
    const survey = new Survey(surveyData);
    await survey.save();
    // Call Python service for neighborhood matching
    const matchRes = await axios.post(
      "http://localhost:8000/match",
      surveyData
    );
    res.json(matchRes.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
