<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HelloWorldController extends AbstractController
{
    #[Route('/helloworld', name: 'helloworld', methods: ['GET'])]
    public function helloworld(): JsonResponse
    {
        return new JsonResponse(
            [
                'status' => 'success',
                'data' => [
                    'message' => 'Hello!',
                ]
            ],
            JsonResponse::HTTP_OK // Kod 200
        );
    }
}


?>