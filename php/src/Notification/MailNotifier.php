<?php

declare(strict_types=1);

namespace Orkneytech\Notification;

use Orkneytech\Contact\ContactMessage;

/** Aviso por e-mail via mail() do PHP (exige sendmail/postfix configurado no VPS). */
final class MailNotifier implements Notifier
{
    public function __construct(private readonly string $to)
    {
    }

    public function notify(ContactMessage $message, int $id): void
    {
        $subject = '=?UTF-8?B?' . base64_encode("[Site] {$message->subject} (#{$id})") . '?=';
        $body = implode("\n", [
            "Nome: {$message->name}",
            "E-mail: {$message->email}",
            'Empresa: ' . ($message->company !== '' ? $message->company : '-'),
            "Assunto: {$message->subject}",
            '',
            $message->message,
        ]);
        // E-mail do visitante só no Reply-To e sem quebras de linha (evita injeção de cabeçalho).
        $replyTo = str_replace(["\r", "\n"], '', $message->email);
        $headers = [
            'Content-Type: text/plain; charset=UTF-8',
            "Reply-To: {$replyTo}",
        ];
        @mail($this->to, $subject, $body, implode("\r\n", $headers));
    }
}
