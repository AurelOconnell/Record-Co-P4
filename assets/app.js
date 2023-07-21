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

var artistsData = {
    "11": { "name": "Led Zeppelin", "lat": 51.50685034958066, "lon": -0.12563124287429342 },
    "12": { "name": "Kyuss", "lat": 33.832684271178856, "lon": -116.54060105263638 },
    "6": { "name": "Nirvana", "lat": 47.60562166337458, "lon": -122.32695829876475 },
    "7": { "name": "Noir Désir", "lat": 44.83788806747539, "lon": -0.5777751973353323 },
    "9": { "name": "The Beatles", "lat": 53.406041018478284, "lon": -2.982041514635397 },
}

var artistsName = {};

for (var artistId in artistsData) {
    var artist = artistsData[artistId];
    var link = "<a href='/artist/" + encodeURIComponent(artistId) + "'>" + artist.name + "</a>";
    var marker = L.marker([artist.lat, artist.lon])
        .addTo(myMap);
    marker.bindPopup("<h4>" + link + "</h4>");
}

function getCoordinates(cityName, artistName, artistId) {
    $.ajax({
        url: '{{ path("app_geo_coord") }}',
        method: 'GET',
        data: { city: cityName },
        success: function (response) {
            if (response.city && response.lat && response.lon) {
                artistsData[artistId] = {
                    name: artistName,
                    lat: response.lat,
                    lon: response.lon
                };
                
                myMap.setView([response.lat, response.lon], 4);

                var marker = L.marker([response.lat, response.lon]).addTo(myMap);
                marker.bindPopup("<h4>" + artistName + "</h4>");
            } else {
                alert("Impossible de récupérer les coordonnées pour la ville spécifiée.");
            }
        },
        error: function () {
            alert("Une erreur s'est produite lors de la récupération des coordonnées.");
        }
    });
}

$("#addArtistButton").on('click', function (event) {
    event.preventDefault();

    var cityName = $("#artist_city").val();
    var artistName = $("#artist_name").val();
    var artistId = $("#artist_id").val();

    if (cityName && artistName && artistId) {
        getCoordinates(cityName, artistName, artistId);
    } else {
        alert("Veuillez saisir le nom de l'artiste, l'ID de l'artiste et la ville d'origine.");
    }
});