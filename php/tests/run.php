<?php

declare(strict_types=1);

/** Testes do backend PHP, sem dependências. Uso: php php/tests/run.php */

require __DIR__ . '/../bootstrap.php';

use Orkneytech\Contact\ContactController;
use Orkneytech\Contact\ContactValidator;
use Orkneytech\Contact\SqliteContactRepository;
use Orkneytech\Database\Database;
use Orkneytech\Notification\NullNotifier;
use Orkneytech\Security\OriginGuard;
use Orkneytech\Security\RateLimiter;

$failures = 0;
$total = 0;
function check(string $name, bool $condition): void
{
    global $failures, $total;
    $total++;
    if (!$condition) {
        $failures++;
    }
    fwrite(STDOUT, ($condition ? '  ✓ ' : '  ✗ ') . $name . "\n");
}

$subjectsFile = __DIR__ . '/../../src/content/contact-subjects.json';
$validator = ContactValidator::fromSubjectsFile($subjectsFile);
$valid = [
    'nome' => '  Ada Lovelace ',
    'email' => 'ADA@Exemplo.com.br',
    'empresa' => '',
    'assunto' => 'Consultoria em tecnologia',
    'mensagem' => 'Gostaria de um diagnóstico de arquitetura.',
    'lgpd' => 'on',
];

fwrite(STDOUT, "ContactValidator\n");
$result = $validator->validate($valid);
check('aceita dados válidos', $result->isValid());
check('normaliza nome e e-mail', $result->message?->name === 'Ada Lovelace' && $result->message?->email === 'ada@exemplo.com.br');
$bad = $validator->validate(['nome' => 'A', 'email' => 'x', 'assunto' => 'Inventado', 'mensagem' => 'curta', 'empresa' => str_repeat('a', 121)]);
check('aponta os seis erros', array_keys($bad->errors) === ['nome', 'email', 'empresa', 'assunto', 'mensagem', 'lgpd']);
check('ignora tipos inesperados', !$validator->validate(['nome' => ['array']])->isValid());

fwrite(STDOUT, "OriginGuard\n");
$guard = new OriginGuard([]);
check('aceita o próprio host', $guard->allows(['HTTP_ORIGIN' => 'https://site.test', 'HTTP_HOST' => 'site.test', 'HTTPS' => 'on']));
check('recusa outro host', !$guard->allows(['HTTP_ORIGIN' => 'https://malicioso.test', 'HTTP_HOST' => 'site.test', 'HTTPS' => 'on']));
check('usa Referer sem Origin', $guard->allows(['HTTP_REFERER' => 'http://site.test/contato/', 'HTTP_HOST' => 'site.test']));
check('recusa sem Origin nem Referer', !$guard->allows(['HTTP_HOST' => 'site.test']));
check('lista explícita de origens', (new OriginGuard(['https://a.test']))->allows(['HTTP_ORIGIN' => 'https://a.test', 'HTTP_HOST' => 'b.test']));

fwrite(STDOUT, "RateLimiter\n");
$db = Database::connect(':memory:');
$limiter = new RateLimiter($db, 2, 60);
check('1ª tentativa', $limiter->attempt('ip', 1000));
check('2ª tentativa', $limiter->attempt('ip', 1001));
check('3ª bloqueada', !$limiter->attempt('ip', 1002));
check('outra chave livre', $limiter->attempt('outro', 1002));
check('libera após a janela', $limiter->attempt('ip', 1100));

fwrite(STDOUT, "ContactController\n");
$makeController = static function (int $max = 5) use ($validator): array {
    $db = Database::connect(':memory:');
    $repository = new SqliteContactRepository($db);
    $controller = new ContactController(
        $validator,
        $repository,
        new RateLimiter($db, $max, 3600),
        new OriginGuard([]),
        new NullNotifier(),
        'sal',
        '/contato/enviado/',
        '/contato/',
    );
    return [$controller, $repository];
};
$server = ['REQUEST_METHOD' => 'POST', 'HTTP_ORIGIN' => 'https://site.test', 'HTTP_HOST' => 'site.test', 'HTTPS' => 'on', 'REMOTE_ADDR' => '203.0.113.9'];
$json = $server + ['HTTP_ACCEPT' => 'application/json'];

[$controller, $repository] = $makeController();
$response = $controller->handle($json, $valid);
check('JSON válido → 200 e grava', $response->status === 200 && count($repository->recent(10)) === 1);
$stored = $repository->recent(1)[0];
check('não guarda o IP em texto', !in_array('203.0.113.9', array_map('strval', $stored), true));

$response = $controller->handle($server, $valid);
check('sem JS → 303 para /contato/enviado/', $response->status === 303 && $response->headers['Location'] === '/contato/enviado/');

$response = $controller->handle($json, ['nome' => '']);
$body = json_decode($response->body, true);
check('inválido → 422 com erros', $response->status === 422 && isset($body['errors']['nome'], $body['errors']['lgpd']));

$response = $controller->handle($server, ['nome' => '']);
check('inválido sem JS → página HTML acessível', $response->status === 422 && str_contains($response->body, '<html lang="pt-BR">'));

[$controller, $repository] = $makeController();
$response = $controller->handle($json, $valid + ['site' => 'http://spam.test']);
check('honeypot → finge sucesso e não grava', $response->status === 200 && $repository->recent(10) === []);

$response = $controller->handle(['REQUEST_METHOD' => 'POST', 'HTTP_ORIGIN' => 'https://outro.test', 'HTTP_HOST' => 'site.test', 'HTTP_ACCEPT' => 'application/json'], $valid);
check('origem estranha → 403', $response->status === 403);

$response = $controller->handle(['REQUEST_METHOD' => 'GET'] + $server, []);
check('GET → 405', $response->status === 405);

[$controller] = $makeController(1);
$controller->handle($json, $valid);
check('limite → 429', $controller->handle($json, $valid)->status === 429);

$escaped = \Orkneytech\Http\ErrorPage::render('T', ['<script>alert(1)</script>'], '/contato/');
check('página de erro escapa HTML', !str_contains($escaped, '<script>alert'));

fwrite(STDOUT, sprintf("\n%d de %d testes passaram.\n", $total - $failures, $total));
exit($failures === 0 ? 0 : 1);
