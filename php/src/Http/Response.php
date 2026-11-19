<?php

declare(strict_types=1);

namespace Orkneytech\Http;

final class Response
{
    /** @param array<string, string> $headers */
    public function __construct(
        public readonly int $status,
        public readonly string $body = '',
        public readonly array $headers = [],
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function json(int $status, array $data): self
    {
        return new self($status, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR), [
            'Content-Type' => 'application/json; charset=utf-8',
            'Cache-Control' => 'no-store',
        ]);
    }

    public static function redirect(string $location): self
    {
        return new self(303, '', ['Location' => $location, 'Cache-Control' => 'no-store']);
    }

    public static function html(int $status, string $html): self
    {
        return new self($status, $html, ['Content-Type' => 'text/html; charset=utf-8', 'Cache-Control' => 'no-store']);
    }

    public function send(): void
    {
        http_response_code($this->status);
        foreach ($this->headers as $name => $value) {
            header("{$name}: {$value}");
        }
        echo $this->body;
    }
}
