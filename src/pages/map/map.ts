import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidEnter() {

        var draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true
            },
            styles: [
                // ACTIVE (being drawn)
                // line stroke
                {
                    "id": "gl-draw-line",
                    "type": "line",
                    "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#3b9ddd",
                        "line-dasharray": [0.2, 2],
                        "line-width": 4,
                        "line-opacity": 0.7
                    }
                },
                // vertex point halos
                {
                    "id": "gl-draw-polygon-and-line-vertex-halo-active",
                    "type": "circle",
                    "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                    "paint": {
                        "circle-radius": 10,
                        "circle-color": "#FFF"
                    }
                },
                // vertex points
                {
                    "id": "gl-draw-polygon-and-line-vertex-active",
                    "type": "circle",
                    "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                    "paint": {
                        "circle-radius": 6,
                        "circle-color": "#3b9ddd",
                    }
                },
            ]
        });

        /*Initializing Map*/
        mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1bm9zaWx2IiwiYSI6ImNqZXByOTc5bjByajUyd25qYmk1OXEyb3YifQ.9i5PCHQ08DwdrC65gKEiSg';
        var map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-8.61024, 41.15],
            zoom: 15,
            attributionControl: false,
            minZoom: 11,
            container: 'map'
        });

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());

        // Add geolocate control to the map.
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        // add the draw tool to the map
        map.addControl(draw);

        // add create, update, or delete actions
        map.on('draw.create', updateRoute);
        map.on('draw.update', updateRoute);
        map.on('draw.delete', removeRoute);

        // use the coordinates you just drew to make your directions request
        function updateRoute() {
            removeRoute(); // overwrite any existing layers
            var data = draw.getAll();
            var answer = document.getElementById('calculated-line');
            var lastFeature = data.features.length - 1;
            var coords = data.features[lastFeature].geometry.coordinates;
            var newCoords = coords.join(';')
            getMatch(newCoords);
        }

        // make a directions request
        function getMatch(e) {
            var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + e + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
            var req = new XMLHttpRequest();
            req.responseType = 'json';
            req.open('GET', url, true);
            req.onload = function () {
                var jsonResponse = req.response;
                var distance = jsonResponse.routes[0].distance * 0.001;
                var duration = jsonResponse.routes[0].duration / 60;
                //var stops = jsonResponse.routes;
                document.getElementById('calculated-line').innerHTML = 'Distance: ' + distance.toFixed(2) + ' km<br>Duration: ' + duration.toFixed(2) + ' minutes';
                var coords = jsonResponse.routes[0].geometry;
                // add the route to the map
                addRoute(coords);
            };
            req.send();
        }

        // adds the route as a layer on the map
        function addRoute(coords) {
            // check if the route is already loaded
            if (map.getSource('route')) {
                map.removeLayer('route')
                map.removeSource('route')
            } else {
                map.addLayer({
                    "id": "route",
                    "type": "line",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "properties": {},
                            "geometry": coords
                        }
                    },
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": "#3b9ddd",
                        "line-width": {
                            "base": 1,
                            "stops": [[12, 3], [22, 12]]
                        },
                        "line-opacity": 0.8
                    }

                }, "waterway-label");

                map.addLayer({
                    "id": "routearrows",
                    "type": "symbol",
                    "source": "route",
                    "layout": {
                        "symbol-placement": "line",
                        "text-field": "▶",
                        "text-size": {
                            "base": 1,
                            "stops": [[12, 24], [22, 60]]
                        },
                        "symbol-spacing": {
                            "base": 1,
                            "stops": [[12, 30], [22, 160]]
                        },
                        "text-keep-upright": false
                    },
                    "paint": {
                        "text-color": "#3887be",
                        "text-halo-color": "hsl(55, 11%, 96%)",
                        "text-halo-width": 3
                    }
                }, "waterway-label");
            }
            ;
        }

        // remove the layer if it exists
        function removeRoute() {
            if (map.getSource('route')) {
                map.removeLayer('route');
                map.removeLayer('routearrows');
                map.removeSource('route');
                document.getElementById('calculated-line').innerHTML = '';
            } else {
                return;
            }
        }
    }
}
