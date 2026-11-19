<?php

declare(strict_types=1);

namespace Orkneytech\Contact;

/**
 * Espelho de src/domain/contact.js. O servidor sempre revalida:
 * a validação do navegador é só conveniência.
 */
final class ContactValidator
{
    public const NAME_MIN = 2;
    public const NAME_MAX = 120;
    public const EMAIL_MAX = 254;
    public const COMPANY_MAX = 120;
    public const MESSAGE_MIN = 10;
    public const MESSAGE_MAX = 5000;

    /** @param list<string> $subjects */
    public function __construct(private readonly array $subjects)
    {
    }

    public static function fromSubjectsFile(string $path): self
    {
        $subjects = json_decode((string) file_get_contents($path), true, 8, JSON_THROW_ON_ERROR);
        return new self(array_values(array_filter($subjects, 'is_string')));
    }

    /** @param array<string, mixed> $input */
    public function validate(array $input): ValidationResult
    {
        $name = self::text($input['nome'] ?? null);
        $email = mb_strtolower(self::text($input['email'] ?? null));
        $company = self::text($input['empresa'] ?? null);
        $subject = self::text($input['assunto'] ?? null);
        $message = self::text($input['mensagem'] ?? null);
        $consent = in_array($input['lgpd'] ?? null, ['on', '1', true], true);

        $errors = [];
        if (!self::lengthBetween($name, self::NAME_MIN, self::NAME_MAX)) {
            $errors['nome'] = sprintf('Informe seu nome (de %d a %d caracteres).', self::NAME_MIN, self::NAME_MAX);
        }
        if (mb_strlen($email) > self::EMAIL_MAX || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $errors['email'] = 'Informe um e-mail válido, como nome@empresa.com.br.';
        }
        if (mb_strlen($company) > self::COMPANY_MAX) {
            $errors['empresa'] = sprintf('O nome da empresa pode ter até %d caracteres.', self::COMPANY_MAX);
        }
        if (!in_array($subject, $this->subjects, true)) {
            $errors['assunto'] = 'Selecione um assunto.';
        }
        if (!self::lengthBetween($message, self::MESSAGE_MIN, self::MESSAGE_MAX)) {
            $errors['mensagem'] = sprintf('Escreva sua mensagem (de %d a %d caracteres).', self::MESSAGE_MIN, self::MESSAGE_MAX);
        }
        if (!$consent) {
            $errors['lgpd'] = 'Marque a concordância com a Política de Privacidade.';
        }

        return $errors === []
            ? ValidationResult::valid(new ContactMessage($name, $email, $company, $subject, $message))
            : ValidationResult::invalid($errors);
    }

    private static function text(mixed $value): string
    {
        return is_string($value) ? trim($value) : '';
    }

    private static function lengthBetween(string $value, int $min, int $max): bool
    {
        $length = mb_strlen($value);
        return $length >= $min && $length <= $max;
    }
}
