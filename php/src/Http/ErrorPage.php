<?php

declare(strict_types=1);

namespace Orkneytech\Http;

/**
 * Página HTML simples e acessível para quem envia o formulário sem JavaScript
 * e precisa corrigir algo (o site estático não tem como mostrar os erros).
 */
final class ErrorPage
{
    /** @param list<string> $messages */
    public static function render(string $title, array $messages, string $backHref): string
    {
        $e = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $items = implode('', array_map(static fn ($m) => '<li>' . $e($m) . '</li>', $messages));

        return <<<HTML
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="robots" content="noindex">
          <title>{$e($title)} · Orkneytech</title>
          <style>
            body{font:1.0625rem/1.6 system-ui,sans-serif;color:#1a1a1a;background:#fff;margin:0;padding:2rem 1rem}
            main{max-width:40rem;margin:auto}
            h1{color:#b3261e;line-height:1.2}
            a{color:#074b9c;font-weight:700}
            a:focus-visible{outline:3px solid #074b9c;outline-offset:3px}
          </style>
        </head>
        <body>
          <main>
            <h1>{$e($title)}</h1>
            <ul>{$items}</ul>
            <p><a href="{$e($backHref)}">Voltar ao formulário de contato</a></p>
          </main>
        </body>
        </html>
        HTML;
    }
}
