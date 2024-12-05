const form = document.getElementById('weatherForm');
const weatherDataDiv = document.getElementById('weatherData');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const city = document.getElementById('city').value;

    // Fetch weather data from the backend
    try {
        const response = await fetch(`http://localhost:5000/weather?city=${city}`);
        if (!response.ok) throw new Error('City not found or server error');
        const data = await response.json();

        // Display weather data
        weatherDataDiv.innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${(data.main.temp - 273.15).toFixed(1)}°C</p>
            <p>Feels Like: ${(data.main.feels_like - 273.15).toFixed(1)}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherDataDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
});
