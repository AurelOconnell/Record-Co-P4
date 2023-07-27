<?php

namespace App\Controller;

use App\Repository\ArtistRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/geo')]
class GeoCodingController extends AbstractController
{
    #[Route('/coding', name: 'app_geo_coding')]
    public function index(): Response
    {
        return $this->render('geo_coding/index.html.twig', [
            'controller_name' => 'GeoCodingController',
        ]);
    }

    #[Route('/coding/coord', name: 'app_geo_coord')]
    public function getGeocoding(ArtistRepository $artistRepository): JsonResponse
    {
        $artists = $artistRepository->findAll();

        $responseData = [];
        foreach ($artists as $artist) {
            $responseData[] = [
                'id' => $artist->getId(),
                'name' => $artist->getName(),
                'city' => $artist->getCity(),
                'latitude' => $artist->getLat(),
                'longitude' => $artist->getLon(),
            ];
        }

        return new JsonResponse($responseData);
    }
}
