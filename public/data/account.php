<?php
include '../auth_die.php';
include_once("/usr/www/virtual/virtual/convergentmedia/class/CmWebmaster.class.php");
error_reporting(E_ALL);
$cmwebmaster = new CmWebmaster();
$updated = false;
if($request['method']=='POST'){
  $cmwebmaster->dataChange($_SESSION['cmid']);
  if($wm->setWebmaster($request['request'], $_SESSION['cmid'])){
    $updated = true;
  }
}

$wd=$wm->getWebmasterDetails($_SESSION['cmid']);

header('Content-type: application/json');
echo json_encode(array(
  'updated'=>$updated,
  'account'=>$wd
));