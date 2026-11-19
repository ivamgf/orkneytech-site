#!/usr/bin/env bash
# Instalador do site Orkneytech num VPS Linux (Ubuntu/Debian ou derivados).
#
# Uso (dentro da pasta dist/ enviada ao servidor):
#   sudo ./install.sh --domain orkneytech-lab.com --server nginx
#   sudo ./install.sh --domain orkneytech-lab.com --server apache --target /var/www/orkneytech
#
# Opções:
#   --domain   domínio do site (obrigatório)
#   --server   nginx | apache | none   (none = só copia os arquivos; padrão: nginx)
#   --target   pasta de instalação      (padrão: /var/www/orkneytech)
#   --user     usuário do servidor web  (padrão: www-data)
#
# Atualizações: rode o mesmo comando com a nova dist/. O banco em data/ é preservado.
set -euo pipefail

DOMAIN=""
SERVER="nginx"
TARGET="/var/www/orkneytech"
WEB_USER="www-data"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain) DOMAIN="$2"; shift 2 ;;
    --server) SERVER="$2"; shift 2 ;;
    --target) TARGET="$2"; shift 2 ;;
    --user) WEB_USER="$2"; shift 2 ;;
    -h|--help) sed -n '2,16p' "$0"; exit 0 ;;
    *) echo "Opção desconhecida: $1" >&2; exit 1 ;;
  esac
done

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
say() { printf '\n\033[1m%s\033[0m\n' "$*"; }
fail() { printf 'ERRO: %s\n' "$*" >&2; exit 1; }

[[ $EUID -eq 0 ]] || fail "rode com sudo."
[[ -n "$DOMAIN" ]] || fail "informe --domain."
[[ "$SERVER" =~ ^(nginx|apache|none)$ ]] || fail "--server deve ser nginx, apache ou none."
[[ -f "$SRC/public/index.html" && -f "$SRC/app/bootstrap.php" ]] || fail "rode o script de dentro da pasta dist/."

say "1/5 Verificando PHP"
command -v php >/dev/null || fail "PHP não encontrado. Instale: apt install php-fpm php-sqlite3 php-mbstring"
php -r 'exit(version_compare(PHP_VERSION, "8.1", ">=") ? 0 : 1);' || fail "é preciso PHP 8.1 ou mais novo."
php -m | grep -qi pdo_sqlite || fail "extensão pdo_sqlite ausente. Instale: apt install php-sqlite3"
php -m | grep -qi mbstring || fail "extensão mbstring ausente. Instale: apt install php-mbstring"
id "$WEB_USER" >/dev/null 2>&1 || fail "usuário $WEB_USER não existe (use --user)."

say "2/5 Copiando arquivos para $TARGET"
mkdir -p "$TARGET/data"
if [[ -d "$TARGET/public" ]]; then
  BACKUP="$TARGET/backup-$(date +%Y%m%d-%H%M%S)"
  mkdir -p "$BACKUP"
  cp -a "$TARGET/public" "$TARGET/app" "$BACKUP/" 2>/dev/null || true
  echo "Versão anterior guardada em $BACKUP"
fi
rm -rf "$TARGET/public.new" "$TARGET/app.new"
cp -a "$SRC/public" "$TARGET/public.new"
cp -a "$SRC/app" "$TARGET/app.new"
rm -rf "$TARGET/public" "$TARGET/app"
mv "$TARGET/public.new" "$TARGET/public"
mv "$TARGET/app.new" "$TARGET/app"
cp "$SRC/data/.htaccess" "$TARGET/data/.htaccess"
cp "$SRC/VERSION" "$TARGET/VERSION"

say "3/5 Permissões e banco de dados"
chown -R root:root "$TARGET/public" "$TARGET/app"
find "$TARGET/public" "$TARGET/app" -type d -exec chmod 755 {} +
find "$TARGET/public" "$TARGET/app" -type f -exec chmod 644 {} +
chown -R "$WEB_USER":"$WEB_USER" "$TARGET/data"
chmod 750 "$TARGET/data"
sudo -u "$WEB_USER" env ORKNEYTECH_DB="$TARGET/data/contatos.sqlite" php "$TARGET/app/bin/migrate.php"

say "4/5 Configuração do servidor web ($SERVER)"
render() { sed -e "s|__DOMAIN__|$DOMAIN|g" -e "s|__TARGET__|$TARGET|g" -e "s|__PHP_FPM_SOCK__|${PHP_SOCK:-}|g" "$1"; }
case "$SERVER" in
  nginx)
    command -v nginx >/dev/null || fail "Nginx não encontrado (apt install nginx)."
    PHP_SOCK="$(ls /run/php/php*-fpm.sock 2>/dev/null | sort -V | tail -n1 || true)"
    [[ -n "$PHP_SOCK" ]] || fail "socket do PHP-FPM não encontrado em /run/php (apt install php-fpm)."
    render "$SRC/nginx/orkneytech.conf" > /etc/nginx/sites-available/orkneytech.conf
    ln -sf /etc/nginx/sites-available/orkneytech.conf /etc/nginx/sites-enabled/orkneytech.conf
    nginx -t && systemctl reload nginx
    ;;
  apache)
    command -v apache2ctl >/dev/null || fail "Apache não encontrado (apt install apache2 libapache2-mod-php)."
    a2enmod headers rewrite >/dev/null
    render "$SRC/apache/orkneytech.conf" > /etc/apache2/sites-available/orkneytech.conf
    a2ensite orkneytech >/dev/null
    apache2ctl configtest && systemctl reload apache2
    ;;
  none)
    echo "Configuração do servidor web pulada. Modelos em $SRC/nginx e $SRC/apache."
    ;;
esac

say "5/5 Pronto"
echo "Site instalado em $TARGET (versão $(head -n1 "$TARGET/VERSION"))."
echo "Próximos passos:"
echo "  - HTTPS: sudo certbot --$SERVER -d $DOMAIN -d www.$DOMAIN"
echo "  - Defina ORKNEYTECH_IP_SALT (e, se quiser aviso por e-mail, ORKNEYTECH_NOTIFY_EMAIL) na config do $SERVER."
echo "  - Ver mensagens: sudo -u $WEB_USER env ORKNEYTECH_DB=$TARGET/data/contatos.sqlite php $TARGET/app/bin/list-messages.php"
echo "  - Backup do banco: sqlite3 $TARGET/data/contatos.sqlite \".backup '/root/contatos-\$(date +%F).sqlite'\""
