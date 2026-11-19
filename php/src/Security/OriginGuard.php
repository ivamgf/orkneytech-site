<?php

declare(strict_types=1);

namespace Orkneytech\Security;

/**
 * Proteção CSRF para um site estático: o POST precisa vir do próprio site
 * (cabeçalho Origin, ou Referer quando o navegador não envia Origin).
 */
final class OriginGuard
{
    /** @param list<string> $allowedOrigins */
    public function __construct(private readonly array $allowedOrigins)
    {
    }

    /** @param array<string, mixed> $server */
    public function allows(array $server): bool
    {
        $origin = $server['HTTP_ORIGIN'] ?? null;
        if ($origin === null && isset($server['HTTP_REFERER'])) {
            $parts = parse_url((string) $server['HTTP_REFERER']);
            if (isset($parts['scheme'], $parts['host'])) {
                $origin = $parts['scheme'] . '://' . $parts['host'] . (isset($parts['port']) ? ':' . $parts['port'] : '');
            }
        }
        if (!is_string($origin) || $origin === '' || $origin === 'null') {
            return false;
        }

        $allowed = $this->allowedOrigins;
        if ($allowed === [] && isset($server['HTTP_HOST'])) {
            $https = ($server['HTTPS'] ?? '') !== '' && ($server['HTTPS'] ?? '') !== 'off';
            $forwardedHttps = ($server['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
            $scheme = ($https || $forwardedHttps) ? 'https' : 'http';
            $allowed = [$scheme . '://' . $server['HTTP_HOST']];
        }

        return in_array(rtrim($origin, '/'), array_map(static fn ($o) => rtrim($o, '/'), $allowed), true);
    }
}
