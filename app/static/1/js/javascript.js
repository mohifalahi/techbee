<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.2/mqttws31.min.js"></script>

//parameters
var hostname = "mqtt.eclipse.org";
var port = 80;
var ClientID = "ClientID_" + parseInt(Math.random()*100);
// var HouseID = "House_" + parseInt(Math.random()*1000000);

//Create a client instance
var client = new Paho.MQTT.Client(hostname, Number(port), ClientID);

//Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect the client
client.connect(
  {onSuccess: onConnect}
);

//Called when client connects
function onConnect() {
  //Once a connection has been established, make a subscription and send a message
  console.log("onConnect");
  client.subscribe("DHT001");
  // client.subscribe("humSensor");
  client.subscribe("airQualitySensor");
  client.subscribe("node1");
  alert("Connected.");
}

//Called when the client loses its connection
function onConnectionLost(responseObject){
  if(responseObject.errorCode != 0){
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

//Called when a message arrives
function onMessageArrived(message) {
  console.log("Message arrived: topic=" + message.destinationName + ", message=" + message.payloadString);
  if (message.destinationName == "DHT001") {
    var tempHum = message.payloadString.split("/");
    if (tempHum[0] == "T") {
      var temp = parseInt(tempHum[1], 10);
      document.getElementById("پذیرایی/حسگر دما").innerHTML = temp + '&degC';
      addTempData(temp);
    }
    else {
      var hum = parseInt(tempHum[1], 10);
      document.getElementById("پذیرایی/حسگر رطوبت").innerHTML = hum + '%';
      addHumData(hum);
    }
  }
  /*
  if (message.destinationName == "tempSensor") {
    document.getElementById("پذیرایی/حسگر دما").innerHTML = message.payloadString + '&degC';
    var tempData = message.payloadString;
    addTempData(tempData);
  }
  else if (message.destinationName == "humSensor") {
    document.getElementById("پذیرایی/حسگر رطوبت").innerHTML = message.payloadString + '%';
    var humData = message.payloadString;
    addHumData(humData);
  }
  */
  else if(message.destinationName == "airQualitySensor") {
    document.getElementById("پذیرایی/حسگر کیفیت هوا").innerHTML = message.payloadString + 'ppm';
    var airData = message.payloadString;
    addAirData(airData);
  }
  else if (message.destinationName == "node1") {
    var switchState = message.payloadString;
  }
}

var str = switchState;
  arr = str.split("/");
  if (arr[1] == '2') {
    $(document).ready(function(){
      var id = arr[0];
        // if($("#state"+id).is(':checked')) {
        //   $("#state"+id).attr("checked", true);
        // }
        // else {
        //   $("#state"+id).attr("checked", false);
        // }
        $("#switch"+id).click();
    });
  }

function publish(x) {
  if(!client){
    return;
  }
  var status = document.getElementById(x);
  if (status.innerHTML == 'روشن'){
    status.innerHTML = 'خاموش';
    status.style.color = "#00B2F6";
    var message = new Paho.MQTT.Message("0");
    message.destinationName = "flora001";
    client.send(message);
  } else {
    status.innerHTML = 'روشن';
    status.style.color = "#ffb80e";
    var message = new Paho.MQTT.Message("1");
    message.destinationName = "flora";
    client.send(message);
  }
}

  var chart1 = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Living Room',
      borderColor: '#17A2B8',
      data: [],
      fill: true,
      backgroundColor: '#B3D9E0'
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: ''
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Temperature'
        }
      }]
    }
  }
};

  var chart2 = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Living Room',
        borderColor: '#ffc107',
        data: [],
        fill: true,
        backgroundColor: '#fcdb03'
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: ''
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Humidity'
          }
        }]
      }
    }
  };

  var chart3 = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Living Room',
        borderColor: '#ff6e6e',
        data: [],
        fill: true,
        backgroundColor: '#ffa6a6'
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: ''
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Air Quality'
          }
        }]
      }
    }
  };

  window.onload = function() {
    var ctx1 = document.getElementById('tempChart').getContext('2d');
    window.myLine1 = new Chart(ctx1, chart1);
    var ctx2 = document.getElementById('humChart').getContext('2d');
    window.myLine2 = new Chart(ctx2, chart2);
    var ctx3 = document.getElementById('airChart').getContext('2d');
    window.myLine3 = new Chart(ctx3, chart3);
  };

  function addTempData(sensorData){
    d = new Date();
    if (chart1.data.datasets.length > 0) {
      chart1.data.labels.push('(' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ') ' + d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate());
      setTimeout(Action, 30000);
      chart1.data.datasets.forEach(function(dataset) {
        dataset.data.push(sensorData);
      });
      function Action() {
        chart1.data.labels.shift();
        chart1.data.datasets.forEach(function(dataset) {
          dataset.data.shift();
        });
      }
    window.myLine1.update();
    }
  };

  function addHumData(sensorData){
    d = new Date();
    if (chart2.data.datasets.length > 0) {
      chart2.data.labels.push('(' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ') ' + d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate());
      chart2.data.datasets.forEach(function(dataset) {
        dataset.data.push(sensorData);
      });
      setTimeout(Action, 30000);
      function Action() {
        chart2.data.labels.shift();
        chart2.data.datasets.forEach(function(dataset) {
          dataset.data.shift();
        });
      }
    window.myLine2.update();
    }
  };

  function addAirData(sensorData){
    d = new Date();
    if (chart3.data.datasets.length > 0) {
      chart3.data.labels.push('(' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ') ' + d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate());
      chart3.data.datasets.forEach(function(dataset) {
        dataset.data.push(sensorData);
      });
      setTimeout(Action, 360000);
      function Action() {
        chart3.data.labels.shift();
        chart3.data.datasets.forEach(function(dataset) {
          dataset.data.shift();
        });
      }
    window.myLine3.update();
    }
  };