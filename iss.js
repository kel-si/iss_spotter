const request = require('request');
let coords = {"latitude":0, "longitude":0};
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) return callback(error, null);
  
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.StatusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    // console.log(response.statusCode);
    // console.log(body);
    if (error) {
      callback(error, null);
      return;
    }
  
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.StatusCode} when fetching IP: ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    coords = {"latitude": data["latitude"], "longitude": data["longitude"]};

    callback(null, coords);
    // console.log(body);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};
