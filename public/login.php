<?php
include_once 'config.php';
// error_reporting(E_ALL);

if($request['method']=='POST' && $request['local_referer']){
  $username = $request['request']['wm_username'];
  $password = $request['request']['wm_password'];
  if($username && $password){
    $webmaster = new Webmaster();
    $webmaster->read_username($username);

    // print_r($_POST);exit;

    global $conn, $dbh;
    $site_globals['wm_username'] = $username;
    $site_globals['wm_password'] = $password;

    $login = new Login($dbh, $site_globals, $conn);
    $check = authCheck($webmaster, $login);
    $authorized = $check['auth'];
    // print_r($authorized);exit;
    if($authorized){
      $_SESSION['cmid']=$webmaster->id;

      header('Content-type: application/json');
      $unencodedArray = array(
        'webmasterId'=>$webmaster->id,
        'username'=>$username
      );
      echo json_encode($unencodedArray);
    }else{
      header('HTTP/1.0 401 Unauthorized');
      header('Content-type: application/json');
      echo json_encode(array('error'=>array('message'=>$check['reason'])));
    }
  }elseif($_SESSION['cmid']){
    $webmaster = new Webmaster($_SESSION['cmid']);
    $site_globals['wm_username'] = $webmaster->username;
    $site_globals['wm_password'] = $webmaster->password;
    $login = new Login($dbh, $site_globals, $conn);
    $check = authCheck($webmaster, $login);
    $authorized = $check['auth'];
    if($authorized){
      header('Content-type: application/json');
      $unencodedArray = array(
        'webmasterId'=>$webmaster->id,
        'username'=>$webmaster->username
      );
      echo json_encode($unencodedArray);
    }else{
      header('HTTP/1.0 401 Unauthorized');
      header('Content-type: application/json');
      echo json_encode(array('error'=>array('message'=>$check['reason'])));
    }
  }elseif($_COOKIE[wm_id]){
    $webmaster = new Webmaster($_COOKIE[wm_id]);
    $site_globals['wm_username'] = $webmaster->username;
    $site_globals['wm_password'] = $webmaster->password;
    $check = authCheck($webmaster, $site_globals);
    $check = authCheck($webmaster, $login);
    $authorized = $check['auth'];
    if($authorized){
      $_SESSION['cmid']=$webmaster->id;
      header('Content-type: application/json');
      $unencodedArray = array(
        'webmasterId'=>$webmaster->id,
        'username'=>$webmaster->username
      );
      echo json_encode($unencodedArray);
    }else{
      header('HTTP/1.0 401 Unauthorized');
      header('Content-type: application/json');
      echo json_encode(array('error'=>array('message'=>$check['reason'])));
    }
  }else{
    header('HTTP/1.0 400 Bad Request');
    header('Content-type: application/json');
    echo json_encode(array('error'=>array('message'=>'No username and/or password were sent')));
  }
}else{
  header('HTTP/1.0 405 Method Not Allowed');
  header('Content-type: application/json');
  echo json_encode(array('error'=>array('message'=>'Method Not Allowed')));
}
exit;
