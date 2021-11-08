FROM ubuntu:20.04

ENV timezone=America/Sao_Paulo

RUN apt-get update && \
    ln -snf /usr/share/zoneinfo/${timezone} /etc/localtime && echo ${timezone} > /etc/timezone && \
    apt-get install -y apache2 && \
    apt-get install -y php && \
    apt-get install -y php7.4-mysql && \
    apt-get install -y php7.4-simplexml && \
    apt-get install -y php7.4-mbstring && \
    apt-get install -y php7.4-gd &&  \
    apt-get install -y php7.4-sqlite3 && \
    apt-get install -y zip && \
    apt-get install -y unzip && \
    apt-get install -y curl && \
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php composer-setup.php && rm composer-setup.php && mv composer.phar /usr/local/bin/composer && chmod a+x /usr/local/bin/composer && \
    cd ~ && curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs && \
    a2enmod rewrite && service apache2 restart

EXPOSE 80
EXPOSE 8080

WORKDIR /var/www/html

ENTRYPOINT /etc/init.d/apache2 start && /bin/bash

CMD ["true"]