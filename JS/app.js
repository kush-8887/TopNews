// API KEYS
const newsApiKey = "266a47e8365c4cdca90fe238e03f6af0";
const weatherApiKey = "9743e92262274d8e9b693850213012";

//Variables
let newsContainer = document.getElementById('newsContainer');
newsContainer.innerHTML = '';
let currentTimeContainer = document.querySelector('#currentTime');
let currentDateContainer = document.querySelector('#currentDate');
let weatherContainer = document.querySelector('#weatherContainer');
weatherContainer.innerHTML = '';
let coronaContainer = document.querySelector('#coronaUpdate');
coronaContainer.innerHTML = '';

// News Request Params
let country = "in";

//Function to fetche and display news
function getNews(){
    url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${newsApiKey}`;
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        data.articles.forEach(article=>{
            newsContainer.innerHTML += 
            `<div class="news-card">
            <div class="news-img-card" id="newsCardImg">
                <img class="news-img" src="${article.urlToImage}" alt="newsImg">
            </div>
            <div class="text-material">
            <div class="news-title" id="news-title">
               <a href="${article.url}" target="_blank" class="news-link">${article.title}</a> 
            </div>
            <div class="news-discription">
            ${article.description}
            </div>
            </div>
        </div>`
        })
    })
}
getNews();

// Get User Location 
const getPosition = () => {
    return new Promise((resolve, reject) => {
        const onSuccess = (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            pos = [lat,lng];

            resolve(pos)
        }

        const onError = () => {
            //If User denies location. default location displayed
            function viewDefaultWeather(){
                url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q="Delhi"`
                fetch(url).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    let dataArray = Object.values(data);
                    let locationData = dataArray[0];
                    let weatherData = dataArray[1];
                    let conditionData = Object.values(weatherData.condition);
                    weatherContainer.innerHTML +=
                    `<div class="weather-card">
                    <div class="city-name">${locationData.name} <sup class="country">${locationData.country}</sup></div>
                    <div class="temprature">${weatherData.temp_c}<sup class="celcius">&#8451;</sup></div>
                    <div class="temp-img">
                        <img src="${conditionData[1]}" alt="img">
                    </div>
                    <div class="condition">${conditionData[0]}</div>
                </div>`
                })
            }
            viewDefaultWeather();
            reject();
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    })
}

//Display weather
getPosition().then((position) => {
    let latitude = position[0]
    let longitude = position[1];
    
    if(latitude == undefined || longitude == undefined){
        alert('Location Denied');
    }
    else{
        function getWeather(){
            url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}`
            fetch(url).then((response)=>{
                return response.json();
            }).then((data)=>{
                let dataArray = Object.values(data);
                let locationData = dataArray[0];
                let weatherData = dataArray[1];
                let conditionData = Object.values(weatherData.condition)
                weatherContainer.innerHTML +=
                `<div class="weather-card">
                <div class="city-name">${locationData.name} <sup class="country">${locationData.country}</sup></div>
                <div class="temprature">${weatherData.temp_c}<sup class="celcius">&#8451;</sup></div>
                <div class="temp-img">
                    <img src="${conditionData[1]}" alt="img">
                </div>
                <div class="condition">${conditionData[0]}</div>
            </div>`

            })
        }
        getWeather();
    }
});

//Function display current time
function currentTime() {
    const date = new Date;
    let time = date.toLocaleTimeString();
    currentTimeContainer.innerHTML = time;
}
setInterval(currentTime,1000)

//Funtion display current date 
function currentDate(){
    const date = new Date;
    currentDateContainer.innerHTML = date.toLocaleDateString();
}
currentDate();

//Function to get and display covid info
function getCoronaData(){
    url = `https://disease.sh/v3/covid-19/gov/India`
    fetch(url).then((response) =>{
        return response.json();
    }).then((data) => {
        let currentCovidData = Object.values(data);
        coronaContainer.innerHTML +=
        `<div class="covid-card">
        <div class="country-name">
            India
        </div>
        <p class="country-sub-text">
            Coronavirus Status
        </p>
        <div class="flag">
            <img class="flag-img" src="/imgs/india-flag.png" alt="indian-Flag">
        </div>
        <div class="total-cases">
            Total Cases
            <p>${currentCovidData[1].todayCases}</p>
        </div>
        <div class="active-dead-container">
            <div class="active-cases">
                Active Cases
                <p>${currentCovidData[1].todayActive}</p>
            </div>
            <div class="dead">
                Deaths
                <p>${currentCovidData[1].todayDeaths}</p>
            </div>
        </div>
    </div>`
    })
}
getCoronaData();