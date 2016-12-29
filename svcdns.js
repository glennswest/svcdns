require('log-timestamp')(function() { return new Date().toString() + ' %s' });
var fssync = require('fs-sync');
var fs = require('fs');
var util=require('util');
var process=require('process');
var execFile=require('child_process').execFile;
var restify = require('restify');
var client = restify.createJsonClient({url: 'http://127.0.0.1:8081',headers: {'X-API-Key': 'changeme'}});
var Docker = require('dockerode');
var docker = new Docker();
var mqtt = require('mqtt')
var uuid = require('uuid/v4');


var myuuid = uuid();
var server_pid = 0;
var myIP = process.env.myIP;
console.log("My IP is: " + myIP);
var mymqtt  = mqtt.connect('mqtt://' + myIP);
var servicedata = {name: "svcdns",ip: myIP, id: myuuid, version: "v1"};
mymqtt.on('connect', function(){
    mymqtt.publish('servicediscovery',JSON.stringify(servicedata));
    mymqtt.subscribe('svcdnsadd');
    }
)

mymqtt.on('message', function(topic, messagestr){
        message = JSON.parse(messagestr);
        console.log("MQTT: " + topic + " " + util.inspect(message));
        switch(topic){
            case 'svcdnsadd':
                  // Expect - {name: 'myservice.site.com',ip: "192.168.1.1", version: "v1"}
                  hostarray = message.name.split(".");
                  hostname = hostarray.shift();
                  zone = hostarray.join('.');
                  ip = message.domain;
                  console.log("svcdns-add: " + message);
                  // BUG - We should see if domain exists and create it
                  add_host(zone,hostname,ip,null);
                  break;
            default:
               break;
         }

});


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
   thezone.nameservers = ns;

   result = client.post('/api/v1/servers/localhost/zones', thezone, function(err, req, res){
        console.log(util.inspect(err));
        });
}

function add_host(zone,hostname,ip,next){
	thedata = {};
	thehost = {};
	therecord = {};
        thecontent = [];
        thecontentrecord = {};
        thecontentrecord.content = ip;
        thecontentrecord.disabled = false;
        thecontent[0] = thecontentrecord;
	thehost.name = hostname;
	thehost.type = "A";
	thehost.ttl = 86400;
	thehost.changetype="REPLACE";
	thehost.records = thecontent;
	thedata.rrsets = [];
        thedata.rrsets[0] = thehost;
        console.log(util.inspect(thedata));
        console.log(util.inspect(thehost.records));
        url = '/api/v1/servers/localhost/zones/' + zone;
        console.log(util.inspect(url));
	result = client.patch(url, thedata, function(err, req, res){
            console.log(util.inspect(err));
            });
       return(next);
}

function do_base_setup()
{
var myIP = process.env.myIP;

	add_zone("site.com.", null);
        setTimeout(add_host,2000,"site.com.","ns1.site.com.",myIP,null);
}


setTimeout(do_base_setup, 4000);



var server = restify.createServer();
server.get('/check', sendOK);
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


server.listen(9053, function() {
  console.log('%s listening at %s', server.name, server.url);
});

