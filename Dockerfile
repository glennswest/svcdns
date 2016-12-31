#FROM mhart/alpine-node:base-6
FROM mhart/alpine-node:6


RUN sed -i -e 's/v3\.4/v3.5/g' /etc/apk/repositories \
        && apk update \
	&& apk upgrade \
        && apk add tzdata \
        && cp /usr/share/zoneinfo/Asia/Singapore /etc/localtime \
        && apk del tzdata \
        && apk add pdns \
        && apk add pdns-backend-sqlite3 \
	&& rm -rf /var/cache/apk/* \
        && echo "Asia/Singapore" > /etc/timezone \
	&&  mkdir -p /usr/src/app 

COPY pdns.sql /etc/pdns
COPY pdns.conf /etc/pdns
WORKDIR /etc/pdns
RUN sqlite3 powerdns.sqlite < pdns.sql        

WORKDIR /usr/src/app

#Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
COPY svcdns.sh /usr/src/app


EXPOSE 8081
EXPOSE 9053
EXPOSE 53
CMD ["ash","./svcdns.sh"]
#CMD ["node", "svcdns.js"]
#CMD ["/usr/sbin/pdns_server"]
