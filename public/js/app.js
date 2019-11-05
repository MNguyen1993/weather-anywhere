const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#location');
const messageTwo = document.querySelector('#forecast');
const $currentLocationBtn = document.querySelector('#current');

weatherForm.addEventListener('submit', event => {
	// stops form from reloading page
	// that is the default behavior of a submitted form
	event.preventDefault();

	const location = searchInput.value;
	searchInput.value = '';
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	if (!location) {
		return (messageOne.textContent = 'You must enter in a location!');
	}

	fetch('/weather?address=' + encodeURIComponent(location)).then(res => {
		res.json().then(data => {
			if (data.err) {
				return (messageOne.textContent = data.err);
			}
			messageOne.textContent = data.location;
			messageTwo.textContent = data.forecast;
		});
	});
});

$currentLocationBtn.addEventListener('click', () => {
	if (!navigator.geolocation) {
		return alert('Geolocation is not supported by your browswer');
	}

	navigator.geolocation.getCurrentPosition(position => {
		const location = `${position.coords.longitude},${position.coords.latitude}`;

		fetch('/weather?address=' + encodeURIComponent(location)).then(res => {
			res.json().then(data => {
				if (data.err) {
					return (messageOne.textContent = data.err);
				}
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			});
		});
	});
});
