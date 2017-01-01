docker kill svcdns.site.com
docker rm svcdns.site.com
docker run -d -p 8081 --net=host --name svcdns.site.com svcdns
