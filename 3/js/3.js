const chatInput = document.querySelector(".message"),
    sendBtn = document.querySelector(".btn"),
    geoBtn = document.querySelector(".geo"),
    chatWindow = document.querySelector(".chat-window");
let websocket;
    
function writeMessage(source, message) {
    let messageElem = document.createElement("p");

    messageElem.classList.add(`${source}-message`);
    messageElem.innerHTML = message;
    chatWindow.appendChild(messageElem);
}

function openConnection() {
    websocket = new WebSocket("wss://echo-ws-service.herokuapp.com");

    websocket.onopen = function(e) {
        console.log("Сonnected");
    }

    websocket.onclose = function(e) {
        console.log("Disconnected");
    }

    websocket.onmessage = function(e) {
        if (!/>Геолокация<\/a>$/.test(e.data)) {
            writeMessage("server", e.data);
        }
    }

    websocket.onerror = function(e) {
        writeMessage("server", `Error: ${e.data}`);
    }
}
openConnection();

function startChat() {
    const message = chatInput.value;

    writeMessage("user", message);
    websocket.send(message);
}

const geoSucces = (position) => {
    const message = `<a href="https://www.openstreetmap.org/#map=17/${position.coords.latitude}/${position.coords.longitude}" target="_blank">Геолокация</a>`;

    writeMessage("user", message);
    websocket.send(message);
}

const geoError = () => {
    alert("Невозможно получить ваше местоположение");
}

function getGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(geoSucces, geoError);
    } else {
        alert("Геолокация не поддерживается вашим браузером");
    }
}

sendBtn.addEventListener("click", startChat);
geoBtn.addEventListener("click", getGeolocation);