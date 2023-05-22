const ejs = require('ejs');
const express = require('express');
const app = express();
const port = 3000;
const te = require("tradingeconomics");

// Set ejs as the view engine
app.set('view engine', 'ejs');

// Configure trading economics API credentials
te.login("cdf2be11ae7949b:q3uov4owhdlfsan");

// Define routes
app.get('/', (req, res) => {
    // Fetching the idicator data for Mexico and the United States
    te.getHistoricalData((country = ["mexico", "sweden"]), (indicator = ["gdp", "population"]), start_date = '2000-01-01', 
    end_date = '2022-12-31'). then(function (data) {
        // console.log(data);
        res.render("home", {apiData: data});
    });
});

app.get("/countries", (req, res) => {
  te.getAllCountries().then(function(data){
      console.log("Data: ", data);
      res.render("countries", {apiData: data});
  })
});

app.get("/indicators", (req, res) => {
  te.getIndicatorData().then(function (data) {
    console.log("Data: ", data);
    res.render("indicators", {apiData: data});
  });
});

// Serve static files from the public directory
// app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});