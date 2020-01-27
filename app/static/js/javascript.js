//parameters
var hostname = "broker.mqtt-dashboard.com";
var port = 8000;
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
  client.subscribe('');
  alert("connected.");
}

//Called when the client loses its connection
function onConnectionLost(responseObject){
  if(responseObject.errorCode != 0){
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

//Called when a message arrives
function onMessageArrived(message){
  console.log("Message arrived: topic=" + message.destinationName + ", message" + message.payloadString);
  document.getElementByI('').innerHTML = message.payloadString + ' &#176C';
}

function publish(x) {
  if(!client){
    return;
  }
  var status = document.getElementById(x);
  if (status.innerHTML == 'روشن'){
    status.innerHTML = 'خاموش';
    status.style.color = "#00B2F6";
    alert(x+'/خاموش');
    // var message = new Paho.MQTT.Message(x-'OFF');
    // message.destinationName = "techbeeLED";
    // client.send(message);
  } else {
    status.innerHTML = 'روشن';
    status.style.color = "#ffb80e";
    alert(x+'/روشن');
    // var message = new Paho.MQTT.Message(x-'ON');
    // message.destinationName = "techbeeLED";
    // client.send(message);
  }
}