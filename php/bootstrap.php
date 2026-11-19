<?php

declare(strict_types=1);

spl_autoload_register(static function (string $class): void {
    $prefix = 'Orkneytech\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }
    $file = __DIR__ . '/src/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
    if (is_file($file)) {
        require $file;
    }
});

/** @return array<string, mixed> */
function orkneytech_config(): array
{
    static $config = null;
    return $config ??= require __DIR__ . '/config.php';
}
