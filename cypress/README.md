# 🎯 Cypress Test Automation – 2025 EIWA Championship Page

This project automates UI validation and functional test scenarios for the [2025 EIWA Championship](https://www.flowrestling.org/events/12932757-2025-eiwa-championship) page using Cypress.

> **Objective:** Ensure the page loads properly, navigates through tabs, applies filters, performs search, and streams videos.  
> **Pattern Used:** Page Object Model (POM) for cleaner, reusable code.  
> **Extra:** Intercepts and workarounds used to bypass heavy third-party scripts/ads to stabilize tests.

---

## 🧪 Test Scenarios

### 1️⃣ Basic Page Load and UI Checks
- ✅ Page title contains "2025 EIWA Championship"
- ✅ Event banner is visible
- ✅ Event date is displayed

### 2️⃣ Navigation & Tab Validation
- ✅ Tabs: Results, News, Schedule, Videos
- ✅ URLs and content update per tab

### 3️⃣ Event Filters Testing
- ✅ Filter by Team, Weight Class, Round
- ✅ URL updates with query params
- ✅ Clear All resets filters

### 4️⃣ Search Functionality
- ✅ Search matches wrestler names
- ✅ Handles "no results found" gracefully

### 5️⃣ Bonus 🎥 Video Streaming
- ✅ Click video thumbnail
- ✅ Video player/iframe loads and is visible

---

## 📁 Project Structure


cypress/
├── e2e/
│   ├── 01_homePage_ui.cy.js
│   ├── 02_homePage_navigation.cy.js
│   ├── 03_homePage_filters.cy.js
│   ├── 04_homePage_search.cy.js
│   └── 05_homePage_video.cy.js
└── pageObjects/
    └── homePage.js



---

## ⚙️ Installation

```bash
npm install

## ⚙️ Cypress GUI

npx cypress open

## ⚙️ Run

npx cypress run

Test Reporting (Mochawesome)

This project integrates cypress-mochawesome-reporter to generate, shareable HTML test reports.

## ⚙️ Install Reporter

npm install --save-dev cypress-mochawesome-reporter

## ⚙️ Configuration

In cypress.config.js:

# const { defineConfig } = require("cypress");

# module.exports = defineConfig({
#   e2e: {
#     baseUrl: 'https://www.flowrestling.org',
#     setupNodeEvents(on, config) {
#       require('cypress-mochawesome-reporter/plugin')(on);
#     },
#   },
#   reporter: 'cypress-mochawesome-reporter',
#   reporterOptions: {
#     reportDir: 'cypress/reports',
#     overwrite: false,
#     html: true,
#     json: true
#   },
# });

# In cypress/support/e2e.js, add this line at the top:

import 'cypress-mochawesome-reporter/register';


# Run Tests and Generate Report

npx cypress run

# View Report

cypress/reports/mochawesome.html
