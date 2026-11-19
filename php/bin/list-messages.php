<?php

declare(strict_types=1);

/** Lista as mensagens mais recentes. Uso: php app/bin/list-messages.php [quantidade] */

require __DIR__ . '/../bootstrap.php';

use Orkneytech\Contact\SqliteContactRepository;
use Orkneytech\Database\Database;

$limit = max(1, (int) ($argv[1] ?? 20));
$repository = new SqliteContactRepository(Database::connect(orkneytech_config()['db_path']));

foreach ($repository->recent($limit) as $row) {
    fwrite(STDOUT, sprintf(
        "#%d  %s  %s <%s>%s\n  Assunto: %s\n  %s\n\n",
        $row['id'],
        $row['created_at'],
        $row['name'],
        $row['email'],
        $row['company'] !== '' ? " · {$row['company']}" : '',
        $row['subject'],
        str_replace("\n", "\n  ", $row['message']),
    ));
}
