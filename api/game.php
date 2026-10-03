<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$playerJson = file_get_contents("../data/player.json");
$game = json_decode($playerJson, true);

echo json_encode($game);