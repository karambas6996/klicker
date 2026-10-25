<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$playerJson = file_get_contents("../data/player.json");
$player = json_decode($playerJson, true);
$player["score"] += $player["clickPower"];
$player["totalClicks"] += 1;

file_put_contents("../data/player.json", json_encode($player, JSON_PRETTY_PRINT));

echo json_encode($player);