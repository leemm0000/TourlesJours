  // 날씨 api 

let apiKey = '08edce9304296d4507e8173f8cd4cc7e';

let weatherIconMap = {
  "Thunderstorm": "wi-thunderstorm",
  "Drizzle": "wi-sprinkle",
  "Rain": "wi-rain",
  "Snow": "wi-snow",
  "Clear": "wi-day-sunny",
  "Clouds": "wi-cloudy",
  "Mist": "wi-fog",
  "Smoke": "wi-smoke",
  "Haze": "wi-day-haze",
  "Dust": "wi-dust",
  "Fog": "wi-fog",
  "Sand": "wi-sandstorm",
  "Ash": "wi-volcano",
  "Squall": "wi-strong-wind",
  "Tornado": "wi-tornado"
};

function getSeoulWeather() {
  const lat = 37.5665;
  const lon = 126.9780;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      let temp = Math.round(data.main.temp);
      let feelsLike = Math.round(data.main.feels_like);
      let tempMin = Math.round(data.main.temp_min);
      let tempMax = Math.round(data.main.temp_max);
      let weatherMain = data.weather[0].main;
      let description = data.weather[0].description;
      let iconClass = weatherIconMap[weatherMain] || "wi-na";
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;

      // DOM 업데이트
      document.querySelector('.city').textContent = "서울";
      document.querySelector('.temp').textContent = `${temp}°C`;
      document.querySelector('.desc').textContent = `${description}`;
      document.querySelector('.feels').textContent = `체감 온도: ${feelsLike}°C`;
      document.querySelector('.minmax').textContent = `최고 ${tempMax}°C / 최저 ${tempMin}°C`;
      document.querySelector('.humidity').textContent = `습도: ${humidity}%`;
      document.querySelector('.wind').textContent = `풍속: ${windSpeed} m/s`;

      const iconElement = document.querySelector('.weather-icon');
      iconElement.className = `weather-icon wi ${iconClass}`;
    })
    .catch(err => {
      console.error('날씨 정보를 가져오는 데 실패했습니다:', err);
      alert('날씨 정보를 가져오지 못했습니다.');
    });
}

window.onload = function () {
  getSeoulWeather();
};

/* 메뉴 스와이프  */
window.addEventListener('load', function () {
  const swiper = new Swiper('.left-bottom-menu-list .swiper', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    //freeMode: true,
    freeModeMomentum: false,
    allowTouchMove: true,
    grabCursor: false,
    
  });

  // 메뉴 이미지 + 설명 업데이트
  document.querySelectorAll('.swiper-slide img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const title = img.dataset.title;
      const desc = img.dataset.desc;
      const imageUrl = img.dataset.image || img.src;

      // 텍스트 업데이트
      document.querySelector('.menu-title').textContent = title;
      document.querySelector('.menu-desc').textContent = desc;

      // 이미지 업데이트
      const mainImage = document.querySelector('.left-bottom-menu img');
      if (mainImage) {
        mainImage.src = imageUrl;
        mainImage.alt = title;
      }

      // 클릭 후 autoplay가 멈추는 것을 방지하기 위해 강제로 재시작
      if (!swiper.autoplay.running) {
        swiper.autoplay.start();
      }
    });
  });
});
