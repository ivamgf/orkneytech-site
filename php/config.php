<?php

declare(strict_types=1);

/**
 * Configuração do backend do formulário. Valores podem vir de variáveis de
 * ambiente (definidas no PHP-FPM ou no VirtualHost) ou ficar nos padrões abaixo.
 *
 * Estrutura instalada (dist/):
 *   public/  -> raiz do site (DocumentRoot), contém contato.php
 *   app/     -> este arquivo, src/, migrations/, bin/ (fora da raiz pública)
 *   data/    -> banco SQLite (fora da raiz pública)
 */

$env = static fn (string $key, ?string $default = null): ?string =>
    (getenv($key) !== false && getenv($key) !== '') ? getenv($key) : $default;

$subjectsFile = is_file(__DIR__ . '/subjects.json')
    ? __DIR__ . '/subjects.json'                               // pacote dist/
    : __DIR__ . '/../src/content/contact-subjects.json';       // repositório

return [
    'db_path' => $env('ORKNEYTECH_DB', __DIR__ . '/../data/contatos.sqlite'),
    'subjects_file' => $subjectsFile,
    // Origens aceitas no POST (separadas por vírgula). Vazio = aceita apenas o próprio host.
    'allowed_origins' => array_filter(array_map('trim', explode(',', (string) $env('ORKNEYTECH_ORIGINS', '')))),
    'rate_limit' => ['max' => (int) $env('ORKNEYTECH_RATE_MAX', '5'), 'window_seconds' => 3600],
    // Sal para o hash do IP (LGPD: não guardamos o IP em texto). Troque na instalação.
    'ip_salt' => $env('ORKNEYTECH_IP_SALT', 'troque-este-valor'),
    // Se definido, cada mensagem também é enviada por e-mail (função mail() do PHP).
    'notify_email' => $env('ORKNEYTECH_NOTIFY_EMAIL'),
    'success_path' => '/contato/enviado/',
    'form_path' => '/contato/',
];
