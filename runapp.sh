docker kill svcdns.site.com
docker rm svcdns.site.com
docker run -d -P --net=host --name svcdns.site.com svcdns
