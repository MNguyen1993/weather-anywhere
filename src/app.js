const path = require('path');

const express = require('express'),
	app = express(),
	hbs = require('hbs'),
	geocode = require('./utils/geocode'),
	forecast = require('./utils/forecast'),
	port = process.env.PORT || 3000;

// Define paths for Express Configuration
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Minh Nguyen'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Minh Nguyen'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'There was an error getting to the desired path',
		name: 'Minh Nguyen'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide an address to retrieve weather information.'
		});
	}
	geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
		if (err) {
			return res.send({ err });
		}

		forecast(latitude, longitude, (err, { message } = {}) => {
			if (err) {
				return res.send({ err });
			}

			res.send({
				forecast: message,
				location,
				address: req.query.address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}

	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		message: 'Help article not found',
		name: 'Minh Nguyen'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		message: 'Page Not Found',
		name: 'Minh Nguyen'
	});
});

app.listen(port, () => {
	console.log('Server is online!');
});

/* app.get('/help', (req, res) => {
	// express detects obj and sends JSON
	res.send([
		{
			name: 'Minh',
			age: 26
		},
		{
			name: 'Sara',
			age: 24
		}
	]);
});

app.get('/about', (req, res) => {
	res.send('<h1>About Page</h1>');
}); */
