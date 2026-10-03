<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");

$playerJson = file_get_contents("../data/player.json");
$player = json_decode($playerJson, true);
$player["score"] += $player["clickPower"];
$player["totalClicks"] += 1;

file_put_contents("../data/player.json", json_encode($player, JSON_PRETTY_PRINT));