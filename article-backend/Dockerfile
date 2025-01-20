FROM php:8.2.1-fpm
# Set working directory inside the container
WORKDIR /var/www/html

#Making sure the packages are up to date
RUN apt-get update && apt-get upgrade -y

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    cron \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    supervisor \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Install Composer (PHP package manager)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the Laravel backend code into the container
COPY ./article-backend /var/www/html

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Set proper permissions (depending on your setup)
RUN chown -R www-data:www-data /var/www/html

# Set environment variable for Laravel
ENV APP_ENV=production

# Copy crontab configuration file and set cron
COPY ./article-backend/crontab /etc/cron.d/laravel-cron
RUN chmod 0644 /etc/cron.d/laravel-cron

# Ensure the cron service is started in the background
RUN touch /var/log/cron.log

# Copy supervisord config
COPY ./article-backend/supervisord.conf /etc/supervisor/supervisord.conf

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start supervisor in the foreground
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
