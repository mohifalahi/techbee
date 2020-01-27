"""
import paho.mqtt.client as mqtt
import time

def on_log(client, userdata, level, buf):
    print("log: " + buf)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected OK.")
    else:
        print("Not connected, Return code: ",rc)

def on_disconnect(client, userdata, flags, rc=0):
    print("Disconnected, Return code: "+str(rc))

def on_message(client, userdata, msg):
    topic = msg.topic
    m_decode = str(msg.payload.decode("utf-8", "ignore"))
    print("Topic:",topic + ' | ' + "message received:", m_decode)

# host = "broker.mqtt-dashboard.com"
host = "mqtt.eclipse.org"

client = mqtt.Client("",clean_session=True) # Create new instance
client.on_connect = on_connect # Bind callback function
client.on_disconnect = on_disconnect
# client.on_log = on_log
client.on_message = on_message
print("Connecting to:", host)
# client.will_set("Room/sensor", payload=None, qos=2, retain=False)
client.connect(host, port=1883) # connect to broker
# client.loop_start() # loop start
client.subscribe("Room/sensor")
client.publish("Room/sensor", "It is hot!")
# client.loop_forever()
# time.sleep(4)
# client.loop_stop() # loop stop
# client.disconnect()
