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

# Copy everything
COPY . .

# Create SQLite database file
RUN mkdir -p database \
    && touch database/database.sqlite

# Install PHP dependencies (no dev)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies
RUN npm install

# Build Vite assets
RUN npm run build

# Set correct permissions
RUN chmod -R 775 storage bootstrap/cache

# Optimize Laravel
RUN php artisan migrate --force && \
    php artisan config:clear && \
    php artisan route:clear && \
    php artisan view:clear

# storage link
RUN php artisan storage:link

EXPOSE 8080

CMD php artisan serve --host=0.0.0.0 --port=8080