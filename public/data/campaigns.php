<?php
include_once '../auth_die.php';
    
$updated = false;
if($request['method']=='POST'){
  if(isset($request['request']['id']) && isset($request['request']['title'])){
    $updated = $wm->setCampaign($request['request']['title'],$request['request']['id']);
  }elseif(isset($request['request']['title'])){
    $updated = $wm->setCampaign($request['request']['title']);
  }
}

// $camp_q = "select id,title from $tbl_prefix"."campaigns where webmaster=$webmaster->id order by id";
$cres = $wm->getCampaigns();
$campaigns = array();
foreach ($cres as $key=>$value){
  $campaigns[] = array(
    'id' => $key,
    'title' => $value,
    'display' => $value,
  );
}

header('Content-type: application/json');
echo json_encode(array(
  'updated'=>!!$updated,
  'campaigns'=>$campaigns
));