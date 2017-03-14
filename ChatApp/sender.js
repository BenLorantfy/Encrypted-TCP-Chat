// File: sender.js
// Author: Ben Lorantfy
// Assignment: A1-Cryptography
// Course: Advanced Computer Security
// Date: March 13th, 2017
// Desc: Connects to a server and sends dat

var net = require('net');
var Blowfish = require("./blowfish");
var key = require("./key");
var bf = new Blowfish(key);

module.exports = function Sender(ip,callback){
    var client = new net.Socket();

    var methods = {
        send:function(message){
            if(methods.encrypt){
                var encrypted = bf.encrypt(message);
                client.write(encrypted + "MSG_DELIM");
                return encrypted;
            }else{
                client.write(message + "MSG_DELIM");
            }

            return null;
        }
    };

    client.connect(5000, ip, function() {
        if(typeof callback === "function"){
            callback();
        }
    });

    client.on('data', function(data) {

    });

    client.on('close', function() {
        console.log('Connection closed');
    });

    return methods;
}
