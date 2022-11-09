// Local Storage array

previousSearch =[]

// API call
var weatherInfo = function(city){
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=64f1258e9122274c1f3ca2a7e476c575"

    fetch(apiURL).then(function (response) {
        response.json().then(function (data) {
            //if API is good and the name is not in the previousSearch Array create a button and add it to the previousSearch Array
            if (response.ok) {
                if(previousSearch.includes(data.name) === false) {
                    // pastSearchBtn(data.name)
                    previousSearch.push(data.name)
                }
                localStorage.setItem("previousSearch", JSON.stringify(previousSearch))
                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&exclude=hourly,minutely,alerts&appid=0e450fa9a4e7801cd2fc1c5ae48d0e9c`)
                    .then(function (res) {
                        res.json().then(function (data) {
                            todayWeather(data, city)
                            // createFiveDay(data)
                        })
                    }) 
            }

        }) 
    }) 
}

// Today's weather card creation

var todayWeather = function(info,city){
    var todayBox = $("#today-weather")

    todayBox.children().remove()

    var date = $("<h2>").text(moment().format("L"))
    todayBox.append(date)

    var cityName = $("<h3>").text(city.toUpperCase())
    todayBox.append(cityName)

    var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + info.current.weather[0].icon + "@2x.png")
    todayBox.append(img)

    var temp = $("<div>").text("Temperature: " + Math.floor(info.current.temp))
    todayBox.append(temp)

    var wind = $("<div>").text("Wind Speed: " + Math.floor(info.current.wind_speed) + " MPH")
    todayBox.append(wind)

    var humidity = $("<div>").text("Humidity: " + info.current.humidity + "%")
    todayBox.append(humidity)

    console.log(todayWeather)
}


// Search button function 
$("#city-search").on("submit", function (event) {
    event.preventDefault();

    var cityName = $("#city-input").val().trim()
    weatherInfo(cityName)

    $("#city-input").val("")
})