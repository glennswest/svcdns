export myIP=$(ip route get 1 | awk '{print $NF;exit}')
echo $myIP
chmod 777 /etc/pdns
chmod 777 /etc/pdns/*
node svcdns.js
