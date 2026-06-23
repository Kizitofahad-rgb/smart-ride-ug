const express = require("express");
const cors = require("cors");

const tripRoutes = require("./routes/tripRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ============================
// OPERATORS (in-memory)
// ============================
const operators = [
  {
    id: "OP001",
    email: "admin@smartride.com",
    password: "123456",
    name: "Smart Ride Admin"
  }
];

// ============================
// TRIP HISTORY ROUTES
// ============================
app.use("/api/trips", tripRoutes);

// ============================
// ROUTE DATA (for bus simulation)
// ============================
const route = [
  { latitude: 0.3536, longitude: 32.5885 },
  { latitude: 0.3550, longitude: 32.5900 },
  { latitude: 0.3570, longitude: 32.5925 },
  { latitude: 0.3590, longitude: 32.5945 },
  { latitude: 0.3610, longitude: 32.5965 },
  { latitude: 0.3630, longitude: 32.5985 }
];

let busIndex = 0;

let bus = {
  id: "BUS001",
  name: "Smart Ride Bus 01",
  latitude: route[0].latitude,
  longitude: route[0].longitude,
  speed: 42,
  passengers: 0,
  status: "active"
};

// ============================
// MULTIPLE PASSENGERS
// ============================
let passengers = [
  {
    id: "P001",
    name: "Passenger 01",
    latitude: 0.3560,
    longitude: 32.5910,
    status: "waiting"
  },
  {
    id: "P002",
    name: "Passenger 02",
    latitude: 0.3580,
    longitude: 32.5930,
    status: "waiting"
  },
  {
    id: "P003",
    name: "Passenger 03",
    latitude: 0.3545,
    longitude: 32.5895,
    status: "waiting"
  }
];

// Initialize bus passenger count based on initial onboard passengers
bus.passengers = passengers.filter(p => p.status === "onboard").length;

// ============================
// OPERATOR LOGIN ENDPOINT
// ============================
app.post("/api/operator/login", (req, res) => {
  console.log("LOGIN DATA RECEIVED:");
  console.log(req.body);

const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  const operator = operators.find(
    op => op.email === email && op.password === password
  );

  if (!operator) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  // Return operator info (excluding password)
  const { password: _, ...operatorWithoutPassword } = operator;
  res.json({
    success: true,
    operator: operatorWithoutPassword
  });
});

// ============================
// BUS API
// ============================
app.get("/api/bus", (req, res) => {
  res.json(bus);
});

// ============================
// PASSENGER APIs (compatibility + new)
// ============================

// GET /api/passenger – for backward compatibility; returns the first passenger
app.get("/api/passenger", (req, res) => {
  if (passengers.length === 0) {
    return res.status(404).json({ error: "No passengers found" });
  }
  res.json(passengers[0]);
});

// GET /api/passengers – returns all passengers
app.get("/api/passengers", (req, res) => {
  res.json(passengers);
});

// POST /api/passenger/:id/board
app.post("/api/passenger/:id/board", (req, res) => {
  const { id } = req.params;
  const passenger = passengers.find(p => p.id === id);

  if (!passenger) {
    return res.status(404).json({ error: "Passenger not found" });
  }

  if (passenger.status !== "waiting") {
    return res.status(400).json({
      error: `Passenger is not waiting (current status: ${passenger.status})`
    });
  }

  passenger.status = "onboard";
  bus.passengers += 1;

  res.status(200).json({
    message: "Passenger boarded successfully",
    passenger,
    bus: { id: bus.id, passengers: bus.passengers }
  });
});

// POST /api/passenger/:id/leave
app.post("/api/passenger/:id/leave", (req, res) => {
  const { id } = req.params;
  const passenger = passengers.find(p => p.id === id);

  if (!passenger) {
    return res.status(404).json({ error: "Passenger not found" });
  }

  if (passenger.status !== "onboard") {
    return res.status(400).json({
      error: `Passenger is not onboard (current status: ${passenger.status})`
    });
  }

  if (bus.passengers <= 0) {
    return res.status(400).json({
      error: "Cannot leave: no passengers on bus"
    });
  }

  passenger.status = "completed";
  bus.passengers -= 1;

  res.status(200).json({
    message: "Passenger left successfully",
    passenger,
    bus: { id: bus.id, passengers: bus.passengers }
  });
});

// ============================
// SIMULATE GPS MOVEMENT
// ============================
setInterval(() => {
  busIndex++;
  if (busIndex >= route.length) {
    busIndex = 0;
  }

  bus.latitude = route[busIndex].latitude;
  bus.longitude = route[busIndex].longitude;
  bus.speed = 35 + Math.floor(Math.random() * 15);

  fetch("http://localhost:5000/api/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      location: {
        latitude: bus.latitude,
        longitude: bus.longitude
      }
    })
  }).catch(() => {});
}, 3000);

app.listen(5000, () => {
  console.log("Smart Ride backend running on port 5000");
});