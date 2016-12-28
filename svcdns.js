require('log-timestamp')(function() { return new Date().toString() + ' %s' });
var fssync = require('fs-sync');
var fs = require('fs');
var util=require('util');
var process=require('process');
var execFile=require('child_process').execFile;
var restify = require('restify');
var Docker = require('dockerode');
var docker = new Docker();


var server_pid = 0;


// Start up haproxy
function restart_server(data){

        if (!data){
           console.log("Starting PDNS");
          } else {
           console.log("PDNS - " + data + "Restarting");
          }
        child = execFile('/usr/sbin/pdns_server',[], {cwd: "/etc/pdns"}, (error, stdout, stderr) => {
                if (error){
                   console.log(stderr);
                   console.log("Error On Exec: " + util.inspect(error) + "");
                   }
                console.log(stdout);
                //restart_server("Restarting PDNS");
                });
        console.log("Server PID= " + util.inspect(child.pid) + "");
        child.stderr.on('data',function(data){
            console.log(data.toString());
            });
        child.stdout.on('data',function(data){
            console.log(data.toString());
            });
        server_pid = child.pid;
}

restart_server();

function sendOK(req, res, next){
  res.statusCode = 200;
  res.send();
  next();
}

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}


var server = restify.createServer();
server.get('/check', sendOK);
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


server.listen(9053, function() {
  console.log('%s listening at %s', server.name, server.url);
});

