FROM php:8.0-fpm-alpine3.13

RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mysqli

CMD ["php-fpm"]

EXPOSE 9000
