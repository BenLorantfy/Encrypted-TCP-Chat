var net = require("net");
var Blowfish = require("blowfish-security-lib");
var key = require("./key");
var bf = new Blowfish(key);

module.exports = function Reciever(callback){
    var methods = {
        onMessage:function(){}
    };

    // [ Recieve Server ]
    var server = net.createServer((socket) => {
        
        var messages = [];
        var buffer = "";
        var delim = "MSG_DELIM";
        socket.on("data",function(data){
            var str = data.toString();
            
            for(var i = 0; i < str.length; i++){

                // Append charachter to buffer
                buffer += str[i];
                
                // If found delimiter, then clear buffer and start recieving new messages
                // Also push message to message queue
                if(buffer.indexOf(delim) > -1){
                    buffer = buffer.replace(delim,"");

                    if(methods.encrypt){
                        var encrypted = buffer;
                        var message = bf.decrypt(buffer);
                    }else{
                        var encrypted = null;
                        var message = buffer;
                    }

                    messages.push([ message, encrypted ]);
                    buffer = "";
                }
            }

            handleMessages(messages);
        })
    
    }).on('error', (err) => {
        // handle errors here
        throw err;
    });

    function handleMessages(messages){
        for(var i = messages.length - 1; i >= 0; i--){
            methods.onMessage(messages[i][0], messages[i][1]);

            // Remove last message because it's been handeled
            messages.pop();
        }
    }

    server.listen({
        port: 5000,
        exclusive: true
    },function(){

        if(typeof callback === "function"){
            callback();
        }

        console.log('opened server on', server.address());
    });

    return methods;
}