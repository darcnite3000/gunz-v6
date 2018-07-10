<?php
include 'auth.php';

if(!$authorized){
  header('HTTP/1.0 403 Forbidden');
  header('Content-type: application/json');
  echo json_encode(array('error'=>array('message'=>'Authorization Failed')));
  exit;
}