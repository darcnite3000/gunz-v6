<?php
include_once 'config.php';

if($request['METHOD'] == 'POST' && $_COOKIE[wm_id]){
  $webmaster = new Webmaster($_COOKIE['wm_id']);
  global $conn, $dbh;
  $login = new Login($dbh, $site_globals, $conn);
  $login->_logout();
}else{
  session_destroy();
  setcookie("wm_id", "", time()-3600);
  echo json_encode(array('logout'=>true));
}
exit;