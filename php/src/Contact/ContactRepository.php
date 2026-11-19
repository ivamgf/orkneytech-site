<?php

declare(strict_types=1);

namespace Orkneytech\Contact;

/** Contrato de persistência das mensagens (SQLite em produção, memória nos testes). */
interface ContactRepository
{
    public function save(ContactMessage $message, string $ipHash): int;

    /** @return list<array<string, mixed>> */
    public function recent(int $limit): array;
}
