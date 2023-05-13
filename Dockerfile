#see refrence -> https://stackoverflow.com/questions/45432203/how-to-install-pgsql-driver-on-docker-php7-1-apache
#php versions are mismatched. cant find a list of image versions so it stays as such
FROM php:7.2-apache

# php           #######################
RUN a2dismod mpm_event
RUN a2enmod mpm_prefork \
    php7 \
    ssl
RUN apt-get update
RUN apt-get install -y libpq-dev \
    postgresql-client
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql 

# apache config #######################
COPY ./other_configs/apache2.conf /etc/apache2/apache2.conf

# php config    #######################
COPY ./other_configs/php/php.ini /usr/local/etc/php/php.ini

# src           #######################
WORKDIR /var/
COPY ./private_request/ ./private_request/

WORKDIR /var/www/
COPY ./htdocs/ ./html/
COPY ./request/ ./request/
ADD ./images/ ./images/
ADD ./icons/ ./icons/

RUN service apache2 restart

EXPOSE 80

#docker run --name="aphpchefiddle" --memory="2g" -dit -p 8080:80 --cpus="1.5" aphpche