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

var myDomain = "site.com.";

work_q = [];
zones = [];

function get_line(filename, line_no){
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");

    if(+line_no > lines.length){
      throw new Error('File end reached without finding line');
    }

    return(lines[+line_no]);
}

if (fs.existsSync("/data/domain")){
   myDomain = get_line('/data/domain', 0) + ".";
   console.log("Domain Set To: " + myDomain);
   }

function process_work(){
	e = work_q.pop();
        if (!e) return;
        console.log(util.inspect(e));
        console.log("process_work: Adding: " + e.name);
        add_host(e.zone, e.name, e.ip, process_work());
}

function mymqtt_server(){
var myIP = process.env.myIP;
var servicedata = {name: "svcdns",ip: myIP, id: myuuid, version: "v1"};

           var mymqtt  = mqtt.connect('mqtt://' + myIP);
           mymqtt.on('message', function(topic, messagestr){
              message = JSON.parse(messagestr);
              console.log("MQTT: " + topic + " " + util.inspect(message));
              switch(topic){
                 case 'svcdnsadd':
                    // Expect - {name: 'myservice.site.com',ip: "192.168.1.1", version: "v1"}
                    hostarray = message.name.split(".");
                    hostname = message.name
                    zone = hostarray.shift();
                    zone = hostarray.join('.');
                    zone += ".";
                    hostname += ".";
                    ip = message.ip;
                    if  (zone == '.'){
                        zone = myDomain;
                        hostname = hostname + zone;
                        }
                    console.log('svcdnsadd: ' + message);
                    console.log('svcdnsadd: ' + hostname  + ' zone: ' + zone + ' ip: ' + ip);
                    // BUG - We should see if domain exists and create it
                    add_host(zone,hostname,ip,null);
                    break;
                 case 'svcdnssync':
                    // Expect a: [{zone: "site.com.", name: "svcdns.site.com.", ip: "192.168.1.170"},...]
                    console.log("svcdnssync: " + util.inspect(message.a));
                    message.a.forEach(function(e){
                         work_q.push(e);
                         });
                    process_work();
                    break;
                 default:
                    break;
             }

           });
        console.log("Publish Service Discovery Message - " + util.inspect(servicedata));
    	mymqtt.publish('servicediscovery',JSON.stringify(servicedata));
        mymqtt.subscribe('svcdnsadd');
        mymqtt.subscribe('svcdnsadd');
        mymqtt.subscribe('svcdnssync');
}

// Start up server
function restart_server(data){

        if (!data){
           console.log("Starting PDNS");
          } else {
           console.log("PDNS - " + data + "Restarting");
          }
        if (!fs.existsSync("/data/powerdns.sqlite")) {
           console.log("Create base PowerDNS Database");
           fssync.copy("/etc/pdns/pdns.conf", "/data/pdns.conf");
           fssync.copy("/etc/pdns/powerdns.sqlite", "/data/powerdns.sqlite");
           fs.chmodSync("/data/powerdns.sqlite", 0777);
           console.log("Database Copied Successful");
           }
        child = execFile('/usr/sbin/pdns_server',[], {cwd: "/data"}, (error, stdout, stderr) => {
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

function rid_end_dot(name){
	if (name.slice(-1) == '.'){
           name  = name.slice(0,-1);
           return name;
         } else {
           return name;
           }
}

function add_zone(zonename,next){

   thezone = {};
   ns = [];
   thename = 'ns1.' + zonename;
   ns.push(thename);
   thezone.name = zonename;
   thezone.kind = "Native";
   thezone.masters = [];
   thezone.nameservers = ns;
   console.log("add_zone: " + zonename);
   zones.push(rid_end_dot(zonename));
   

   result = client.post('/api/v1/servers/localhost/zones', thezone, function(err, req, res){
        console.log(util.inspect(err));
        if (next) setTimeout(next,1000);
        });
}

function add_host(zone,hostname,ip,next){
        console.log("add_host: " + util.inspect(zones));
        if (zones.indexOf(rid_end_dot(zone)) == -1){ // No zone
           // Automatically add zone
           //zones.push(rid_end_dot(zone));
           add_zone(zone,function(){
                         add_host(zone,hostname,ip,null);
                         });
           return;
           }
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
	thehost.ttl = 3600;
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
            return(next);
            });
       return;
}

function do_base_setup()
{
var myIP = process.env.myIP;

	add_zone(myDomain, null);
        ns1name = "ns1." + myDomain;
        setTimeout(add_host,2000,myDomain,ns1name,myIP,null);
}


setTimeout(do_base_setup, 3000);
setTimeout(mymqtt_server, 7000); // Start after everything settle



var server = restify.createServer();
server.get('/check', sendOK);
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


server.listen(9053, function() {
  console.log('%s listening at %s', server.name, server.url);
});

