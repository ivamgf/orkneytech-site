# Instalação no VPS

Este pacote (`dist/`) já contém o site pronto. O VPS **não precisa de Node.js**: só de um servidor web
(Nginx ou Apache) e PHP 8.1+ com `pdo_sqlite` e `mbstring`.

## 1. Preparar o servidor (Ubuntu/Debian, uma vez só)

```bash
sudo apt update
sudo apt install nginx php-fpm php-sqlite3 php-mbstring sqlite3
# ou, para Apache: sudo apt install apache2 libapache2-mod-php php-sqlite3 php-mbstring sqlite3
```

## 2. Enviar e instalar

No seu computador, depois de `npm run build`:

```bash
scp release/orkneytech-site-1.0.0.tar.gz usuario@SEU_VPS:/tmp/
```

No VPS:

```bash
cd /tmp && tar -xzf orkneytech-site-1.0.0.tar.gz && cd dist
sudo ./install.sh --domain orkneytech-lab.com --server nginx
```

O script verifica o PHP, copia `public/` e `app/` para `/var/www/orkneytech`, guarda a versão anterior em
`backup-AAAAMMDD-HHMMSS/`, cria o banco em `data/`, configura o servidor web e recarrega o serviço.

## 3. Depois de instalar

- **HTTPS:** `sudo certbot --nginx -d orkneytech-lab.com -d www.orkneytech-lab.com`, depois descomente a linha
  `Strict-Transport-Security` na configuração.
- **Sal do IP:** defina `ORKNEYTECH_IP_SALT` com um valor aleatório (veja os comentários em
  `/etc/nginx/sites-available/orkneytech.conf` ou no VirtualHost do Apache).
- **Aviso por e-mail (opcional):** `ORKNEYTECH_NOTIFY_EMAIL`, exige um MTA (postfix/sendmail) no VPS.

## Mensagens recebidas

```bash
sudo -u www-data env ORKNEYTECH_DB=/var/www/orkneytech/data/contatos.sqlite \
  php /var/www/orkneytech/app/bin/list-messages.php 20
```

## Backup

```bash
sqlite3 /var/www/orkneytech/data/contatos.sqlite ".backup '/root/contatos-$(date +%F).sqlite'"
```

## Atualizar o site

Gere um novo build, envie o novo `.tar.gz` e rode o mesmo `install.sh`. O banco em `data/` é mantido.
