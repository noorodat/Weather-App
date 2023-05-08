let weather = {

    "apikey": "ba7e8033262213b6a4efb2fe3ed6e046",

    fetchWeather : function(city) {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}`)

        .then((response) => response.json())

        .then((data) => {
            if(data.name === "undefined") {
                this.showError();
            }
            else {
                this.displayWeather(data);
            }
        });
    
        
    },

    displayWeather: function(data) {
        
        if(data.name === undefined) {
            this.showError();
        }

        else {

        
        // Weather Container
        let weatherContainer = document.getElementById("weather");
        weatherContainer.innerHTML="";

        // Welcome Message
        let welcomeMessage = document.createElement("h2");
        welcomeMessage.classList.add("city");
        welcomeMessage.textContent = `${data.name} , ${data.sys.country}`;
        weatherContainer.appendChild(welcomeMessage);

        // Tempreture
        let temp = document.createElement("div")
        temp.classList.add("temp");
        temp.textContent = `${parseInt(data.main.temp - 273.15)}°C`;
        weatherContainer.appendChild(temp);

        // Create other-info container
        let otherInfo = document.createElement("div");
        otherInfo.classList.add("other-info");

        // Description + Icon container
        let desIcon = document.createElement("div");
        desIcon.classList.add("des-icon");

        // Description
        let description = document.createElement("div");
        description.classList.add("description");
        description.textContent = `${data.weather[0].description}`;
        desIcon.appendChild(description);
        otherInfo.appendChild(desIcon);

        // Icon
        let icon = document.createElement("img");
        icon.classList.add("icon");
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        desIcon.appendChild(icon);


        
        // humidity
        let humidity = document.createElement("div");
        humidity.classList.add("humidity");
        humidity.textContent = `Humidity: ${data.main.humidity}%`
        otherInfo.appendChild(humidity);

        // Wind
        let wind = document.createElement("div");
        wind.classList.add("wind");
        wind.textContent=  `Wind speed: ${data.wind.speed}km/h`
        otherInfo.appendChild(wind);

        weatherContainer.appendChild(otherInfo);
        }
    },

    showError : function() {
        let weatherContainer = document.getElementById("weather");
        weatherContainer.innerHTML = "";
        let errorMessage = document.createElement("div");
        errorMessage.textContent = "Error: Enter a valid country/city name.";
        errorMessage.style = "color: red; font-size: 25px;"
        weatherContainer.appendChild(errorMessage);
    }
};


// Search bar
let searchBar = document.querySelector(".card .search-bar");

searchBar.onfocus = function () {
    searchBar.setAttribute("placeholder", "");
}

searchBar.onblur = function () {
    searchBar.setAttribute("placeholder", "Enter your city name");
}

// Search Button
let searchButton = document.querySelector(".card .search button");

// Handle Search Button
searchButton.onclick = function() {

    // Get The Value Of the Search Bar
    let cityValue = searchBar.value;

    // Fetch
    weather.fetchWeather(cityValue);
    
}

// Handle Enter Key
searchBar.addEventListener("keyup", function(event) {
    
    if (event.key === "Enter") {
        let cityValue = searchBar.value;
        weather.fetchWeather(cityValue);
    }

});







