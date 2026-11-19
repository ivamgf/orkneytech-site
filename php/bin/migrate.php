<?php

declare(strict_types=1);

/** Cria o banco (se preciso) e aplica migrations pendentes. Uso: php app/bin/migrate.php */

require __DIR__ . '/../bootstrap.php';

use Orkneytech\Database\Database;

$config = orkneytech_config();
$db = Database::connect($config['db_path']);
$count = (int) $db->query('SELECT COUNT(*) FROM schema_migrations')->fetchColumn();
fwrite(STDOUT, "Banco pronto em {$config['db_path']} ({$count} migrations aplicadas).\n");
