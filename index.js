const api = {
  proxy: "https://intense-mesa-62220.herokuapp.com/",
  element: "https://restcountries.herokuapp.com/api/v1",
  covid: "https://corona-api.com/countries/af",
};

const regionInfo = {};
const coronaInfo = {};

let currentRegionInfo = [];

async function fetchCountriesByregion() {
  const { data } = await axios.get(
    api.proxy + `https://restcountries.herokuapp.com/api/v1`
  );
  data.forEach((el) => {
    regionInfo[el.region]
      ? (regionInfo[el.region] += `*${el.name.common}`)
      : (regionInfo[el.region] = `*${el.name.common}`);
  });

  console.log("region info", regionInfo);

  for (let [region, country] of Object.entries(regionInfo)) {
    // make values as arr
    regionInfo[region] = country.split("*");
  }
}

async function fetchCovidInfoByCountry() {
  let dataCovid = await fetch(`https://corona-api.com/countries`);
  dataCovid = await dataCovid.json();

  console.log("data covid", dataCovid);

  dataCovid.data.forEach((el) => {
    coronaInfo[el.name] = [
      el.latest_data.confirmed,
      el.latest_data.recovered,
      el.latest_data.critical,
      el.latest_data.deaths,
    ];
  });

  // console.log(dataCovid);
}

fetchCountriesByregion().then(() => {
  fetchCovidInfoByCountry();
});

function getInfoByregion(region) {
  currentRegionInfo = [];
  regionInfo[region].forEach((el) => {
    currentRegionInfo.push([el, coronaInfo[el]]);
  });

  console.log(currentRegionInfo);

  currentRegionInfo = Object.values(currentRegionInfo).filter((el) => {
    if (el[1]) {
      return true;
    } else false;
  });
}

var chart = document.getElementById("myChart");
var myChart = new Chart(chart, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Covid-19 World Wide Information",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

function removeData(chart) {
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  chart.update();
}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

let currentDataType = 0;

function updateDataByRegion(region) {
  getInfoByregion(region);
  removeData(myChart);

  for (let info of Object.values(currentRegionInfo)) {
    info[1][currentDataType] &&
      addData(myChart, info[0], info[1][currentDataType]);
  }
}



document.querySelector(".buttons").addEventListener("click", buttonsSwitch);

let currentRegion;
function buttonsSwitch(event) {
  switch (event.target.innerText) {
    case "Asia":
      currentRegion = "Asia";
      // updateRegionChart();
      updateDataByRegion(currentRegion);
      // console.log("asia");
      break;
    case "Europe":
      currentRegion = "Europe";
      // updateRegionChart();
      updateDataByRegion(currentRegion);
      break;
    case "Africa":
      currentRegion = "Africa";
      // updateRegionChart();
      updateDataByRegion(currentRegion);
      break;
    case "Americas":
      currentRegion = "Americas";
      // updateRegionChart();
      updateDataByRegion(currentRegion);
      break;
    case "Oceania":
      currentRegion = "Oceania";
      // updateRegionChart();
      updateDataByRegion(currentRegion);
      break;
    case "Confirmed":
      currentDataType = 0;
      // updateDataTypeChart();
      // showChart();
      break;
    case "Deaths":
      currentDataType = 3;
      // updateDataTypeChart();
      // showChart();
      break;
    case "Recovered":
      currentDataType = 1;
      // updateDataTypeChart();
      // showChart();
      break;
    case "Critical":
      currentDataType = 2;
      // updateDataTypeChart();
      // showChart();
      break;
  }
}

updateDataByRegion();
