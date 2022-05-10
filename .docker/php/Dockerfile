FROM php:8.1.5RC1-fpm-alpine3.14

RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mysqli

CMD ["php-fpm"]

EXPOSE 9000
