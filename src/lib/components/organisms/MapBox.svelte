<script>
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

	let map;
	export let editMode = false;
	export let distance;

	export let width = 100;
	export let height = 500;

	let mounted = false;

	export let mapSymbols = {
		points: [],
		startingPoint: undefined,
		featuresCollection: [],
		lineDots: []
	};

	onMount(() => {
		console.log('Onmount started');
		mapboxgl.accessToken =
			'pk.eyJ1IjoibWl0aWJ1cyIsImEiOiJjbDJ0YTJncncwMmc1M25vMmkyeXpuMXVnIn0.bpe2OGLgy1CsVWudX4yiuA';

		map = new mapboxgl.Map({
			container: 'map-container',
			style: 'mapbox://styles/mitibus/cl8bww6dy002a15p9047yapmr',
			center: [-0.694733, 44.908403], // starting position [lng, lat]
			zoom: 16, // starting zoom
			projection: 'globe'
		});

		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				}
			})
		);

		map.on('click', (e) => {
			if (editMode) {
				mapSymbols.points = [...mapSymbols.points, e.lngLat];
			}
		});

		console.log('Onmount finished');
		map.on('load', () => (mounted = true));
	});

	$: {
		if (map && mounted) {
			console.log('Autofresh started');
			if (mapSymbols.points.length == 0 && mapSymbols.startingPoint) {
				mapSymbols.startingPoint = null;
			}

			if (map.getLayer('route')) map.removeLayer('route');
			if (map.getLayer('points')) map.removeLayer('points');
			if (map.getSource('route')) map.removeSource('route');
			if (map.getSource('points')) map.removeSource('points');

			mapSymbols.featuresCollection = [];
			mapSymbols.lineDots = [];

			mapSymbols.points.forEach((point, i) => {
				if (i == 0) {
					mapSymbols.startingPoint = new mapboxgl.Marker({
						color: '#FF0000'
					}).setLngLat([point.lng, point.lat]);
					mapSymbols.startingPoint.addTo(map);
				} else {
					mapSymbols.featuresCollection = [
						...mapSymbols.featuresCollection,
						{
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: [point.lng, point.lat]
							}
						}
					];
				}
				mapSymbols.lineDots = [...mapSymbols.lineDots, [point.lng, point.lat]];
			});

			const lineString = {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: mapSymbols.lineDots
				}
			};

			distance = turf.length(lineString).toLocaleString();
			map.addSource('route', {
				type: 'geojson',
				data: lineString
			});

			map.addSource('points', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: mapSymbols.featuresCollection
				}
			});

			map.addLayer({
				id: 'route',
				type: 'line',
				source: 'route',
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': '#888',
					'line-width': 8
				}
			});

			map.addLayer({
				id: 'points',
				type: 'circle',
				source: 'points', // reference the data source
				paint: {
					'circle-radius': 6,
					'circle-color': '#B42222'
				}
			});
		}
	}
</script>

<div id="map-container" style="width: {width}%; height: {height}px;" />

<style>
	#map-container {
		border-radius: 10px;
		align-self: center;
	}
</style>
