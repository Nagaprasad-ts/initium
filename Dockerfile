# -------------------------
# Stage 1 — Build frontend
# -------------------------
FROM node:20 AS node_builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# -------------------------
# Stage 2 — Build backend
# -------------------------
FROM php:8.4-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip \
    libicu-dev \
    && docker-php-ext-install intl zip pdo pdo_mysql

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy application
COPY . .

# Copy built frontend from node stage
COPY --from=node_builder /app/public/build ./public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Laravel optimizations
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

EXPOSE 8080

CMD php artisan serve --host=0.0.0.0 --port=8080