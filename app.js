let cityInput = document.getElementById("cityInput");
let btnInsert = document.getElementById("btn-insert");
let cityOutput = document.getElementById("cityName");
let descOutput = document.getElementById("description");
let tempOutput = document.getElementById("temp");
let windOutput = document.getElementById("wind");
let tempMinOutput = document.getElementById("temp_min");
let tempMaxOutput = document.getElementById("temp-max");
const apiKey = "bcb4a1687c769f02ff80cdf28f48abe8";

btnInsert.addEventListener('click', GetWeather);

async function GetWeather() {
    var WeaterResult = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
    ${cityInput.value}&appid=${apiKey}&lang={fa}`)).json();
    console.log(WeaterResult);
    setInfo(WeaterResult);
}

function convertToCel(value) {
    return (value - 273).toFixed(2);
}

function convertToDesc(value) {
    var persianDesc = value;
    switch (value) {
        case "clear sky":
            persianDesc = "آسمان صاف";
            break;
        case "few clouds":
            persianDesc = "چند ابری";
            break;
        case "mist":
            persianDesc = "غبار آلود";
            break;
        case "broken clouds":
            persianDesc = "ابرهای شکسته";
            break;
        case "overcast clouds":
            persianDesc = "ابرهای ابری";
            break;
        case "moderate rain":
            persianDesc = "باران متوسط";
            break;
        case "scattered clouds":
            persianDesc = "ابرهای پراکنده";
            break;
        case "light intensity shower rain":
            persianDesc = "باران رگباری با شدت کم";
            break;
    }
    return persianDesc;
}

function setInfo(data) {
    if (data.message === "city not found") {
        cityOutput.innerHTML = "نام شهر نا معتبر";
        descOutput.innerHTML = "";
        tempOutput.innerHTML = "";
        windOutput.innerHTML = "";
        tempMinOutput.innerHTML = "";
        tempMaxOutput.innerHTML = "";
    } else {
        var cityName = data["name"];
        var description = data["weather"][0]["description"];
        var temp = data["main"]["temp"];
        var wind = data["wind"]["speed"];
        var tempMin = data["main"]["temp_min"];
        var tempMax = data["main"]["temp_max"];
        cityOutput.innerHTML = `${cityName} :شهر  `;
        descOutput.innerHTML = `توضیحات : ${convertToDesc(description)}`;
        tempOutput.innerHTML = `درجه حرارت : ${convertToCel(temp)}`;
        windOutput.innerHTML = ` سرعت باد : ${wind}`;
        tempMinOutput.innerHTML = `حداقل دما : ${convertToCel(tempMin)}`;
        tempMaxOutput.innerHTML = `حداکثر دما : ${convertToCel(tempMax)}`;
    }
}