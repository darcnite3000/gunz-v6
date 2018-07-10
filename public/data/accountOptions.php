<?php
include '../config.php';
// error_reporting(E_ALL);
$wm = new CmWebmasterArea();

$states = grabKeyOptions($wm->getStates());
$countries = grabKeyOptions($wm->getCountries());
$minpayout = grabOptions($wm->getMinpay());

header('Content-type: application/json');
echo json_encode(array(
  'states'=>$states,
  'countries'=>$countries,
  'minpayout'=>$minpayout
));
exit;

function grabKeyOptions($input){
  preg_match_all("/<option value=['|\"]((.*):(.*))['|\"] (?:selected)?>(.*)<\/option>/", $input, $matches);
  $options = array();
  foreach ($matches[1] as $index => $value) {
    $option = array(
      'id' => $value,
      'key' => $matches[2][$index],
      'display' => $matches[4][$index]
    );
    $options[] = $option;
  }
  return $options;
}

function grabOptions($input){
  preg_match_all("/<option value=['|\"](.*)['|\"] (?:selected)?>(.*)<\/option>/", $input, $matches);
  $options = array();
  foreach ($matches[1] as $index => $value) {
    $option = array(
      'id' => $value,
      'display' => $matches[2][$index]
    );
    $options[] = $option;
  }
  return $options;
}