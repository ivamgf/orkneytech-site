<?php

declare(strict_types=1);

namespace Orkneytech\Notification;

use Orkneytech\Contact\ContactMessage;

interface Notifier
{
    public function notify(ContactMessage $message, int $id): void;
}
