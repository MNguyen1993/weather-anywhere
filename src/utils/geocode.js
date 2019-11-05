const request = require('request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=' +
		process.env.MAPBOX_TOKEN +
		'&limit=1&language=en';

	// err is a low level error	with regards to OS
	// so we check the req.body sent from the API for an error
	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to location services!');
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.');
		} else {
			callback(undefined, {
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
