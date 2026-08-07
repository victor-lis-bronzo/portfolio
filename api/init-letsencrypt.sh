#!/bin/bash
# Bootstrap do certificado Let's Encrypt para mcp.victorlisbronzo.me.
# Rodar UMA VEZ no servidor, a partir da pasta api/, antes do primeiro uso em produção:
#   bash init-letsencrypt.sh
set -e

DOMAIN="mcp.victorlisbronzo.me"
EMAIL="victorlisbronzo1@gmail.com"
STAGING=0 # 1 = usa o ambiente de staging do Let's Encrypt (evita rate limits em testes)
RSA_KEY_SIZE=4096
DATA_PATH="./certbot"

if [ -d "$DATA_PATH/conf/live/$DOMAIN" ]; then
  read -p "Certificados existentes encontrados para $DOMAIN. Continuar e substituir? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

echo "### Criando certificado dummy para $DOMAIN ..."
path="/etc/letsencrypt/live/$DOMAIN"
docker compose run --rm --entrypoint "\
  mkdir -p $path && \
  openssl req -x509 -nodes -newkey rsa:$RSA_KEY_SIZE -days 1 \
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot

echo "### Iniciando nginx ..."
docker compose up --force-recreate -d nginx

echo "### Apagando certificado dummy para $DOMAIN ..."
docker compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$DOMAIN && \
  rm -Rf /etc/letsencrypt/archive/$DOMAIN && \
  rm -Rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

echo "### Solicitando certificado real do Let's Encrypt para $DOMAIN ..."
staging_arg=""
if [ "$STAGING" != "0" ]; then staging_arg="--staging"; fi

docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    --email $EMAIL \
    -d $DOMAIN \
    --rsa-key-size $RSA_KEY_SIZE \
    --agree-tos \
    --force-renewal" certbot

echo "### Recarregando nginx ..."
docker compose exec nginx nginx -s reload
