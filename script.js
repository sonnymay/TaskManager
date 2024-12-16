if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Location acquired:", latitude, longitude); // Debug line

            // Get location name using reverse geocoding
            fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=4dbf9169dc66bc5579cb826685cbd2d7`)
                .then(response => response.json())
                .then(data => {
                    console.log("Geocoding response:", data); // Debug line
                    const city = data[0].name;
                    const state = data[0].state;
                    document.getElementById('location').textContent = `📍 ${city}, ${state}`;
                })
                .catch(error => {
                    console.error("Geocoding error:", error); // Debug line
                    document.getElementById('location').textContent = "Location error";
                });

            // Get weather
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=4dbf9169dc66bc5579cb826685cbd2d7`)
                .then(response => response.json())
                .then(data => {
                    console.log("Weather response:", data); // Debug line
                    const temp = Math.round(data.main.temp);
                    const feelsLike = Math.round(data.main.feels_like);
                    const humidity = data.main.humidity;
                    const windSpeed = Math.round(data.wind.speed);
                    const description = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    
                    document.getElementById('weather').innerHTML = `
                        <div class="d-flex align-items-center">
                            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon" class="weather-icon me-2">
                            <div>
                                <span class="temp">${temp}°F</span>
                                <span class="description">${description}</span>
                                <div class="weather-details">
                                    <small>Feels like: ${feelsLike}°F | Humidity: ${humidity}% | Wind: ${windSpeed} mph</small>
                                </div>
                            </div>
                        </div>
                    `;
                })
                .catch(error => {
                    console.error("Weather error:", error); // Debug line
                    document.getElementById('weather').textContent = "Weather error";
                });
        },
        error => {
            console.error("Geolocation error:", error); // Debug line
            document.getElementById('location').textContent = "Location unavailable";
            document.getElementById('weather').textContent = "Weather unavailable";
        }
    );
} else {
    console.error("Geolocation not supported"); // Debug line
    document.getElementById('location').textContent = "Location not supported";
    document.getElementById('weather').textContent = "Weather unavailable";
}
