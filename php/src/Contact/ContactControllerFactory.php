<?php

declare(strict_types=1);

namespace Orkneytech\Contact;

use Orkneytech\Database\Database;
use Orkneytech\Notification\MailNotifier;
use Orkneytech\Notification\NullNotifier;
use Orkneytech\Security\OriginGuard;
use Orkneytech\Security\RateLimiter;

/** Monta o controller com as dependências reais a partir da configuração. */
final class ContactControllerFactory
{
    /** @param array<string, mixed> $config */
    public static function create(array $config): ContactController
    {
        $db = Database::connect($config['db_path']);
        return new ContactController(
            ContactValidator::fromSubjectsFile($config['subjects_file']),
            new SqliteContactRepository($db),
            new RateLimiter($db, $config['rate_limit']['max'], $config['rate_limit']['window_seconds']),
            new OriginGuard($config['allowed_origins']),
            $config['notify_email'] ? new MailNotifier($config['notify_email']) : new NullNotifier(),
            $config['ip_salt'],
            $config['success_path'],
            $config['form_path'],
        );
    }
}
