<?php

declare(strict_types=1);

namespace Orkneytech\Notification;

use Orkneytech\Contact\ContactMessage;

/** Usado quando nenhum e-mail de aviso foi configurado. */
final class NullNotifier implements Notifier
{
    public function notify(ContactMessage $message, int $id): void
    {
    }
}
