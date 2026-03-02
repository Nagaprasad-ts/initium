FROM php:8.4-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip \
    libicu-dev \
    nodejs npm \
    && docker-php-ext-install intl zip pdo pdo_mysql

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy app files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies
RUN npm install

# Build Vite (NOW php exists, so wayfinder works)
RUN npm run build

# Laravel optimizations
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

EXPOSE 8080

CMD php artisan serve --host=0.0.0.0 --port=8080