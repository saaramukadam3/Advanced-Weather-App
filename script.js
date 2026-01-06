const apiKey = "bbcad6853ad8d4d60b8ce9c657f0ad8f"; 

const toggleBtn = document.getElementById("theme-toggle");

let theme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", theme);
toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";

toggleBtn.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
});


document.getElementById("search").addEventListener("click", () => {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Enter city name");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        alert("City not found");
        return;
      }

      document.getElementById("location").innerText =
        `${data.name}, ${data.sys.country}`;
      document.getElementById("temp").innerText =
        `${data.main.temp} °C`;
      document.getElementById("desc").innerText =
        data.weather[0].description;
      document.getElementById("humidity").innerText =
        `Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").innerText =
        `Wind: ${data.wind.speed} km/h`;
    })
    .catch(() => alert("Error fetching data"));

});
