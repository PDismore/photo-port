// API call

var weatherInfo = function(city){
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=64f1258e9122274c1f3ca2a7e476c575"

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            console.log(data)
        })
    })

}

$("#city-search").on("submit", function (event) {
    event.preventDefault();

    var cityName = $("#city-input").val().trim()
    weatherInfo(cityName)

    $("#city-input").val("")
})