<?php

declare(strict_types=1);

namespace Orkneytech\Contact;

use Orkneytech\Http\ErrorPage;
use Orkneytech\Http\Response;
use Orkneytech\Notification\Notifier;
use Orkneytech\Security\OriginGuard;
use Orkneytech\Security\RateLimiter;

/**
 * Orquestra o envio: método → origem → robô → limite → validação → gravação → aviso.
 * Responde JSON para o fetch do site e redireciona/mostra HTML para envio sem JavaScript.
 */
final class ContactController
{
    public function __construct(
        private readonly ContactValidator $validator,
        private readonly ContactRepository $repository,
        private readonly RateLimiter $rateLimiter,
        private readonly OriginGuard $originGuard,
        private readonly Notifier $notifier,
        private readonly string $ipSalt,
        private readonly string $successPath,
        private readonly string $formPath,
    ) {
    }

    /**
     * @param array<string, mixed> $server $_SERVER
     * @param array<string, mixed> $post   $_POST
     */
    public function handle(array $server, array $post): Response
    {
        $wantsJson = str_contains((string) ($server['HTTP_ACCEPT'] ?? ''), 'application/json');

        if (($server['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
            return new Response(405, '', ['Allow' => 'POST']);
        }
        if (!$this->originGuard->allows($server)) {
            return $this->fail($wantsJson, 403, 'Envio recusado', ['Recarregue a página do formulário e tente de novo.']);
        }
        // Robô preencheu o campo invisível: finge sucesso e não grava nada.
        if (trim((string) ($post['site'] ?? '')) !== '') {
            return $this->success($wantsJson);
        }

        $ipHash = hash('sha256', $this->ipSalt . '|' . ($server['REMOTE_ADDR'] ?? ''));
        if (!$this->rateLimiter->attempt($ipHash)) {
            return $this->fail($wantsJson, 429, 'Muitas mensagens', ['Recebemos muitas mensagens deste endereço. Aguarde um pouco e tente de novo.']);
        }

        $result = $this->validator->validate($post);
        if (!$result->isValid()) {
            return $wantsJson
                ? Response::json(422, ['ok' => false, 'errors' => $result->errors])
                : Response::html(422, ErrorPage::render('Corrija os campos para enviar', array_values($result->errors), $this->formPath));
        }

        $id = $this->repository->save($result->message, $ipHash);
        $this->notifier->notify($result->message, $id);

        return $this->success($wantsJson);
    }

    private function success(bool $wantsJson): Response
    {
        return $wantsJson ? Response::json(200, ['ok' => true]) : Response::redirect($this->successPath);
    }

    /** @param list<string> $messages */
    private function fail(bool $wantsJson, int $status, string $title, array $messages): Response
    {
        return $wantsJson
            ? Response::json($status, ['ok' => false, 'message' => $messages[0]])
            : Response::html($status, ErrorPage::render($title, $messages, $this->formPath));
    }
}
