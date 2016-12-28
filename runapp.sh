docker kill svcdns.site.com
docker rm svcdns.site.com
docker run -d -p 80 --net=host --name svcdns.site.com svcdns
