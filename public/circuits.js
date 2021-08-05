const circuitsContainer = document.querySelector(".circuits-container");
const API_URLS = {
  base: "http://ergast.com/api/f1/",
  races: "http://ergast.com/api/f1/2021.json",
  drivers: "http://ergast.com/api/f1/drivers.json",
  constructors: "http://ergast.com/api/f1/constructors.json",
  circuits: "http://ergast.com/api/f1/circuits.json",
};

const getData = async (url) => {
  let data = await fetch(url).then((response) => response.json());
  return data.MRData;
};
const getCircuits = async () => {
  let circuits = await getData(API_URLS.circuits);
  circuits = circuits.CircuitTable.Circuits;
  circuits.forEach((circuit) => {
    circuitsContainer.innerHTML += `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-8">
        <div class="card-body p-3">
          <h5 class="card-title f1-border">${circuit.circuitName}</h5>
          <h6 class="card-subtitle mb-2">${circuit.Location.locality} - ${circuit.Location.country} <a href="https://www.google.com/maps/place/${circuit.Location.lat}+${circuit.Location.long}" target="blank" class="btn btn-sm f1-bg text-white">See in Google Maps</a></h6>
      <a href="${circuit.url}" target="blank" class="btn f1-bg text-white">More Info</a>
        </div>
      </div>
    </div>
  </div>
    `;
  });
};
window.onload = getCircuits();
