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

var artistsData = {};

fetch('/geo/coding/coord')
    .then(response => response.json())
    .then(data => {
        artistsData = data;

        for (var artist of artistsData) { // Corrected loop syntax
            var link = "<a href='/artist/" + encodeURIComponent(artist.id) + "'>" + artist.name + "</a>";
            var marker = L.marker([artist.latitude, artist.longitude]).addTo(myMap);
            marker.bindPopup("<h4>" + link + "</h4>");
        }
    })
    .catch(error => console.error('Error fetching data:', error));
