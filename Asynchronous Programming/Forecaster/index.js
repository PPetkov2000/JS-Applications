function attachEvents() {
  const html = {
    location: () => document.getElementById("location"),
    forecast: () => document.getElementById("forecast"),
    getWeather: () => document.getElementById("submit"),
    current: () => document.getElementById("current"),
    upcoming: () => document.getElementById("upcoming"),
  };

  const weather = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Overcast: "☁",
    Rain: "☂",
    Degrees: "°",
  };

  const baseUrl = "https://judgetests.firebaseio.com";
  const makeUrl = (x) => `${baseUrl}/${x}.json`;

  const div = createElement.bind(undefined, "div");
  const span = createElement.bind(undefined, "span");

  function getWeather() {
    const location = html.location().value;

    fetchData(makeUrl("locations"))
      .then((data) => {
        const locationObj = data.find((x) => x.name === location);

        if (locationObj === undefined) {
          throw new Error("Invalid location!");
        }

        return Promise.all([
          fetchData(makeUrl(`forecast/today/${locationObj.code}`)),
          fetchData(makeUrl(`forecast/upcoming/${locationObj.code}`)),
        ])
          .then(([today, upcoming]) => {
            html.forecast().style.display = "block";
            displayCurrentWeather(today);
            displayUpcomingWeather(upcoming);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function displayCurrentWeather(data) {
    const { name, forecast } = data;
    const { condition, high, low } = forecast;

    const currentForecast = div(
      [
        span(weather[condition], {
          className: "condition symbol",
        }),
        span(
          [
            span(name, {
              className: "forecast-data",
            }),
            span(`${low}°/${high}°`, {
              className: "forecast-data",
            }),
            span(condition, {
              className: "forecast-data",
            }),
          ],
          { className: "condition" }
        ),
      ],
      { className: "forecasts" }
    );

    html.current().appendChild(currentForecast);
  }

  function displayUpcomingWeather(data) {
    const upcomingForecast = div([], { className: "forecast-info" });

    data.forecast.forEach((day) => {
      const { condition, high, low } = day;
      const upcoming = span(
        [
          span(weather[condition], { className: "symbol" }),
          span(`${low}°/${high}°`, {
            className: "forecast-data",
          }),
          span(condition, { className: "forecast-data" }),
        ],
        { className: "upcoming" }
      );

      upcomingForecast.appendChild(upcoming);
    });

    html.upcoming().appendChild(upcomingForecast);
  }

  function fetchData(url) {
    return fetch(url)
      .then((x) => {
        if (!x.ok) {
          throw new Error(x.statusText);
        }
        return x;
      })
      .then((res) => res.json());
  }

  function createElement(type, content, attributes) {
    const element = document.createElement(type);

    if (attributes !== undefined) {
      // Object.assign(element, attributes);
      Object.keys(attributes).forEach((key) => {
        element[key] = attributes[key];
      });
    }

    if (Array.isArray(content)) {
      content.forEach(append);
    } else {
      append(content);
    }

    function append(node) {
      if (typeof node === "string" || typeof node === "number") {
        node = document.createTextNode(node);
      }
      element.appendChild(node);
    }

    return element;
  }

  html.getWeather().addEventListener("click", getWeather);
}

document.addEventListener("DOMContentLoaded", attachEvents);
