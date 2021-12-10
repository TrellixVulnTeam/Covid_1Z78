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
        backgroundColor: [
          "#FF6633",
          "#FFB399",
          "#FF33FF",
          "#FFFF99",
          "#00B3E6",
          "#E6B333",
          "#3366E6",
          "#999966",
          "#99FF99",
          "#B34D4D",
          "#80B300",
          "#809900",
          "#E6B3B3",
          "#6680B3",
          "#66991A",
          "#FF99E6",
          "#CCFF1A",
          "#FF1A66",
          "#E6331A",
          "#33FFCC",
          "#66994D",
          "#B366CC",
          "#4D8000",
          "#B33300",
          "#CC80CC",
          "#66664D",
          "#991AFF",
          "#E666FF",
          "#4DB3FF",
          "#1AB399",
          "#E666B3",
          "#33991A",
          "#CC9999",
          "#B3B31A",
          "#00E680",
          "#4D8066",
          "#809980",
          "#E6FF80",
          "#1AFF33",
          "#999933",
          "#FF3380",
          "#CCCC00",
          "#66E64D",
          "#4D80CC",
          "#9900B3",
          "#E64D66",
          "#4DB380",
          "#FF4D4D",
          "#99E6E6",
          "#6666FF",
        ],
        borderColor: ["green", "red", "yellow", "blue", "brown"],
        borderWidth: 2,
      },
    ],
  },
  options: {
    spanGaps: true,
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

// function showChart() {
//   // document.querySelector(".chart-container").style.visibility = "visible";
//   // document.querySelector(".country-info").style.visibility = "hidden";
// }

let currentDataType = 0;

function updateDataByRegion(region) {
  getInfoByregion(region);
  removeData(myChart);

  for (let info of Object.values(currentRegionInfo)) {
    addData(myChart, info[0], info[1][currentDataType]);
  }
}

function updateDataType(dataType) {
  removeData(myChart);
  currentDataType = dataType;
  for (let info of Object.values(currentRegionInfo)) {
    addData(myChart, info[0], info[1][dataType]);
  }
}

function updateHeadline(country, data) {
  switch (data) {
    case 0:
      data = "Confirmed";
      break;
    case 1:
      data = "Recovered";
      break;
    case 2:
      data = "Critical";
      break;
    case 3:
      data = "Deaths";
      break;
  }
  myChart.data.datasets[0].label = `${country} - ${data}`;
  myChart.update();
}

document.querySelector(".buttons").addEventListener("click", buttonsSwitch);

let currentRegion;
function buttonsSwitch(event) {
  switch (event.target.innerText) {
    case "Asia":
      currentRegion = "Asia";
      updateDataByRegion(currentRegion);
      updateHeadline(currentRegion, currentDataType);
      console.log(currentRegion);
      break;
    case "Europe":
      currentRegion = "Europe";

      updateDataByRegion(currentRegion);
      updateHeadline(currentRegion, currentDataType);
      console.log(currentRegion);
      break;
    case "Africa":
      currentRegion = "Africa";

      updateDataByRegion(currentRegion);
      updateHeadline(currentRegion, currentDataType);
      console.log(currentRegion);
      break;
    case "Americas":
      currentRegion = "Americas";
      updateDataByRegion(currentRegion);
      updateHeadline(currentRegion, currentDataType);
      console.log(currentRegion);
      break;
    case "Oceania":
      currentRegion = "Oceania";

      updateDataByRegion(currentRegion);
      updateHeadline(currentRegion, currentDataType);
      console.log(currentRegion);
      break;
    case "Confirmed":
      // showChart();
      updateDataType(0);
      updateHeadline(currentRegion, 0);
      console.log(currentRegion);
      break;
    case "Deaths":
      // showChart();
      updateDataType(3);
      updateHeadline(currentRegion, 3);
      console.log(currentRegion);
      break;
    case "Recovered":
      // showChart();
      updateDataType(1);
      updateHeadline(currentRegion, 1);
      console.log(currentRegion);
      break;
    case "Critical":
      // showChart();
      updateDataType(2);
      updateHeadline(currentRegion, 2);
      console.log(currentRegion);
      break;
  }
}
