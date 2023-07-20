/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// start the Stimulus application
import './bootstrap';

require('bootstrap');

// Map in home // 

var myMap = L.map('myMaps').setView([35.52605715947348, -49.6555969157191], 3);
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
    minZoom: 3,
    maxZoom: 20
}).addTo(myMap);

var artists = {
    "Led Zeppelin": { "lat": 51.50685034958066, "lon": -0.12563124287429342 },
    "Kyuss": { "lat": 33.832684271178856, "lon": -116.54060105263638 },
}

for (var artist in artists) {
    var marker = L.marker([artists[artist].lat, artists[artist].lon])
        .addTo(myMap);
    marker.bindPopup("<h4>" + artist + "</h4>");
}

// var marker = L.marker([51.50685034958066, -0.12563124287429342]).addTo(myMap);
// marker.bindPopup("<h5>Led Zeppelin</h5>")

// var marker = L.marker([33.832684271178856, -116.54060105263638]).addTo(myMap);
// marker.bindPopup("<h5>Kyuss</h5>")

// var iconVinyl = L.icon({
//     iconUrl: "/assets/images/icon_vinyl.png",
//     iconSize: [35, 35],
//     iconAnchor: [12.5, 25],
//     popupAnchor: [0, 0],
// });

// var breweries = {
//     "Nomade Brewery": { "lat": 45.73126983642578, "lon": 4.985140800476074 },
//     "La Débauche": { "lat": 45.65844509244459, "lon": 0.1680949586376146 },
//     "Zoobrew": { "lat": 43.64225769042969, "lon": 3.9191091060638428 },
//     "Piggy Brewing Compagny": { "lat": 48.763998, "lon": 6.059797 },
//     "L'Agrivoise": { "lat": 45.0158629610363, "lon": 4.386628185462709 },
//     "Brasserie Iron": { "lat": 43.975976224756494, "lon": 1.4139738535551438 },
// }

// for (brewery in breweries) {
//     var marker = L.marker([breweries[brewery].lat, breweries[brewery].lon], { icon: iconVinyl }).addTo(myMap);
//     marker.bindPopup("<h4>" + brewery + "</h4>");
// }