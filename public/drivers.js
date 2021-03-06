const driversContainer = document.querySelector(".drivers-container");
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
const getDriverAge = (date) => {
  let age = new Date().getFullYear() - new Date(date).getFullYear();
  if (age > 100) {
    return "Deceased";
  } else {
    return `${age} years`;
  }
};
const formatDate = (date) => {
  let day = new Date(date).getDay().toLocaleString();
  let mouth = new Date(date).getMonth().toLocaleString();
  let year = new Date(date).getFullYear().toLocaleString();
  return `${day}-${mouth}-${year}`;
};
const getDrivers = async () => {
  let drivers = await getData(API_URLS.drivers);
  drivers.limit = drivers.total;
  drivers = {
    table: drivers.DriverTable.Drivers,
  };
  drivers.table.forEach((driver) => {
    driversContainer.innerHTML += `
    <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-8">
      <div class="card-body p-3">
        <h5 class="card-title f1-border">${driver.givenName} ${
      driver.familyName
    }</h5>
        <h6 class="card-subtitle mb-2">${driver.nationality}</h6>
        <h6>Birth Date: ${formatDate(driver.dateOfBirth)} - ${getDriverAge(
      driver.dateOfBirth
    )}</h6>
    <a href="${
      driver.url
    }" target="blank" class="btn f1-bg text-white">More Info</a>
      </div>
    </div>
  </div>
</div>
    `;
  });
};

window.onload = getDrivers();
