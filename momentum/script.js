const displayTime = document.querySelector('.time');
const displayDay = document.querySelector('.day');
const displayDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const city = document.querySelector('.city');
const btn = document.querySelector('[dataset-for="image"]');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const quoteBtn = document.querySelector('[dataset-for="quote"]');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const API_KEY = '671d248081545c01734fc547c8a3ffd3';

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  if (sec == 0 && min == 0) {
    setBgGreet();
  }

  displayTime.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function showDate() {
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const day = today.getDay();
    
    displayDay.innerText = `${daysOfTheWeek[day]}`;
    displayDate.innerText = `${date} ${months[month]}`;
}

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind: ${data.wind.speed} m/s`;
    } catch (error) {
        alert('There is no such city! Please try another.');
        temperature.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
    }
}

async function getQuote() {  
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json(); 

  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  viewBgImage(hour);

  if (hour < 6) {
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    greeting.textContent = 'Good Afternoon, ';
  } else {
    greeting.textContent = 'Good Evening, ';
  }
}


function getItem(elem) {
  if (localStorage.getItem(elem.id) === null) {
    elem.textContent = `[Enter ${elem.id}]`;
  } else {
    elem.textContent = localStorage.getItem(elem.id);
  }
}

function setItem(e) {
  if (e.type === 'keypress') {
    if (e.code === 'Enter') {
      if (this.innerText !== '') {
        localStorage.setItem(this.id, this.innerText);
      } else {
        this.textContent = localStorage.getItem(this.id);
      }
      if (this.id === 'city') {
        getWeather();
      }
      this.blur();
    }
  } else if (e.type === 'blur') {
    this.textContent = localStorage.getItem(this.id);
  } else if (e.type === 'click') {
    localStorage.setItem(this.id, this.textContent);
    this.textContent = '';
  }
}

let i = new Date().getHours();

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = `./assets/images/${data}.jpg`;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
      body.style.backgroundImage = `url(${src})`;
    }; 
  }

function changeImage() {
    if (i === 23) {
        i = -1;
    }
    i++;
    viewBgImage(i);
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
}

showTime();
showDate();
setBgGreet();
getItem(name);
getItem(focus);
getItem(city);

document.addEventListener('DOMContentLoaded', () => {
  getQuote();
  if (localStorage.getItem('city') !== null) {
    getWeather();
  }
});

name.addEventListener('keypress', setItem);
name.addEventListener('blur', setItem);
name.addEventListener('click', setItem);
focus.addEventListener('keypress', setItem);
focus.addEventListener('blur', setItem);
focus.addEventListener('click', setItem);
city.addEventListener('keypress', setItem);
city.addEventListener('blur', setItem);
city.addEventListener('click', setItem);

btn.addEventListener('click', changeImage);
quoteBtn.addEventListener('click', getQuote);

// localStorage.clear()