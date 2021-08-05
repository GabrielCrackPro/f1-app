const constructorsContainer = document.querySelector(".constructors-container");
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
const getConstructors = async () => {
  let constructors = await getData(API_URLS.constructors);
  constructors = constructors.ConstructorTable.Constructors;
  constructors.forEach((constructor) => {
    constructorsContainer.innerHTML += `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-8">
        <div class="card-body p-3">
          <h5 class="card-title f1-border">${constructor.name}</h5>
          <h6 class="card-subtitle mb-2">${constructor.nationality}</h6>
  <a href="${constructor.url}" target="blank" class="btn btn-sm f1-bg text-white">Constructor Info</a></h6>
        </div>
      </div>
    </div>
  </div>
    `;
  });
};
window.onload = getConstructors();
