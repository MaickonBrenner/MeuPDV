#!/bin/bash

echo "🔄 Verificando banco de dados..."

if [ -f /var/www/html/data/meupdv.db ]; then
  echo "✅ Banco SQLite detectado em /var/www/html/data/meupdv.db"
else
  echo "⚠️ Banco não encontrado, criando novo..."
  # sqlite3 /var/www/html/data/meupdv.db "CREATE TABLE IF NOT EXISTS exemplo(id INTEGER PRIMARY KEY);"
fi

chmod 755 /var/www/html/data
chmod 644 /var/www/html/data/meupdv.db
chown -R www-data:www-data /var/www/html/data

echo "🚀 Iniciando Apache..."
exec apache2-foreground
