# TradeOps AI

**AI-powered FinTech operations dashboard for anomaly detection and trading-system monitoring.**

### 🚀 Live Demo

**[View Live Application](https://tradeops-vercel.vercel.app/)** · **[GitHub](https://github.com/Dhruv2604/Tradeops-AI-Dashboard)**

## What It Does

TradeOps AI monitors simulated trading operations and identifies unusual system behavior across transaction volume and latency, helping operations teams prioritize events that require investigation.

### Key Features

* **Anomaly Detection** using Isolation Forest
* Transaction-volume and latency monitoring
* Automated high-risk event identification
* Interactive performance analytics
* Real-time browser-based dashboard
* Responsive recruiter-facing interface

### ML Pipeline

```text
Trading Data
     ↓
Feature Processing
     ↓
Isolation Forest
     ↓
Anomaly Detection
     ↓
Risk Prioritization
     ↓
Interactive Dashboard
```

### Tech Stack

**Python · Pandas · NumPy · Scikit-learn · Isolation Forest · JavaScript · HTML/CSS · Chart.js · Vercel**

### Project Structure

```text
Tradeops-AI-Dashboard/
├── app.py              # ML implementation
├── requirements.txt
└── web/                # Vercel application
    ├── index.html
    ├── style.css
    └── script.js
```

### Why It Matters

Demonstrates how **unsupervised machine learning can convert operational data into actionable risk signals**, a practical use case for FinTech, analytics, and product operations.

## Future Scope

Real-time event streams, automated alerts, model monitoring, and integration with production trading infrastructure.
