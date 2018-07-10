<?php
include_once 'config.php';
if($request['method']=='POST'){
  $username = $request['request']['wm_username'];
  $login = new Login($dbh, $site_globals, $conn);
  $login->_logout();
  session_destroy();
  setcookie("wm_id", "", time()-3600);
}else{
  header('Content-type: application/json');
  echo json_encode(array('logout'=>true));
}
exit;