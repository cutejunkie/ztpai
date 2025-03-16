<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/api/users/{id}', name: 'get_user_by_id', methods: ['GET'])]
    public function getUserById(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'User not found'
            ], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse([
            'status' => 'success',
            'data' => [
                'id' => $user->getId(),
                'uuid' => $user->getUuid(),
                'name' => $user->getName(),
                'email' => $user->getEmail()
            ]
        ], JsonResponse::HTTP_OK);
    }

    #[Route('/api/users/uuid/{uuid}', name: 'get_user_by_uuid', methods: ['GET'])]
    public function getUserByUuid(string $uuid, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $entityManager->getRepository(User::class)->findOneBy(['uuid' => $uuid]);

        if (!$user) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'User not found'
            ], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse([
            'status' => 'success',
            'data' => [
                'id' => $user->getId(),
                'uuid' => $user->getUuid(),
                'name' => $user->getName(),
                'email' => $user->getEmail()
            ]
        ], JsonResponse::HTTP_OK);
    }
}
