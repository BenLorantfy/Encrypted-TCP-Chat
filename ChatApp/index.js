// File: index.js
// Author: Ben Lorantfy
// Assignment: A1-Cryptography
// Course: Advanced Computer Security
// Date: March 13th, 2017
// Desc: Handles UI logic of chat app

var net = require("net");
var Blowfish = require("./blowfish");
var Reciever = require("./reciever");
var Sender = require("./sender");
var $ = require("jquery");
var key = require("./key");
var bf = new Blowfish(key);

// [ Sender and Reciever to send and recieve messages ]
var sender = null;
var reciever = null;

// [ Displays the user's IP address for reference ]
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    $("#myIP").text(add);
});

// [ Hide page when entered IP ]
$("#ip").focus();
$("#ip").keyup(function(e){
    if(e.keyCode == 13){
        var ip = $(this).val();

        sender = new Sender(ip, function(){
            $("#ipPage").fadeToggle();
        });        
    }
});

// [ UI helper to create messages on screen ]
function addMessage(from, message, encrypted){
    var fromEl = $("<div class='dtc pr2 pb2'></div>").text(from + ":");
    var messageEl = $("<div class='dtc pb2'></div>").append($("<span class='v-mid'></span>").text(message));
    var el = $("<li class='dt-row'></li>").append(fromEl).append(messageEl);

    if(encrypted){
        messageEl.append($("<span class='gray ml1 f6 v-mid'></span>").append("(" + encrypted + ")"));
    }

    if(from == "You"){
        fromEl.addClass("blue")
    }else{
        fromEl.addClass("red");
    }

    $("#messageList").append(el);
}

// [ Send message when user hits enter ]
$("#message").keyup(function(e){
    if(e.keyCode == 13){
        var message = $("#message").val();
        $("#message").val("");
        var encrypted = sender.send(message);           
        addMessage("You", message, encrypted); 
    }
});

// [ Toggle encryption when user clicks checkbox ]
$("#encryptionToggle").click(function(){
    reciever.encrypt = !reciever.encrypt;
    sender.encrypt = !sender.encrypt;
})

// [ Create reciever to listen for messages ]
reciever = new Reciever(function(){
    reciever.onMessage = function(message, encrypted){
        addMessage("Not You", message, encrypted);
    }
});