import paho.mqtt.client as mqtt
from decouple import config

MQTT_BROKER = config('MQTT_BROKER')
MQTT_PORT = int(config('MQTT_PORT'))  # Certifique-se de converter para inteiro
MQTT_USERNAME = config('MQTT_USERNAME')
MQTT_PASSWORD = config('MQTT_PASSWORD')


# Tópicos MQTT
MQTT_TOPIC_SENSOR = "casa/reservatorio"
MQTT_TOPIC_LED = "casa/bomba/cmd"

# Armazena o último valor recebido
sensor_data = {"value": None}

# Callback ao conectar no broker
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Conectado ao broker MQTT")
        client.subscribe(MQTT_TOPIC_SENSOR)
    else:
        print(f"Erro ao conectar ao broker. Código: {rc}")

# Callback ao receber mensagem
def on_message(client, userdata, msg):
    global sensor_data
    try:
        sensor_data["value"] = float(msg.payload.decode("utf-8"))
        print(f"Mensagem recebida: {sensor_data['value']} no tópico {msg.topic}")
    except ValueError:
        print(f"Erro ao converter payload: {msg.payload}")

# Publica mensagem no tópico
def publish_message(message):
    try:
        print(f"Publicando mensagem: {message}")
        client = mqtt.Client()
        client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
        client.tls_set()  # Conexão segura
        client.connect(MQTT_BROKER, MQTT_PORT)
        client.publish(MQTT_TOPIC_LED, message)
        client.disconnect()
    except Exception as e:
        print(f"Erro ao publicar mensagem: {e}")


# Configura o cliente MQTT
client = mqtt.Client()
client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
client.tls_set()
client.on_connect = on_connect
client.on_message = on_message
client.connect(MQTT_BROKER, MQTT_PORT)
client.loop_start()
