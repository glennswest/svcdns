docker build -t svcdns .
docker tag svcdns ctl.ncc9.com:5000/svcdns
docker push ctl.ncc9.com:5000/svcdns

