#!/usr/bin/env bash

# Run database migrations
php artisan migrate --force

# Clear caches
php artisan config:cache
php artisan view:cache
php artisan route:cache

echo "Build completed successfully"
