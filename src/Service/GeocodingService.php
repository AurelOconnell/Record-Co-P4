<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;

class GeocodingService
{
    private string $token;

    public function getCoordinates(string $city): ?array
    {
        $this->token = $_ENV['GEO_TOKEN'];
        $apiUrl = 'https://api.api-ninjas.com/v1/geocoding?city=' . $city;
        $httpClient = HttpClient::create();
        $response = $httpClient->request('GET', $apiUrl, [
            'headers' => [
                'X-Api-Key' => $this->token,
            ],
        ]);

        $statusCode = $response->getStatusCode();
        if ($statusCode === 200) {
            $content = $response->getContent();
            $data = json_decode($content, true);

            if (isset($data[0]['latitude']) && isset($data[0]['longitude'])) {
                return ['lat' => $data[0]['latitude'], 'lon' => $data[0]['longitude']];
            }
        }


        return null;
    }
}
