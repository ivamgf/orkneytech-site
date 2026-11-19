<?php

declare(strict_types=1);

namespace Orkneytech\Contact;

/** Mensagem de contato já validada e normalizada. */
final class ContactMessage
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly string $company,
        public readonly string $subject,
        public readonly string $message,
    ) {
    }
}
