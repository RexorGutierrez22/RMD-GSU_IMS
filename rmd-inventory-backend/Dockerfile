# Use official PHP image with specific version
FROM php:8.2-fpm-bullseye

# Set environment variables
ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/composer

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libjpeg-dev \
    libfreetype6-dev \
    libpng-dev \
    libicu-dev \
    libxml2-dev \
    libzip-dev \
    libcurl4-openssl-dev \
    libonig-dev \
    make \
    gcc \
    libtool \
    pkg-config \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd \
        pdo \
        pdo_mysql \
        mbstring \
        bcmath \
        zip \
        opcache \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && echo "PHP extensions installed successfully"

# Install Composer using multi-stage build
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Create non-root user
RUN useradd -r -g www-data -s /sbin/nologin appuser

# Set working directory
WORKDIR /var/www/html

# Copy composer files with proper ownership
COPY --chown=appuser:www-data composer.* ./

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-progress

# Copy application files with proper ownership
COPY --chown=appuser:www-data . .

# Set proper permissions
RUN chown -R appuser:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Generate application key
RUN php artisan key:generate

# Switch to non-root user
USER appuser

# Expose port 8000
EXPOSE 8000

# Start Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
