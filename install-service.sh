cp svcdns.service /etc/systemd/system/svcdns.service
systemctl disable svcdns.service
systemctl enable svcdns.service
systemctl start svcdns.service
