<?php

declare(strict_types=1);

namespace Orkneytech\Contact;

final class ValidationResult
{
    /** @param array<string, string> $errors */
    private function __construct(
        public readonly ?ContactMessage $message,
        public readonly array $errors,
    ) {
    }

    public static function valid(ContactMessage $message): self
    {
        return new self($message, []);
    }

    /** @param array<string, string> $errors */
    public static function invalid(array $errors): self
    {
        return new self(null, $errors);
    }

    public function isValid(): bool
    {
        return $this->message !== null;
    }
}
