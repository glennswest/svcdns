#FROM mhart/alpine-node:base-6
FROM mhart/alpine-node:6


RUN export POWERDNS_VERSION=4.0.3 && \
    apk --no-cache add boost-dev sqlite-libs mariadb-client-libs && \
    apk --no-cache add --virtual build-dependencies g++ make mariadb-dev sqlite-dev curl && \
    curl -sSL https://downloads.powerdns.com/releases/pdns-$POWERDNS_VERSION.tar.bz2 | tar xjf - -C /tmp && \
    cd /tmp/pdns-$POWERDNS_VERSION && \
    ./configure --prefix="" --exec-prefix=/usr --sysconfdir=/etc/powerdns --with-modules="gsqlite3" && \
    make && make install && \
    apk del build-dependencies && cd / && rm -rf /tmp/pdns-$POWERDNS_VERSION

RUN sed -i -e 's/v3\.4/v3.5/g' /etc/apk/repositories \
        && apk update \
	&& apk upgrade \
        && apk add tzdata \
        && cp /usr/share/zoneinfo/Asia/Singapore /etc/localtime \
        && apk del tzdata \
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


EXPOSE 8089
EXPOSE 9053
EXPOSE 53

CMD ["ash","./svcdns.sh"]
#CMD ["node", "svcdns.js"]
#CMD ["/usr/sbin/pdns_server"]
