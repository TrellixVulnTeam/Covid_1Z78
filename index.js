const api = {
  proxy: "https://intense-mesa-62220.herokuapp.com/",
  country: "https://restcountries.herokuapp.com/api/v1",
  covid: "https://corona-api.com/countries/af",
};

const countriesData = {};
const covidData = {};
let currentRegionsInfo = [];

const getRegions = async () => {
  const { data } = await axios.get(api.proxy + api.country);
  console.log("countries", data);

  try {
    data.forEach((country) => {
      countriesData[country.region]
        ? countriesData[country.region].push({ name: country.name.common })
        : (countriesData[country.region] = [{ name: country.name.common }]);
    });
  } catch (err) {
    console.log(err);
  }

  console.log("regions list", countriesData);
};

let covidCountriesList = [];

const getCovid = async () => {
  try {
    const data = await axios.get(api.proxy + api.covid);
    console.log("covid", data);
    covidCountriesList.push(data.data.data);
    return data;
  } catch (err) {
    console.log();
  }
};


getRegions().then(() => {
  getCovid();
});
