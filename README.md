## Create React App Visualization

Read more about this assessment here

## Setup

1. clone
2. npm install
3. Get Google Maps API key either from here: [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) or you can use an existing key
   1. Put Key in .env file at the root of the project, make sure you name it REACT_APP_MAPS_API_KEY
4. npm start

## Improvements that can be made to the test

1. Change .jss4 {position: fixed;} to .jss4 {position: relative;} otherwise the banner overlaps some of the content and is super annoying. Alternatively you could put enough padding at the top of any content so that the fixed position headers does not cover them up.
2. Spelling error in description for /weather/location/{woeid} “Forecase” to “Forecast”
