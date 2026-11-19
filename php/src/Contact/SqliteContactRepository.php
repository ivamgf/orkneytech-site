<?php

declare(strict_types=1);

namespace Orkneytech\Contact;

use PDO;

final class SqliteContactRepository implements ContactRepository
{
    public function __construct(private readonly PDO $db)
    {
    }

    public function save(ContactMessage $message, string $ipHash): int
    {
        $statement = $this->db->prepare(
            'INSERT INTO contact_messages (name, email, company, subject, message, ip_hash)
             VALUES (:name, :email, :company, :subject, :message, :ip_hash)'
        );
        $statement->execute([
            ':name' => $message->name,
            ':email' => $message->email,
            ':company' => $message->company,
            ':subject' => $message->subject,
            ':message' => $message->message,
            ':ip_hash' => $ipHash,
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function recent(int $limit): array
    {
        $statement = $this->db->prepare(
            'SELECT id, created_at, name, email, company, subject, message
             FROM contact_messages ORDER BY id DESC LIMIT :limit'
        );
        $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}
