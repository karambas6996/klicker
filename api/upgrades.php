<?php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$upgradesList = json_decode(file_get_contents("../data/upgrades.json"), true);
$upgradesMap = array_column($upgradesList, null, "name");
$playerUpgrades = $_GET['upgrades'];
$html = "";

foreach ($playerUpgrades as $name => $level) {
    $upgradeConfig = $upgradesMap[$name];
    $level++;

    $html .= "
        <button class='upgrade'>
            <span class='upgrade-icon'> <i class='fa-solid {$upgradeConfig["icon"]}'></i></span>
            <span class='upgrade-info'>
                <strong>{$upgradeConfig["displayName"]}</strong>
                <small>+$level {$upgradeConfig["description"]}</small>
            </span>
            <span class='upgrade-price'>{$upgradeConfig["price"]}</span>
        </button>
    ";
}

$data = [
    "upgrades" => $html,
];

echo json_encode($data);