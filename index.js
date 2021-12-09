const api = {
  proxy: "https://intense-mesa-62220.herokuapp.com/",
  country: "https://restcountries.herokuapp.com/api/v1",
  covid: " https://corona-api.com/countries",
};

let countries = {};
let covid = {};

const getCountries = async () => {
  const country = await axios.get("https://corona-api.com/countries/AF", [
    {
      headers: "application/json",
    },
  ]);

 
  const heirarchy = country.data.data.latest_data;
  const data = [
    heirarchy.deaths,
    heirarchy.confirmed,
    heirarchy.recovered,
    heirarchy.critical,
  ];
  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Deaths", "Confirmed", "Recovered", "Critical"],
      datasets: [
        {
          label: "# of Cases",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
getCountries();


// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/EricChukoltyansky/Covid.git
// git push -u origin main