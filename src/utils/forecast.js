const request = require('request');

const forecast = (lat, long, callback) => {
	const url =
		'https://api.darksky.net/forecast/3d961e81b97b49bbb5a78ab1707d8b1d/' +
		encodeURIComponent(lat) +
		',' +
		encodeURIComponent(long);

	// err is a low level error	with regards to OS
	// so we check the req.body sent from the API for an error
	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to weather services');
		} else if (body.error) {
			callback('Cannot retrieve forecast for the provided location');
		} else {
			callback(undefined, {
				summary: body.daily.data[0].summary,
				temperature: body.currently.temperature,
				precipProb: body.currently.precipProbability,
				message:
					body.daily.data[0].summary +
					' It is currently ' +
					body.currently.temperature +
					'° out. Expect a temperature high of ' +
					body.daily.data[0].temperatureHigh +
					'° and a low of ' +
					body.daily.data[0].temperatureLow +
					'°. There is a ' +
					body.currently.precipProbability +
					'% chance of rain.'
			});
		}
	});
};

module.exports = forecast;
