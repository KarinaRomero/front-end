'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const access_token = "Your_Token"

const app = express();

// Configurando el puerto
app.set('port', 5000);

// Para recibir mensajes con JSON
app.use(bodyParser.json());

// Definiendo la ruta principal
app.get('/', function(request, response) {
    response.send("hola mundo!")
});

// Definiendo la ruta para conectarnos con la aplicación
app.get('/webhook', function(request, response) {
    // Verificando el toquen que nos ha enviado la app
    if(request.query['hub.verify_token'] === 'Your_Key_token') {
        response.send(request.query['hub.challenge']);
    } else {
        response.send('You can not access');
    }
})

// Este bloque de código permite recibir mensajes desde el chat de facebook
app.post('/webhook/', function(request, response) {
    const webhook_event = request.body.entry[0];
    if(webhook_event.messaging){
        webhook_event.messaging.forEach(element => {
            console.log(element);
            /*handleMessage(element);*/
            handleEvent(event.sender.id, event);
        });
    }
    response.sendStatus(200);
})

// Manejador de eventos
function handleEvent(senderId, event){
    if(event.message){
        handleMessage(senderId, event.message);
    } else if (event.postback) {
        handlePostback(senderId, event.postback.payload);
    }
}
function handlePostback(senderId, payload) {
    switch(payload) {
        case "GET_STARTED_RECETARIO":
            console.log(payload);
          break;
        case y:
          // code block
          break;
        default:
          // code block
    }
}
// Manejador de mensajes
function handleMessage(senderId, event){
    if(event.text){
        defaultMessage(senderId);
    } else if(event.attachments){
        handleAttachment(senderId, event);
    }
}

function handleAttachment(senderId, event){
    let attachment_type = event.attachments[0].type;
    switch(attachment_type) {
        case "image":
            console.log(attachment_type);
          break;
        case "video":
            console.log(attachment_type);
          break;
        case "audio":
            console.log(attachment_type);
        break;
        case "file":
            console.log(attachment_type);
        break;
        default:
    }
}

function defaultMessage(senderId){
    const messageData = {
        "recipient": {
            "id":senderId
        },
        "message": {
            "text": "Hola soy un bot, te invito a utilizar nuesto menú",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "¿Quieres otra receta?",
                    "payload": "RECIPES_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Acerca de",
                    "payload": "ABOUT_PAYLOAD"
                }
            ]
        }
    }
    callSendApi(messageData);
}
function showMenu(senderId) {}
// Maneja los estados del chat como visto
function senderAction(senderId){
    const messageData = {
        "recipient": {
            "id": senderId
        }
    }
}

// Esta funcion sire para manejar los mensajes
/*function handleMessage(event) {
    const senderId = event.sender.id;
    const messageText = event.message.text;
    const messageData = {
        recipient: {
            id: senderId
        },
        message: {
            text: messageText
        }
    };
    callSendApi(messageData);
}*/

// Esta funcion es el core de la aplicacion para enviar mensajes y presentarlos al bot
function callSendApi(response) {
    // request permite enviar la informacion a el bot
    // El mensaje se compone de la
    // URL de facebook,
    // el token generado por facebook
    // el método por el cual se enviara la respuesta al bot
    // el json de respuesta
    request ({
        "uri": "https://graph.facebook.com/me/messages/",
        "qs": {
            "access_token": access_token
        },
        "method":"POST",
        "json":response
        },
        function(err) {
            if(err) {
                console.log('Request error', err)
            } else {
                console.log("Message sended")
            }
        }
    )
}

app.listen(app.get('port'), function() {
    console.log('Server is working: ', app.get('port'));
});