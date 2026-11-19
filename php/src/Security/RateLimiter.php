<?php

declare(strict_types=1);

namespace Orkneytech\Security;

use PDO;

/** Limite de envios por IP (hash) numa janela de tempo, guardado no SQLite. */
final class RateLimiter
{
    public function __construct(
        private readonly PDO $db,
        private readonly int $max,
        private readonly int $windowSeconds,
    ) {
    }

    /** Registra a tentativa e diz se ela está dentro do limite. */
    public function attempt(string $key, ?int $now = null): bool
    {
        $now ??= time();
        $since = $now - $this->windowSeconds;

        $this->db->beginTransaction();
        try {
            $this->db->prepare('DELETE FROM rate_limit_hits WHERE hit_at < :since')->execute([':since' => $since]);

            $count = $this->db->prepare('SELECT COUNT(*) FROM rate_limit_hits WHERE key = :key AND hit_at >= :since');
            $count->execute([':key' => $key, ':since' => $since]);
            if ((int) $count->fetchColumn() >= $this->max) {
                $this->db->commit();
                return false;
            }

            $this->db->prepare('INSERT INTO rate_limit_hits (key, hit_at) VALUES (:key, :now)')
                ->execute([':key' => $key, ':now' => $now]);
            $this->db->commit();
            return true;
        } catch (\Throwable $error) {
            $this->db->rollBack();
            throw $error;
        }
    }
}
