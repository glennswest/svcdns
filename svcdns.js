require('log-timestamp')(function() { return new Date().toString() + ' %s' });
var fssync = require('fs-sync');
var fs = require('fs');
var util=require('util');
var process=require('process');
var execFile=require('child_process').execFile;
var restify = require('restify');
headers =  {'X-API-Key': 'F00FB000'};
var client = restify.createJsonClient({url: 'http://127.0.0.1:8081/api/v1/servers/localhost'});
var Docker = require('dockerode');
var docker = new Docker();


var server_pid = 0;


// Start up server
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

function add_zone(zonename){
   thezone = {};
   ns = [];
   thename = 'ns1.' + zonename;
   ns.push(thename);
   thezone.name = zonename;
   thezone.kind = "Native";
   thezone.masters = [];
   thezone.nameservers = ns.
   result = client.post('/zones', thezone, function(err, req, res){
        console.log(util.inspect(err));
        });
}

myIP = process.env.myIp;
setTimeout(add_zone, 5000, "site.com");



var server = restify.createServer();
server.get('/check', sendOK);
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


server.listen(9053, function() {
  console.log('%s listening at %s', server.name, server.url);
});

