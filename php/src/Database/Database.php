<?php

declare(strict_types=1);

namespace Orkneytech\Database;

use PDO;

/** Conexão SQLite + migrations versionadas (migrations/NNN_nome.sql). */
final class Database
{
    public static function connect(string $path, ?string $migrationsDir = null): PDO
    {
        if ($path !== ':memory:') {
            $dir = dirname($path);
            if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
                throw new \RuntimeException("Não foi possível criar a pasta do banco: {$dir}");
            }
        }

        $db = new PDO('sqlite:' . $path, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        $db->exec('PRAGMA journal_mode = WAL');
        $db->exec('PRAGMA foreign_keys = ON');
        $db->exec('PRAGMA busy_timeout = 5000');

        self::migrate($db, $migrationsDir ?? dirname(__DIR__, 2) . '/migrations');
        return $db;
    }

    /** @return list<string> migrations aplicadas nesta chamada */
    public static function migrate(PDO $db, string $dir): array
    {
        $db->exec('CREATE TABLE IF NOT EXISTS schema_migrations (
            version TEXT PRIMARY KEY,
            applied_at TEXT NOT NULL DEFAULT (datetime(\'now\'))
        )');
        $applied = $db->query('SELECT version FROM schema_migrations')->fetchAll(PDO::FETCH_COLUMN);
        $files = glob(rtrim($dir, '/') . '/*.sql') ?: [];
        sort($files);

        $done = [];
        foreach ($files as $file) {
            $version = basename($file, '.sql');
            if (in_array($version, $applied, true)) {
                continue;
            }
            $db->beginTransaction();
            try {
                $db->exec((string) file_get_contents($file));
                $db->prepare('INSERT INTO schema_migrations (version) VALUES (:v)')->execute([':v' => $version]);
                $db->commit();
                $done[] = $version;
            } catch (\Throwable $error) {
                $db->rollBack();
                throw $error;
            }
        }
        return $done;
    }
}
