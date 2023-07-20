<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
    public function getGeocoding(Request $request): Response
    {
        $city = $request->query->get('city');
        $apiKey = $_ENV['GEO_TOKEN'];

        $apiUrl = 'https://api.api-ninjas.com/v1/geocoding?city=' . urlencode($city);

        // Creating the HTTP client
        $httpClient = HttpClient::create();

        // Making the GET request with headers
        $response = $httpClient->request('GET', $apiUrl, [
            'headers' => [
                'X-Api-Key' => $apiKey,
            ],
        ]);

        // Getting the response status code and content
        $statusCode = $response->getStatusCode();
        $content = $response->getContent();

        // Handling the response based on the status code
        if ($statusCode === 200) {
            $data = json_decode($content, true);
            if (isset($data['lat']) && isset($data['lon'])) {
                return new JsonResponse(['lat' => $data['lat'], 'lon' => $data['lon']]);
            } else {
                return new JsonResponse(['error' => 'Coordinates not found'], Response::HTTP_BAD_REQUEST);
            }
        } else {
            return new JsonResponse(['error' => $content], $statusCode);
        }
    }
}
