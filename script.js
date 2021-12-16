
const ID_prefix = "CE";
const ID_seasonal ="U";
const SectorCodes =
      {"00":"Total nonfarm",
       "05":"Total private",
       "06":"Goods-producing:",
       "07":"Service-providing:",
       "08":"Private service-providing",
       "10":"Mining and logging",
       "20":"Construction",
       "30":"Manufacturing",
       "31":"Durable Goods",
       "32":"Nondurable Goods",
       "40":"Trade, transportation, and utilities",
       "41":"Wholesale trade",
       "42":"Retail trade",
       "43":"Transportation and warehousing",
       "44":"Utilities",
       "50":"Information",
       "55":"Financial activities",
       "60":"Professional and business services",
       "65":"Education and health services",
       "70":"Leisure and hospitality",
       "80":"Other services",
       "90":"Government"};
let ID_supersector = Object.keys(SectorCodes)
const ID_industry ="000000";
const ID_datatype = "01";
let count=0;

// These are colors from chart.js utils
    const CHART_COLORS = {
      "1": 'rgb(255, 99, 132)',
      "2": 'rgb(255, 159, 64)',
      "3": 'rgb(255, 205, 86)',
      "4": 'rgb(75, 192, 192)',
      "5": 'rgb(54, 162, 235)',
      "6": 'rgb(153, 102, 255)',
      "7": 'rgb(201, 203, 207)',
      "8": 'rgb(100, 203, 207)',
      "9": 'rgb(201, 100, 207)',
      "10": 'rgb(201, 203, 100)',
      "11": 'rgb(50, 100, 207)',
      "12": 'rgb(201, 50, 100)',
      "13": 'rgb(100, 203, 50)',
      "14": 'rgb(100, 50, 207)',
      "15": 'rgb(33, 60, 207)',
      "16": 'rgb(201, 33, 60)',
      "17": 'rgb(60, 203, 33)',
      "18": 'rgb(48, 93, 207)',
      "19": 'rgb(201, 48, 93)',
      "20": 'rgb(93, 203, 48)',
      "21": 'rgb(255, 0, 40)',
      "22": 'rgb(40, 0, 255)'

    };
//    console.dir(CHART_COLORS);

    const CHART_COLORS_50_Percent = {
      "1": 'rgba(255, 99, 132, 0.5)',
      "2": 'rgba(255, 159, 64, 0.5)',
      "3": 'rgba(255, 205, 86, 0.5)',
      "4": 'rgba(75, 192, 192, 0.5)',
      "5": 'rgba(54, 162, 235, 0.5)',
      "6": 'rgba(153, 102, 255, 0.5)',
      "7": 'rgba(201, 203, 207, 0.5)',
      "8": 'rgb(100, 203, 207,0.5)',
      "9": 'rgb(201, 100, 207,0.5)',
      "10": 'rgb(201, 203, 100,0.5)',
      "11": 'rgb(50, 100, 207,0.5)',
      "12": 'rgb(201, 50, 100,0.5)',
      "13": 'rgb(100, 203, 50,0.5)',
      "14": 'rgb(100, 50, 207,0.5)',
      "15": 'rgb(33, 60, 207,0.5)',
      "16": 'rgb(201, 33, 60,0.5)',
      "17": 'rgb(60, 203, 33,0.5)',
      "18": 'rgb(48, 93, 207,0.5)',
      "19": 'rgb(201, 48, 93,0.5)',
      "20": 'rgb(93, 203, 48,0.5)',
      "21": 'rgb(255, 0, 40,0.5)',
      "22": 'rgb(40, 0, 255,0.5)'
    };

//    console.log(CHART_COLORS_50_Percent);
//    end utils
    const data = {
      labels: [],
      datasets: []
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };

function responseReceivedHandler() {
    if (this.status == 200) {
    	console.log(this.response);
      let dataArray = this.response.Results.series[0].data;
      let seriesID = this.response.Results.series[0].seriesID;
      let lineBySector = {
        label : [],
        data : [],
        borderColor: [],
        backgroundColor: [],
        hidden : true
      }

      lineBySector.label = (SectorCodes[seriesID.substring(3,5)])
      console.log("length=" + dataArray.length)
      for (let i = dataArray.length -1; i >= 0; i--){
        lineBySector.data.push(dataArray[i].value)
        console.log("count="+count)
        if (count == 0 ){
          console.log(dataArray[i])
          data.labels.push(dataArray[i].periodName + "/" + dataArray[i].year)

      }


    }

    lineBySector.borderColor=CHART_COLORS[count]
    lineBySector.backgroundColor=CHART_COLORS_50_Percent[count]


      console.log(data.labels);

      data.datasets.push(lineBySector)
      count++

        if (count == ID_supersector.length){
          const myChart = new Chart(
            document.getElementById('myChart'),
            config);
        }
        } else {
    	console.log ("error");
        }
      }


for (let i=0; i<ID_supersector.length; i++){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType = "json";
  let APIkey = "";
  let endQuery = "?registrationkey="+APIkey
  console.log("https://api.bls.gov/publicAPI/v2/timeseries/data/"+ID_prefix+ID_seasonal+ID_supersector[i]+ID_industry+ID_datatype+endQuery);
  xhr.open("GET","https://api.bls.gov/publicAPI/v2/timeseries/data/"+ID_prefix+ID_seasonal+ID_supersector[i]+ID_industry+ID_datatype+endQuery);
  xhr.send();
}
