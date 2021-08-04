const racesContainer = document.querySelector(".races-container");
const API_URLS = {
  base: "http://ergast.com/api/f1/",
  races: "http://ergast.com/api/f1/2021.json",
  results: "http://ergast.com/api/f1/2021/results.json",
  drivers: "http://ergast.com/api/f1/drivers.json",
  constructors: "http://ergast.com/api/f1/constructors.json",
  circuits: "http://ergast.com/api/f1/circuits.json",
};
const getData = async (url) => {
  let data = await fetch(url).then((response) => response.json());
  return data.MRData;
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
const formatTime = (time) => {
  return `${time.substr(0, 2)}${time.substr(2, 3)}`;
};

window.onload = async () => {
  let races = await getData(API_URLS.races);
  races = {
    table: races.RaceTable.Races,
  };
  console.log(races.table[0]);
  races.table.forEach((race) => {
    racesContainer.innerHTML += `
      <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-8">
          <div class="card-body p-3">
            <h5 class="card-title f1-border">${race.raceName}</h5>
            <h6 class="card-subtitle mb-2">Circuit: ${
              race.Circuit.circuitName
            } - ${
      race.Circuit.Location.country
    } <a class="btn btn-sm f1-bg text-white" href="https://www.google.com/maps/place/${
      race.Circuit.Location.lat
    }+${race.Circuit.Location.long}" target="blank">See in Google Maps</a> 
    <a href="${
      race.Circuit.url
    }" target="blank" class="btn btn-sm f1-bg text-white">Circuit Info</a></h6>
            <h6>Date: ${formatDate(race.date)} - ${formatTime(race.time)}</h6>
            <h6>Season: ${race.season} Round: ${race.round}</h6>
        <a href="${
          race.url
        }" target="blank" class="btn f1-bg text-white">Race Info</a>
          </div>
        </div>
      </div>
    </div>
      `;
  });
};
