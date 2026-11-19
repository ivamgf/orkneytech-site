<?php

declare(strict_types=1);

/**
 * Endpoint do formulário de contato (fica na raiz pública do site).
 * Toda a lógica está fora da raiz pública, em ../app (pacote) ou ../ (repositório).
 */

$bootstrap = is_file(__DIR__ . '/../app/bootstrap.php')
    ? __DIR__ . '/../app/bootstrap.php'
    : __DIR__ . '/../bootstrap.php';
require $bootstrap;

use Orkneytech\Contact\ContactControllerFactory;
use Orkneytech\Http\Response;

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

try {
    ContactControllerFactory::create(orkneytech_config())->handle($_SERVER, $_POST)->send();
} catch (\Throwable $error) {
    error_log('[orkneytech contato] ' . $error->getMessage());
    $wantsJson = str_contains((string) ($_SERVER['HTTP_ACCEPT'] ?? ''), 'application/json');
    ($wantsJson
        ? Response::json(500, ['ok' => false, 'message' => 'Erro interno. Tente novamente mais tarde.'])
        : new Response(500, 'Erro interno. Tente novamente mais tarde.', ['Content-Type' => 'text/plain; charset=utf-8'])
    )->send();
}
