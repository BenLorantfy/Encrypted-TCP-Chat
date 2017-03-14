// Starts electron cross platform
// http://stackoverflow.com/a/32993213/3006989

var exec = require('child_process').exec;

var command_line = "";
var environ = (!process.argv[2].indexOf('development')) ? 'development' : 'production';

if(process.platform === 'win32') {
    command_line = ".\\node_modules\\.bin\\electron .";
    command_line = 'set NODE_ENV=' + environ + '&& ' + command_line;
} else {
    command_line = "./node_modules/.bin/electron .";
    command_line = 'NODE_ENV=' + environ + ' ' + command_line;
}

var command = exec(command_line);

command.stdout.on('data', function(data) {
    process.stdout.write(data);
});
command.stderr.on('data', function(data) {
    process.stderr.write(data);
});
command.on('error', function(err) {
    process.stderr.write(err);
});