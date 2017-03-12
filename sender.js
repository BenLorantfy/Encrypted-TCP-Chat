var net = require('net');
var Blowfish = require("blowfish-security-lib");
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
        console.log('Connected');
        // client.write('Hello, server! Love, Client.');

        if(typeof callback === "function"){
            callback();
        }
    });

    client.on('data', function(data) {
        // console.log('Received: ' + data);
        // client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });

    return methods;
}
