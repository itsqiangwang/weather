document.addEventListener('DOMContentLoaded', function () {
    // Start the message loop
    setInterval(displayRandomMessage, getRandomInterval(5000, 10000)); // Change the interval as needed (in milliseconds)
});

function displayRandomMessage() {
    const messageContainer = document.getElementById('messageContainer');

    // Get a random number to determine which message to display
    const randomNumber = Math.floor(Math.random() * 4); // Change the number based on the number of messages

    switch (randomNumber) {
        case 0:
            displayLocation();
            break;
        case 1:
            displayWeather();
            break;
        case 2:
            displayDate();
            break;
        case 3:
            displayTime();
            break;
        default:
            break;
    }

    // Automatically scroll to the bottom
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function displayLocation() {
    const locationMessage = document.createElement('div');
    locationMessage.className = 'messageBubble';

    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            })
            .then(data => {
                const location = `${data.city}, ${data.state}, ${data.country}`;
                locationMessage.innerHTML = `I was just checking the weather in ${data.city}, ${data.state}, where you live...`;
                document.getElementById('messageContainer').appendChild(locationMessage);
            })
            .catch(error => {
                console.error('Error fetching location:', error);
                locationMessage.innerHTML = 'Error fetching location';
                document.getElementById('messageContainer').appendChild(locationMessage);
            });
    });
}

function displayWeather() {
    const weatherMessage = document.createElement('div');
    weatherMessage.className = 'messageBubble';

    // Use your actual WeatherStack API key here
    const apiKey = '2b318391023ed30c1b4bc60a1b2c093e1';

    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            })
            .then(data => {
                const temperature = (data.current.temperature * 9/5) + 32;
                const weatherDescription = data.current.weather_descriptions[0];
                weatherMessage.innerHTML = `It's ${temperature} degrees in your city...`;
                document.getElementById('messageContainer').appendChild(weatherMessage);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                weatherMessage.innerHTML = 'It\'s 33 degrees in your city...';
                document.getElementById('messageContainer').appendChild(weatherMessage);
            });
    });
}

function displayDate() {
    const dateMessage = document.createElement('div');
    dateMessage.className = 'messageBubble';

    const dateInfo = new Date();
    const year = dateInfo.getFullYear();
    const month = dateInfo.getMonth() + 1; // Month is zero-based, so add 1
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthFromArray = monthNames[month - 1]; // Subtracting 1 because arrays are zero-based

    dateMessage.innerHTML = `It's ${monthFromArray} ${year}. I can't believe it. I seem to have fallen out of time... How is the weather in your city?`;
    document.getElementById('messageContainer').appendChild(dateMessage);
}

function displayTime() {
    const timeMessage = document.createElement('div');
    timeMessage.className = 'messageBubble';

    const timeInfo = new Date();
    const formattedTime = timeInfo.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    timeMessage.innerHTML = `It's ${formattedTime} where you live. How is the weather in your city?`;
    document.getElementById('messageContainer').appendChild(timeMessage);
}

// Function to get a random interval between min (inclusive) and max (exclusive)
function getRandomInterval(min = 5000, max = 10000) {
    return Math.floor(Math.random() * (max - min)) + min;
}