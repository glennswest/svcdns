docker kill dns.ncc9.com
sleep 2
docker rm dns.ncc9.com
sleep 2
docker run -d -p 8081 -p 53 --net=host -v /data/dns.ncc9.com:/data --name dns.ncc9.com svcdns 
