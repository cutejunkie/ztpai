<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ErrorController extends AbstractController
{
    #[Route('/error/{code}', name: 'error_show', methods: ['GET'])]
    public function showError(int $code): JsonResponse
    {
        $errors = [
            400 => 'Bad request',
            404 => 'Not found',
            500 => 'Internal server error',
        ];

        // default 500
        $message = $errors[$code] ?? 'Unknown error';

        return new JsonResponse(
            [
                'status' => 'error',
                'error' => $message,
            ],
            $code
        );
    }
}
